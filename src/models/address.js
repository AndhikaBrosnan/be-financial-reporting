'use strict'
const { Model } = require('sequelize')
const Nanoid = require('#helpers/Nanoid')

module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  Address.init(
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
      urban: {
        type: DataTypes.STRING,
        allowNull: false
      },
      district: {
        type: DataTypes.STRING,
        allowNull: false
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false
      },
      province: {
        type: DataTypes.STRING,
        allowNull: false
      },
      postalCode: {
        type: DataTypes.STRING,
        allowNull: false
      },
      addressDetail: {
        type: DataTypes.STRING,
        allowNull: false
      },
      note: {
        type: DataTypes.STRING,
        allowNull: false
      },
      isSelected: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },

      fullAddress: {
        type: DataTypes.VIRTUAL,
        get () {
          const { urban, district, city, province, postalCode, addressDetail } = this

          return (
            `${addressDetail}, ` + `${urban}, ` + `${district}, ` + `${city}, ` + `${province}, ` + postalCode
          )
        }
      }
    },
    {
      sequelize,
      modelName: 'address',
      tableName: 'address'
    }
  )

  Address.beforeValidate((instance) => {
    if (instance.id) return
    instance.id = Nanoid.get(15)
  })

  return Address
}
