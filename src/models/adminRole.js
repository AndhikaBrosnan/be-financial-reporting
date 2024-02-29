'use strict'
const Nanoid = require('#helpers/Nanoid')
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class AdminRole extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      AdminRole.belongsToMany(models.adminPermission, {
        through: models.adminRolePermission
      })
    }
  }
  AdminRole.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        validate: {
          notEmpty: true
        },
        allowNull: false
      },
      name: DataTypes.STRING
    },
    {
      sequelize,
      tableName: 'adminRole',
      modelName: 'adminRole'
    }
  )

  AdminRole.beforeValidate((instance) => {
    if (instance.id) return
    instance.id = Nanoid.get(15)
  })

  return AdminRole
}
