'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class WorkType extends Model {
    static associate(models) {
      WorkType.hasMany(models.MaintenanceRequest, {
        foreignKey: 'work_type_id',
        as: 'maintenance_requests'
      })
    }
  }

  WorkType.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT
      }
    },
    {
      sequelize,
      modelName: 'WorkType',
      tableName: 'work_types',
      underscored: true,
      timestamps: false
    }
  )

  return WorkType
}
