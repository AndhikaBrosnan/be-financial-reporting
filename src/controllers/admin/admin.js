const CreateSchema = require('./admin-create-schema')
const UpdateSchema = require('./admin-update-schema')
const AdminService = require('#services/admin')
const Bcrypt = require('#helpers/Bcrypt')

module.exports = class Controller {
  static async create (req, res) {
    const { body } = req
    req.sanitize(CreateSchema, body)

    // Hash password
    if (body.password) {
      body.password = Bcrypt.hash(body.password)
    }
    const created = await AdminService.create(body)

    return res.serializePost({
      adminId: created.id
    })
  }

  static async list (req, res) {
    const { query } = req
    const {
      data: admins,
      totalData,
      totalPage
    } = await AdminService.list(query)

    return res.serialize({
      admins,
      totalData,
      totalPage
    })
  }

  static async findById (req, res) {
    const { params } = req
    const { adminId } = params
    const admin = await AdminService.findById(adminId)

    return res.serialize({
      admin
    })
  }

  static async update (req, res) {
    const { params, body } = req
    const { adminId } = params
    req.sanitize(UpdateSchema, body)

    // Hash password
    if (body.password) {
      body.password = Bcrypt.hash(body.password)
    }
    await AdminService.update(adminId, body)

    return res.serialize({
      adminId
    })
  }

  static async delete (req, res) {
    const { params } = req
    const { adminId } = params
    await AdminService.delete(adminId)

    return res.serialize({
      adminId
    })
  }
}
