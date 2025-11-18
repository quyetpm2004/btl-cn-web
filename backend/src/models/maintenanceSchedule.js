"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class MaintenanceSchedule extends Model {
    static associate(models) {
      // MaintenanceSchedule belongs to Equipment
      MaintenanceSchedule.belongsTo(models.Equipment, {
        foreignKey: "equipment_id",
        as: "equipment",
      });

      // MaintenanceSchedule belongs to Resident
      MaintenanceSchedule.belongsTo(models.Resident, {
        foreignKey: "resident_id",
        as: "resident",
      });

      // MaintenanceSchedule assigned to Staff
      MaintenanceSchedule.belongsTo(models.Staff, {
        foreignKey: "assigned_to",
        as: "assignee",
      });
    }
  }

  MaintenanceSchedule.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      equipment_id: {
        type: DataTypes.INTEGER,
      },
      resident_id: {
        type: DataTypes.INTEGER,
      },
      start_at: {
        type: DataTypes.DATE,
      },
      end_at: {
        type: DataTypes.DATE,
      },
      assigned_to: {
        type: DataTypes.INTEGER,
      },
      description: {
        type: DataTypes.TEXT,
      },
      status: {
        type: DataTypes.TINYINT,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "MaintenanceSchedule",
      tableName: "maintenance_schedules",
      underscored: true,
      timestamps: false,
    }
  );

  return MaintenanceSchedule;
};
