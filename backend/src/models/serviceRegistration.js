'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class ServiceRegistration extends Model {
    static associate(models) {
      // ServiceRegistration belongs to Apartment
      ServiceRegistration.belongsTo(models.Apartment, {
        foreignKey: 'apartment_id',
        as: 'apartment'
      })

      // ServiceRegistration belongs to Service
      ServiceRegistration.belongsTo(models.Service, {
        foreignKey: 'service_id',
        as: 'service'
      })
    }
  }

  ServiceRegistration.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      apartment_id: {
        type: DataTypes.INTEGER
      },
      service_id: {
        type: DataTypes.INTEGER
      },
      start_date: {
        type: DataTypes.DATEONLY
      },
      end_date: {
        type: DataTypes.DATEONLY
      },
      status: {
        type: DataTypes.TINYINT,
        defaultValue: 1
      }
    },
    {
      sequelize,
      modelName: 'ServiceRegistration',
      tableName: 'service_registrations',
      underscored: true
    }
  )

  return ServiceRegistration
}
