'use strict'
const Nanoid = require('#helpers/Nanoid')

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('adminRole', [
      {
        id: Nanoid.get(15),
        name: 'admin default',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('adminRole', null, {})
  }
}
