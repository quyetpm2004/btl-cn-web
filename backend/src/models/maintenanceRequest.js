'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class MaintenanceRequest extends Model {
    static associate(models) {
      MaintenanceRequest.belongsTo(models.Resident, {
        foreignKey: 'resident_id',
        as: 'resident'
      })

      MaintenanceRequest.belongsTo(models.Staff, {
        foreignKey: 'assigned_to',
        as: 'assignee'
      })

      MaintenanceRequest.belongsTo(models.WorkType, {
        foreignKey: 'work_type_id',
        as: 'work_type'
      })
    }
  }

  MaintenanceRequest.init(
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
      location: {
        type: DataTypes.STRING
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT
      },
      images: {
        type: DataTypes.JSON,
        allowNull: true
      },
      status: {
        type: DataTypes.TINYINT,
        defaultValue: 0
      },
      result: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      work_type_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      assigned_to: {
        type: DataTypes.INTEGER
      },
      resolved_at: {
        type: DataTypes.DATE
      }
    },
    {
      sequelize,
      modelName: 'MaintenanceRequest',
      tableName: 'maintenance_requests',
      underscored: true,
      updatedAt: false,
      createdAt: 'created_at'
    }
  )

  return MaintenanceRequest
}
