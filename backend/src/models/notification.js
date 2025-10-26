'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    static associate(models) {
      // Notification created by User
      Notification.belongsTo(models.User, {
        foreignKey: 'created_by',
        as: 'creator'
      })

      // Notification sent to Residents many-to-many
      Notification.belongsToMany(models.Resident, {
        through: 'notification_receivers',
        foreignKey: 'notification_id',
        otherKey: 'resident_id',
        as: 'receivers'
      })
    }
  }

  Notification.init(
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
      content: {
        type: DataTypes.TEXT
      },
      created_by: {
        type: DataTypes.INTEGER
      },
      category: {
        type: DataTypes.TINYINT
      }
    },
    {
      sequelize,
      modelName: 'Notification',
      tableName: 'notifications',
      underscored: true,
      updatedAt: false
    }
  )

  return Notification
}
