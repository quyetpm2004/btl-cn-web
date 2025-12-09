'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Staff extends Model {
    static associate(models) {
      // Staff belongs to User
      Staff.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      })

      // Staff assigned to Maintenance Requests
      Staff.hasMany(models.MaintenanceRequest, {
        foreignKey: 'assigned_to',
        as: 'maintenanceRequests'
      })

      // Staff assigned to Maintenance Schedules
      Staff.hasMany(models.MaintenanceSchedule, {
        foreignKey: 'assigned_to',
        as: 'maintenanceSchedules'
      })
    }
  }

  Staff.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: DataTypes.INTEGER
      },
      full_name: {
        type: DataTypes.STRING
      },
      dob: {
        type: DataTypes.DATEONLY
      },
      gender: {
        type: DataTypes.TINYINT
      },
      phone: {
        type: DataTypes.STRING
      },
      position: {
        type: DataTypes.STRING
      },
      department: {
        type: DataTypes.STRING
      },
      id_card: {
        type: DataTypes.STRING
      },
      start_date: {
        type: DataTypes.DATEONLY
      },
      status: {
        type: DataTypes.TINYINT,
        defaultValue: 1
      }
    },
    {
      sequelize,
      modelName: 'Staff',
      tableName: 'staffs',
      underscored: true,
      timestamps: false
    }
  )

  return Staff
}
