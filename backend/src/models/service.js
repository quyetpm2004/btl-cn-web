'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    static associate(models) {
      // Service has many Service Registrations
      Service.hasMany(models.ServiceRegistration, {
        foreignKey: 'service_id',
        as: 'registrations'
      })
    }
  }

  Service.init(
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
      price: {
        type: DataTypes.INTEGER
      },
      unit: {
        type: DataTypes.STRING
      }
    },
    {
      sequelize,
      modelName: 'Service',
      tableName: 'services',
      underscored: true,
      timestamps: false
    }
  )

  return Service
}
