'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class ErrorReport extends Model {
    static associate (models) {
      ErrorReport.belongsTo(models.user)
    }
  }
  ErrorReport.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        validate: {
          notEmpty: true
        },
        allowNull: false
      },
      statusCode: { type: DataTypes.INTEGER },
      errorCode: { type: DataTypes.INTEGER },
      errorMessage: { type: DataTypes.STRING },
      serverUrl: { type: DataTypes.STRING },
      clientUrl: { type: DataTypes.STRING, allowNull: false },
      clientNote: { type: DataTypes.STRING },
      userNote: { type: DataTypes.STRING },
      userId: { type: DataTypes.STRING }
    },
    {
      sequelize,
      modelName: 'errorReport',
      tableName: 'errorReport',
      timestamps: true
    }
  )

  return ErrorReport
}
