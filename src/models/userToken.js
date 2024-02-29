'use strict'
const { Model } = require('sequelize')
const Nanoid = require('#helpers/Nanoid')
const { v4: uuid } = require('uuid')

module.exports = (sequelize, DataTypes) => {
  class UserToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserToken.belongsTo(models.user)
    }
  }
  UserToken.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        validate: {
          notEmpty: true
        },
        allowNull: false
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false
      },
      expiredAt: {
        type: DataTypes.DATE,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'userToken',
      tableName: 'userToken'
    }
  )

  UserToken.beforeValidate(async (instance) => {
    if (instance.id) return
    instance.id = Nanoid.get(15)
    instance.token = uuid()
  })

  return UserToken
}
