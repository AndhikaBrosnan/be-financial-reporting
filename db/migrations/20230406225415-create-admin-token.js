'use strict'
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('adminToken', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      adminId: {
        type: Sequelize.STRING,
        references: {
          model: 'admin',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      token: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('adminToken')
  }
}
