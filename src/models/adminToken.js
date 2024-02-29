'use strict'
const Nanoid = require('#helpers/Nanoid')
const { Model } = require('sequelize')
const { v4: uuid } = require('uuid')

module.exports = (sequelize, DataTypes) => {
  class AdminToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      AdminToken.belongsTo(models.admin)
    }
  }
  AdminToken.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        validate: {
          notEmpty: true
        },
        allowNull: false
      },
      adminId: DataTypes.STRING,
      token: DataTypes.STRING
    },
    {
      sequelize,
      tableName: 'adminToken',
      modelName: 'adminToken'
    }
  )

  AdminToken.beforeValidate((instance) => {
    if (instance.id) return
    instance.id = Nanoid.get(15)
    instance.token = uuid()
  })

  return AdminToken
}
