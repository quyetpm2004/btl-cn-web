'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class FinancialReport extends Model {
    static associate(models) {
      // FinancialReport belongs to Collection Period
      FinancialReport.belongsTo(models.CollectionPeriod, {
        foreignKey: 'period_id',
        as: 'period'
      })
    }
  }

  FinancialReport.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      period_id: {
        type: DataTypes.INTEGER
      },
      total_income: {
        type: DataTypes.BIGINT
      },
      total_expense: {
        type: DataTypes.BIGINT
      },
      created_at: {
        type: DataTypes.DATE,
        field: 'created_at'
      }
    },
    {
      sequelize,
      modelName: 'FinancialReport',
      tableName: 'financial_reports',
      underscored: true
    }
  )

  return FinancialReport
}
