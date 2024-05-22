'use strict'
const { Model } = require('sequelize')
const Nanoid = require('#helpers/Nanoid')

module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    static associate (models) {
      //
    }
  }

  Image.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      validate: {
        notEmpty: true
      },
      allowNull: false
    },
    filePath: {
      type: DataTypes.STRING, allowNull: false
    }
  }, {
    sequelize,
    modelName: 'image',
    tableName: 'images'
  })

  Image.beforeValidate((instance) => {
    if (instance.id) return
    instance.id = Nanoid.get(15)
  })

  return Image
}
