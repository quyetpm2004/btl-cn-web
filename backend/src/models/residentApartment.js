'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class ResidentApartment extends Model {
    static associate(models) {
      // Association defined in Resident and Apartment models
    }
  }

  ResidentApartment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      resident_id: {
        type: DataTypes.INTEGER
      },
      apartment_id: {
        type: DataTypes.INTEGER
      },
      relationship: {
        type: DataTypes.STRING
      },
      start_date: {
        type: DataTypes.DATEONLY
      },
      end_date: {
        type: DataTypes.DATEONLY
      }
    },
    {
      sequelize,
      modelName: 'ResidentApartment',
      tableName: 'resident_apartment',
      underscored: true
    }
  )

  return ResidentApartment
}
