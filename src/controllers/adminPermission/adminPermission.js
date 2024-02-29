const AdminPermissionService = require('#services/adminPermission')

module.exports = class Controller {
  static async list (req, res) {
    const { query } = req
    const {
      data: permissions,
      totalData,
      totalPage
    } = await AdminPermissionService.list(query)

    return res.serialize({
      permissions,
      totalData,
      totalPage
    })
  }
}
