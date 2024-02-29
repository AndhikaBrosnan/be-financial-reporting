'use strict'
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('admin', 'adminRoleId', {
      type: Sequelize.STRING,
      references: {
        model: 'adminRole',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('admin', 'adminRoleId')
  }
}
