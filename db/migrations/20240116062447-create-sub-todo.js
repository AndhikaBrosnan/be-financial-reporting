"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("subTodos", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      todoId: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: "todos",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      isDone: {
        type: Sequelize.BOOLEAN,
      },
      subTask: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("subTodos");
  },
};
