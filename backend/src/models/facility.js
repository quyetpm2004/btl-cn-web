'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Facility extends Model {
    static associate(models) {
      // No associations needed for Facility
    }
  }

  Facility.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT
      },
      image_url: {
        type: DataTypes.STRING
      }
    },
    {
      sequelize,
      modelName: 'Facility',
      tableName: 'facilities',
      underscored: true,
      timestamps: false
    }
  )

  return Facility
}
