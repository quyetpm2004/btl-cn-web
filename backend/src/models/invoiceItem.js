"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class InvoiceItem extends Model {
    static associate(models) {
      // InvoiceItem belongs to Invoice
      InvoiceItem.belongsTo(models.Invoice, {
        foreignKey: "invoice_id",
        as: "invoice",
      });

      // InvoiceItem belongs to Service
      InvoiceItem.belongsTo(models.Service, {
        foreignKey: "service_id",
        as: "service",
      });

    }
  }

  InvoiceItem.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      invoice_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      service_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      unit_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      note: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "InvoiceItem",
      tableName: "invoice_items",
      underscored: true,
      timestamps: true,
      createdAt: "created_at",
      updatedAt: false,
    }
  );

  return InvoiceItem;
};
