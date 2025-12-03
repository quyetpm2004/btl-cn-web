'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class NotificationReceiver extends Model {
    static associate(models) {
      // Association defined in Notification and Resident models
      NotificationReceiver.belongsTo(models.Notification, {
        foreignKey: 'notification_id',
        as: 'notification'
      })

      // Và cũng thuộc về 1 User (nếu bạn muốn include cả User)
      NotificationReceiver.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      })
    }
  }

  NotificationReceiver.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      notification_id: {
        type: DataTypes.INTEGER
      },
      user_id: {
        type: DataTypes.INTEGER
      },
      is_read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      read_at: {
        type: DataTypes.DATE
      }
    },
    {
      sequelize,
      modelName: 'NotificationReceiver',
      tableName: 'notification_receivers',
      underscored: true,
      timestamps: false
    }
  )

  return NotificationReceiver
}
