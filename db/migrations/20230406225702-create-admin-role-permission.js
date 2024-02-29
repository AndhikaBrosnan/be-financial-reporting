'use strict'
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('adminRolePermission', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      adminRoleId: {
        type: Sequelize.STRING,
        references: {
          model: 'adminRole',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      adminPermissionId: {
        type: Sequelize.STRING,
        references: {
          model: 'adminPermission',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
    await queryInterface.dropTable('adminRolePermission')
  }
}
