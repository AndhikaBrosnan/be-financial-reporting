const GeneralError = require('#errors/definitions/general-error')
const AdminTokenService = require('#services/adminToken')

module.exports = async (req, res, next) => {
  const adminToken = getAuthorizationToken(req)

  // Set authorized admin
  const admin = await getAdmin(adminToken)
  req.adminId = admin.id

  // Parse and set permissions
  const permissions = admin?.adminRole?.adminPermissions || []
  req.permissions = permissions.map(e => e.name)

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

async function getAdmin (adminToken) {
  const result = await AdminTokenService.findAdminByToken(adminToken)

  if (!result) {
    throw GeneralError.unauthorized()
  }

  return result.admin
}
