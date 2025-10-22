'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class NotificationReceiver extends Model {
    static associate(models) {
      // Association defined in Notification and Resident models
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
      resident_id: {
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
      underscored: true
    }
  )

  return NotificationReceiver
}
