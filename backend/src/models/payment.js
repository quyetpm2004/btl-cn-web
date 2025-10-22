'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    static associate(models) {
      // Payment belongs to Invoice
      Payment.belongsTo(models.Invoice, {
        foreignKey: 'invoice_id',
        as: 'invoice'
      })

      // Payment belongs to Resident
      Payment.belongsTo(models.Resident, {
        foreignKey: 'resident_id',
        as: 'resident'
      })
    }
  }

  Payment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      invoice_id: {
        type: DataTypes.INTEGER
      },
      resident_id: {
        type: DataTypes.INTEGER
      },
      method: {
        type: DataTypes.STRING
      },
      amount: {
        type: DataTypes.BIGINT
      },
      paid_at: {
        type: DataTypes.DATE
      },
      transaction_code: {
        type: DataTypes.STRING
      }
    },
    {
      sequelize,
      modelName: 'Payment',
      tableName: 'payments',
      underscored: true
    }
  )

  return Payment
}
