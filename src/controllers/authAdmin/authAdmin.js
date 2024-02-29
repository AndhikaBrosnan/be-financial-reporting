const LoginSchema = require('./login-schema')
const Bcrypt = require('#helpers/Bcrypt')
const GeneralError = require('#errors/definitions/general-error')
const AdminService = require('#services/admin')
const AdminTokenService = require('#services/adminToken')

module.exports = class Controller {
  static async login (req, res) {
    const { body } = req
    req.sanitize(LoginSchema, body)

    const admin = await AdminService.findByEmail(body.email)
    if (!admin) throw GeneralError.invalidLoginCredential()

    const isMatched = Bcrypt.compare(body.password, admin.password)
    if (!isMatched) throw GeneralError.invalidLoginCredential()

    const adminToken = await AdminTokenService.create(admin.id)

    return res.serialize({
      id: admin.id,
      token: adminToken.token
    })
  }
}
