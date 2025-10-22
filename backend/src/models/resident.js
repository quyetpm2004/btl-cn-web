'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Resident extends Model {
    static associate(models) {
      // Resident belongs to User
      Resident.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      })

      // Resident owns Apartments
      Resident.hasMany(models.Apartment, {
        foreignKey: 'owner_id',
        as: 'ownedApartments'
      })

      // Resident and Apartments many-to-many through ResidentApartment
      Resident.belongsToMany(models.Apartment, {
        through: 'resident_apartment',
        foreignKey: 'resident_id',
        otherKey: 'apartment_id',
        as: 'apartments'
      })

      // Resident has many Payments
      Resident.hasMany(models.Payment, {
        foreignKey: 'resident_id',
        as: 'payments'
      })

      // Resident has many Maintenance Requests
      Resident.hasMany(models.MaintenanceRequest, {
        foreignKey: 'resident_id',
        as: 'maintenanceRequests'
      })

      // Resident receives Notifications
      Resident.belongsToMany(models.Notification, {
        through: 'notification_receivers',
        foreignKey: 'resident_id',
        otherKey: 'notification_id',
        as: 'notifications'
      })
    }
  }

  Resident.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: DataTypes.INTEGER
      },
      full_name: {
        type: DataTypes.STRING
      },
      gender: {
        type: DataTypes.TINYINT
      },
      dob: {
        type: DataTypes.DATEONLY
      },
      place_of_birth: {
        type: DataTypes.STRING
      },
      ethnicity: {
        type: DataTypes.STRING
      },
      occupation: {
        type: DataTypes.STRING
      },
      hometown: {
        type: DataTypes.STRING
      },
      id_card: {
        type: DataTypes.STRING
      },
      household_no: {
        type: DataTypes.STRING
      },
      status: {
        type: DataTypes.TINYINT,
        defaultValue: 1
      },
      registered_at: {
        type: DataTypes.DATE
      }
    },
    {
      sequelize,
      modelName: 'Resident',
      tableName: 'residents',
      underscored: true
    }
  )

  return Resident
}
