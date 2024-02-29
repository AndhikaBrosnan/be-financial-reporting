const JWTHelper = require('#helpers/JWTHelper')
const { userToken: UserToken, user: User } = require('#models')
const moment = require('moment')

const TOKEN_EXPIRE_TIME = 30 // 30 DAYS

const UserTokenService = {
  async create(userId) {
    const generatedToken = new JWTHelper().generateJWTToken({
      userId
    })
    const jwtToken = await UserToken.create({
      token: generatedToken,
      expiredAt: moment().add(TOKEN_EXPIRE_TIME, 'days').toDate(),
      userId
    })

    return jwtToken
  },

  async findUserByToken(token) {
    const { userId } = new JWTHelper().decodeJWTToken(token)
    const userFound = await User.findOne({ id: userId })

    return userFound

    return await UserToken.findOne({
      where: {
        token
      },
      include: [User]
    })
  }
}

module.exports = UserTokenService
