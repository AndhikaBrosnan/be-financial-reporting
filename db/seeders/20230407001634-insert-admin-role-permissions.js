'use strict'
const Nanoid = require('#helpers/Nanoid')

const {
  adminRole: AdminRole,
  adminPermission: AdminPermission
} = require('#models')

module.exports = {
  async up (queryInterface, Sequelize) {
    const adminDefaultRole = await AdminRole.findOne({
      where: {
        name: 'admin default'
      }
    })
    const adminRoleId = adminDefaultRole?.id

    const adminPermissions = await AdminPermission.findAll()
    const payload = adminPermissions.map((adminPermission) => {
      return {
        id: Nanoid.get(15),
        adminRoleId,
        adminPermissionId: adminPermission.id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })

    await queryInterface.bulkInsert('adminRolePermission', payload)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('adminRolePermission', null, {})
  }
}
