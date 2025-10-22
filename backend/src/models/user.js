'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // User belongs to Role
      User.belongsTo(models.Role, {
        foreignKey: 'role_id',
        as: 'role'
      })

      // User has one Staff
      User.hasOne(models.Staff, {
        foreignKey: 'user_id',
        as: 'staff'
      })

      // User has one Resident
      User.hasOne(models.Resident, {
        foreignKey: 'user_id',
        as: 'resident'
      })

      // User created Collection Periods
      User.hasMany(models.CollectionPeriod, {
        foreignKey: 'created_by',
        as: 'collectionPeriods'
      })

      // User created Invoices
      User.hasMany(models.Invoice, {
        foreignKey: 'created_by',
        as: 'invoices'
      })

      // User created Notifications
      User.hasMany(models.Notification, {
        foreignKey: 'created_by',
        as: 'notifications'
      })
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      role_id: {
        type: DataTypes.INTEGER
      },
      email: {
        type: DataTypes.STRING
      },
      phone: {
        type: DataTypes.STRING
      },
      avatar_url: {
        type: DataTypes.STRING
      },
      status: {
        type: DataTypes.TINYINT,
        defaultValue: 1
      },
      created_at: {
        type: DataTypes.DATE,
        field: 'created_at'
      },
      updated_at: {
        type: DataTypes.DATE,
        field: 'updated_at'
      }
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      underscored: true
    }
  )

  return User
}
