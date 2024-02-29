'use strict'
const Nanoid = require('#helpers/Nanoid')
const Bcrypt = require('#helpers/Bcrypt')

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('admin', [
      {
        id: Nanoid.get(15),
        email: 'admin@example.com',
        password: Bcrypt.hash(process.env.ADMIN_DEFAULT_PASSWORD),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('admin', null, {})
  }
}
