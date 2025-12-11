'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class MaintenanceSchedule extends Model {
    static associate(models) {
      // MaintenanceSchedule assigned to Staff
      MaintenanceSchedule.belongsTo(models.Staff, {
        foreignKey: 'assigned_to',
        as: 'assignee'
      })

      // MaintenanceSchedule created by User
      MaintenanceSchedule.belongsTo(models.User, {
        foreignKey: 'created_by',
        as: 'creator'
      })
    }
  }

  MaintenanceSchedule.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: DataTypes.STRING
      },
      description: {
        type: DataTypes.TEXT
      },
      maintenance_object: {
        type: DataTypes.STRING
      },
      location: {
        type: DataTypes.STRING
      },
      start_at: {
        type: DataTypes.DATE
      },
      end_at: {
        type: DataTypes.DATE
      },
      assigned_to: {
        type: DataTypes.INTEGER
      },
      status: {
        type: DataTypes.TINYINT,
        defaultValue: 0
      },
      created_by: {
        type: DataTypes.INTEGER
      }
    },
    {
      sequelize,
      modelName: 'MaintenanceSchedule',
      tableName: 'maintenance_schedules',
      underscored: true,
      updatedAt: false,
      createdAt: 'created_at'
    }
  )

  return MaintenanceSchedule
}
