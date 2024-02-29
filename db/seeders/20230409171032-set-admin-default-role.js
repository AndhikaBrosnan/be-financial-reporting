'use strict'
const { admin: Admin, adminRole: AdminRole } = require('#models')

module.exports = {
  async up (queryInterface, Sequelize) {
    const admin = await Admin.findOne({
      where: {
        email: 'admin@example.com'
      }
    })
    const adminDefaultRole = await AdminRole.findOne({
      where: {
        name: 'admin default'
      }
    })

    await Admin.update(
      {
        adminRoleId: adminDefaultRole.id
      },
      {
        where: {
          id: admin.id
        }
      }
    )
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
}
