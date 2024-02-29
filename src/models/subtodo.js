"use strict";
const Nanoid = require("#helpers/Nanoid");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SubTodo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SubTodo.belongsTo(models.todo);
    }
  }
  SubTodo.init(
    {
      subTask: { type: DataTypes.STRING, allowNull: true },
      isDone: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      todoId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "subTodo",
      tableName: "subTodos",
    }
  );

  SubTodo.beforeValidate((instance) => {
    if (instance.id) return;
    instance.id = Nanoid.get(15);
  });

  return SubTodo;
};
