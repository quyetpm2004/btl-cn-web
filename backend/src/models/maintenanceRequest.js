"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class MaintenanceRequest extends Model {
    static associate(models) {
      // MaintenanceRequest belongs to Equipment
      MaintenanceRequest.belongsTo(models.Equipment, {
        foreignKey: "equipment_id",
        as: "equipment",
      });

      // MaintenanceRequest belongs to Resident
      MaintenanceRequest.belongsTo(models.Resident, {
        foreignKey: "resident_id",
        as: "resident",
      });

      // MaintenanceRequest assigned to Staff
      MaintenanceRequest.belongsTo(models.Staff, {
        foreignKey: "assigned_to",
        as: "assignee",
      });
    }
  }

  MaintenanceRequest.init(
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
      description: {
        type: DataTypes.TEXT,
      },
      images: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      priority: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.TINYINT,
        defaultValue: 0,
      },
      assigned_to: {
        type: DataTypes.INTEGER,
      },
      resolved_at: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "MaintenanceRequest",
      tableName: "maintenance_requests",
      underscored: true,
      updatedAt: false,
    }
  );

  return MaintenanceRequest;
};
