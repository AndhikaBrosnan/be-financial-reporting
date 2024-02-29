'use strict'
const Nanoid = require('#helpers/Nanoid')
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class AdminRolePermission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }

  AdminRolePermission.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        validate: {
          notEmpty: true
        },
        allowNull: false
      },
      adminRoleId: DataTypes.STRING,
      adminPermissionId: DataTypes.STRING
    },
    {
      sequelize,
      tableName: 'adminRolePermission',
      modelName: 'adminRolePermission'
    }
  )

  AdminRolePermission.beforeValidate((instance) => {
    if (instance.id) return
    instance.id = Nanoid.get(15)
  })

  return AdminRolePermission
}
