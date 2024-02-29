"use strict";
const { Model } = require("sequelize");
const Nanoid = require("#helpers/Nanoid");

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Todo.hasMany(models.subTodo);
    }
  }
  Todo.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        validate: {
          notEmpty: true,
        },
        allowNull: false,
      },
      task: { type: DataTypes.STRING, allowNull: false },
      isDone: DataTypes.BOOLEAN,
      priority: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "todo",
      tableName: "todos",
    }
  );

  Todo.beforeValidate((instance) => {
    if (instance.id) return;
    instance.id = Nanoid.get(15);
  });

  return Todo;
};
