'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Equipment extends Model {
    static associate(models) {
      // Equipment has many Maintenance Requests
      Equipment.hasMany(models.MaintenanceRequest, {
        foreignKey: 'equipment_id',
        as: 'maintenanceRequests'
      })

      // Equipment has many Maintenance Schedules
      Equipment.hasMany(models.MaintenanceSchedule, {
        foreignKey: 'equipment_id',
        as: 'maintenanceSchedules'
      })
    }
  }

  Equipment.init(
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
      location: {
        type: DataTypes.STRING
      },
      status: {
        type: DataTypes.TINYINT,
        defaultValue: 1
      },
      last_maintenance: {
        type: DataTypes.DATE
      }
    },
    {
      sequelize,
      modelName: 'Equipment',
      tableName: 'equipments',
      underscored: true,
      timestamps: false
    }
  )

  return Equipment
}
