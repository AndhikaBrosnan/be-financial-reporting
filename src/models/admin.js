'use strict'
const Nanoid = require('#helpers/Nanoid')
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      Admin.belongsTo(models.adminRole)
    }
  }
  Admin.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        validate: {
          notEmpty: true
        },
        allowNull: false
      },
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      adminRoleId: DataTypes.STRING
    },
    {
      sequelize,
      tableName: 'admin',
      modelName: 'admin'
    }
  )

  Admin.beforeValidate((instance) => {
    if (instance.id) return
    instance.id = Nanoid.get(15)
  })

  return Admin
}
