'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    static associate(models) {
      // Invoice belongs to Apartment
      Invoice.belongsTo(models.Apartment, {
        foreignKey: 'apartment_id',
        as: 'apartment'
      })

      Invoice.hasMany(models.InvoiceItem, {
        foreignKey: 'invoice_id',
        as: 'items'
      })

      // Invoice belongs to Collection Period
      Invoice.belongsTo(models.CollectionPeriod, {
        foreignKey: 'period_id',
        as: 'period'
      })

      // Invoice created by User
      Invoice.belongsTo(models.User, {
        foreignKey: 'created_by',
        as: 'creator'
      })

      // Invoice has many Payments
      Invoice.hasMany(models.Payment, {
        foreignKey: 'invoice_id',
        as: 'payments'
      })
    }
  }

  Invoice.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      apartment_id: {
        type: DataTypes.INTEGER
      },
      period_id: {
        type: DataTypes.INTEGER
      },
      total_amount: {
        type: DataTypes.BIGINT
      },
      end_date: {
        type: DataTypes.DATEONLY
      },
      status: {
        type: DataTypes.TINYINT,
        defaultValue: 0
      },
      created_by: {
        type: DataTypes.INTEGER
      },
      note: {
        type: DataTypes.TEXT
      },
      paid_at: {
        type: DataTypes.DATE,
        allowNull: true
      }
    },
    {
      sequelize,
      modelName: 'Invoice',
      tableName: 'invoices',
      underscored: true,
      updatedAt: false
    }
  )

  return Invoice
}
