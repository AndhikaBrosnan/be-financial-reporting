const GeneralError = require('#errors/definitions/general-error')
const handler = require('#errors/handlers')

function getPermissionAuthentication (features = []) {
  return handler(async (req, res, next) => {
    if (!features || !features?.length) {
      return next()
    }

    let havePermission = false
    const authorizedFeatures = req?.permissions
    /**
     * NOTES:
     * allow permission if admin have one of the authorizedFeatures
     * (using OR conditional, not AND)
     */

    for (const feature of features) {
      const isAuthorized = authorizedFeatures.includes(feature)

      if (isAuthorized) {
        havePermission = true
        break
      }
    }

    if (!havePermission) {
      throw GeneralError.unauthorized()
    }
    return next()
  })
}

module.exports = getPermissionAuthentication
