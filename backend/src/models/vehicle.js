'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Vehicle extends Model {
    static associate(models) {
      // Vehicle belongs to Apartment
      Vehicle.belongsTo(models.Apartment, {
        foreignKey: 'apartment_id',
        as: 'apartment'
      })
    }
  }

  Vehicle.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      apartment_id: {
        type: DataTypes.INTEGER
      },
      type: {
        type: DataTypes.TINYINT
      },
      brand: {
        type: DataTypes.STRING
      },
      license_plate: {
        type: DataTypes.STRING,
        unique: true
      },
      color: {
        type: DataTypes.STRING
      },
      registered_at: {
        type: DataTypes.DATE
      },
      status: {
        type: DataTypes.TINYINT,
        defaultValue: 1
      }
    },
    {
      sequelize,
      modelName: 'Vehicle',
      tableName: 'vehicles',
      underscored: true,
      timestamps: false
    }
  )

  return Vehicle
}
