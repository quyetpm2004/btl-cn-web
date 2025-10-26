'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class AccountBalance extends Model {
    static associate(models) {
      // AccountBalance belongs to Apartment
      AccountBalance.belongsTo(models.Apartment, {
        foreignKey: 'apartment_id',
        as: 'apartment'
      })
    }
  }

  AccountBalance.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      apartment_id: {
        type: DataTypes.INTEGER
      },
      balance: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      last_update: {
        type: DataTypes.DATE
      }
    },
    {
      sequelize,
      modelName: 'AccountBalance',
      tableName: 'account_balances',
      underscored: true,
      updatedAt: 'last_update'
    }
  )

  return AccountBalance
}
