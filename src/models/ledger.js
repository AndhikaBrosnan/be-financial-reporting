"use strict";
const Nanoid = require("#helpers/Nanoid");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Ledger extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Ledger.belongsTo(models.user);
    }
  }

  Ledger.init(
    {
      userId: DataTypes.STRING,
      type: DataTypes.STRING,
      amount: DataTypes.STRING,
      activity: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ledger",
      tableName: "ledger",
    }
  );

  Ledger.beforeValidate((instance) => {
    if (instance.id) return;
    instance.id = Nanoid.get(15);
  });
  return Ledger;
};
