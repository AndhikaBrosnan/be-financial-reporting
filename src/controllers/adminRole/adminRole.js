const CreateSchema = require('./admin-role-create-schema')
const UpdateSchema = require('./admin-role-update-schema')
const AdminRoleService = require('#services/adminRole')

module.exports = class Controller {
  static async create (req, res) {
    const { body } = req
    req.sanitize(CreateSchema, body)
    const created = await AdminRoleService.create(body)

    return res.serializePost({
      adminRoleId: created.id
    })
  }

  static async list (req, res) {
    const { query } = req
    const {
      data: adminRoles,
      totalData,
      totalPage
    } = await AdminRoleService.list(query)

    return res.serialize({
      adminRoles,
      totalData,
      totalPage
    })
  }

  static async findById (req, res) {
    const { params } = req
    const { adminRoleId } = params
    const adminRole = await AdminRoleService.findById(adminRoleId)

    return res.serialize({
      adminRole
    })
  }

  static async update (req, res) {
    const { params, body } = req
    const { adminRoleId } = params
    req.sanitize(UpdateSchema, body)
    await AdminRoleService.update(adminRoleId, body)

    return res.serialize({
      adminRoleId
    })
  }

  static async delete (req, res) {
    const { params } = req
    const { adminRoleId } = params
    await AdminRoleService.delete(adminRoleId)

    return res.serialize({
      adminRoleId
    })
  }
}
