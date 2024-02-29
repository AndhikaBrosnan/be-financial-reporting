'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('errorReport', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },

      statusCode: {
        type: Sequelize.INTEGER
      },
      errorCode: {
        type: Sequelize.INTEGER
      },
      errorMessage: {
        type: Sequelize.STRING
      },
      serverUrl: {
        type: Sequelize.STRING
      },

      clientUrl: {
        allowNull: false,
        type: Sequelize.STRING
      },
      clientNote: {
        type: Sequelize.STRING
      },

      userNote: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.STRING,
        references: {
          model: 'user',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
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
    await queryInterface.dropTable('errorReport')
  }
}
