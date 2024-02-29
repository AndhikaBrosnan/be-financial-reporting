const {
  adminToken: AdminToken,
  admin: Admin,
  adminRole: AdminRole,
  adminPermission: AdminPermission
} = require('#models')

const AdminTokenService = {
  async create (adminId) {
    return await AdminToken.create({ adminId })
  },

  async findAdminByToken (token) {
    return await AdminToken.findOne({
      where: {
        token
      },
      include: [
        {
          model: Admin,
          include: {
            model: AdminRole,
            include: {
              model: AdminPermission,
              through: { attributes: [] }
            }
          }
        }
      ]
    })
  }
}

module.exports = AdminTokenService
