const RegisterSchema = require('./register-schema')
const LoginSchema = require('./login-schema')
const ChangePasswordSchema = require('./change-password-schema')
const UserService = require('#services/user')
const UserTokenService = require('#services/userToken')
const LdapService = require('#third-party/ldap')
const Bcrypt = require('#helpers/Bcrypt')
const GeneralError = require('#errors/definitions/general-error')
const Nanoid = require('#helpers/Nanoid')

module.exports = class Controller {
  static async register (req, res) {
    const { body } = req
    req.sanitize(RegisterSchema, body)

    const { email, password, isLdap } = body

    // Check if email already used
    const isEmailExist = !!(await UserService.findByEmail(email))
    if (isEmailExist) throw GeneralError.emailAlreadyUsed()

    // Check if using LDAP or default registration
    if (!isLdap && !password) throw GeneralError.passwordRequired()
    if (isLdap && password) throw GeneralError.passwordNotRequired()

    // Set placeholder password for ldap login
    if (body.isLdap === true) {
      body.password = Bcrypt.hash(Nanoid.get(15))
    }

    // Hash password
    if (body.password) {
      body.password = Bcrypt.hash(body.password)
    }
    const createdUser = await UserService.create(body)
    const userToken = await UserTokenService.create(createdUser.id)

    return res.serializePost({
      id: createdUser.id,
      token: userToken.token
    })
  }

  static async login (req, res) {
    const { body } = req
    req.sanitize(LoginSchema, body)

    const user = await UserService.findByEmail(body.email)
    if (!user) throw GeneralError.invalidLoginCredential()

    /**
     * if isLdap = true => login with ldap
     * else use default login
     */
    if (user.isLdap) {
      const isSuccess = await LdapService.checkPassword(
        body.email,
        body.password
      )
      if (!isSuccess) throw GeneralError.invalidLoginCredential()
    } else {
      const isMatched = Bcrypt.compare(body.password, user.password)
      if (!isMatched) throw GeneralError.invalidLoginCredential()
    }

    const userToken = await UserTokenService.create(user.id)

    return res.serialize({
      id: user.id,
      token: userToken.token
    })
  }

  static async changePassword (req, res) {
    /**
     * IMPORTANT NOTES:
     * best to verify user first with email notification or other services
     * before allowing to change password
     */
    const { body } = req
    req.sanitize(ChangePasswordSchema, body)

    /**
     * NOTE:
     * Can remove this conditional after integrate with email or messaging service
     */
    if (process.env === 'production') {
      throw GeneralError.canNotChangePassword()
    }

    const { userId, newPassword, newPasswordConfirmation } = body
    const user = await UserService.findById(userId)

    if (!user) {
      throw GeneralError.userNotFound()
    }

    if (newPassword !== newPasswordConfirmation) {
      throw GeneralError.newPasswordNotMatching()
    }

    await UserService.update(userId, {
      password: Bcrypt.hash(newPassword)
    })

    return res.serialize({
      message: 'Password changed successfully',
      userId
    })
  }
}
