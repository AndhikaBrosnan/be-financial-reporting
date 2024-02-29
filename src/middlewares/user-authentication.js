const GeneralError = require('#errors/definitions/general-error')
const UserTokenService = require('#services/userToken')

module.exports = async (req, res, next) => {
  const userToken = getAuthorizationToken(req)
  const user = await getUser(userToken)
  req.userId = user.id
  return next()
}

function getAuthorizationToken (req) {
  if (!req.headers.authorization) {
    throw GeneralError.unauthorized()
  }
  const splitted = req.headers.authorization.split(' ')

  if (splitted[0] !== 'Bearer') {
    throw GeneralError.unauthorized()
  }
  return splitted
}

async function getUser (userToken) {
  const result = await UserTokenService.findUserByToken(userToken)

  if (!result) {
    throw GeneralError.unauthorized()
  }

  return result.user
}
