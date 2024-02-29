"use strict";
const { Model } = require("sequelize");
const Nanoid = require("#helpers/Nanoid");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.userToken);
      User.hasMany(models.address);
      User.hasMany(models.ledger);
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        validate: {
          notEmpty: true,
        },
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
      },
      isLdap: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "user",
      tableName: "user",
    }
  );

  User.beforeValidate((instance) => {
    if (instance.id) return;
    instance.id = Nanoid.get(15);
  });

  return User;
};
