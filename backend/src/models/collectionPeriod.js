'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class CollectionPeriod extends Model {
    static associate(models) {
      // CollectionPeriod created by User
      CollectionPeriod.belongsTo(models.User, {
        foreignKey: 'created_by',
        as: 'creator'
      })

      // CollectionPeriod has many Invoices
      CollectionPeriod.hasMany(models.Invoice, {
        foreignKey: 'period_id',
        as: 'invoices'
      })

      // CollectionPeriod has many Financial Reports
      CollectionPeriod.hasMany(models.FinancialReport, {
        foreignKey: 'period_id',
        as: 'financialReports'
      })
    }
  }

  CollectionPeriod.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      type: {
        type: DataTypes.TINYINT
      },
      start_date: {
        type: DataTypes.DATEONLY
      },
      end_date: {
        type: DataTypes.DATEONLY
      },
      description: {
        type: DataTypes.TEXT
      },
      created_by: {
        type: DataTypes.INTEGER
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }
    },
    {
      sequelize,
      modelName: 'CollectionPeriod',
      tableName: 'collection_periods',
      underscored: true,
      updatedAt: false
    }
  )

  return CollectionPeriod
}
