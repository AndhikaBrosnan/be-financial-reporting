'use strict'
const Nanoid = require('#helpers/Nanoid')
const adminPermissions = require('../master-data/admin-permissions.json')

module.exports = {
  async up (queryInterface, Sequelize) {
    const payload = adminPermissions.map((adminPermission) => {
      return {
        ...adminPermission,
        id: Nanoid.get(15),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })

    await queryInterface.bulkInsert('adminPermission', payload)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('adminPermission', null, {})
  }
}
