'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Apartment extends Model {
    static associate(models) {
      // Apartment belongs to ApartmentType
      Apartment.belongsTo(models.ApartmentType, {
        foreignKey: 'type_id',
        as: 'type'
      })

      // Apartment belongs to Resident (owner)
      Apartment.belongsTo(models.Resident, {
        foreignKey: 'owner_id',
        as: 'owner'
      })

      // Apartment and Residents many-to-many through ResidentApartment
      Apartment.belongsToMany(models.Resident, {
        through: 'resident_apartment',
        foreignKey: 'apartment_id',
        otherKey: 'resident_id',
        as: 'residents'
      })

      // Apartment has many Vehicles
      Apartment.hasMany(models.Vehicle, {
        foreignKey: 'apartment_id',
        as: 'vehicles'
      })

      // Apartment has many Service Registrations
      Apartment.hasMany(models.ServiceRegistration, {
        foreignKey: 'apartment_id',
        as: 'serviceRegistrations'
      })

      // Apartment has many Invoices
      Apartment.hasMany(models.Invoice, {
        foreignKey: 'apartment_id',
        as: 'invoices'
      })

      // Apartment has one Account Balance
      Apartment.hasOne(models.AccountBalance, {
        foreignKey: 'apartment_id',
        as: 'accountBalance'
      })
    }
  }

  Apartment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      apartment_code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      building: {
        type: DataTypes.STRING
      },
      type_id: {
        type: DataTypes.INTEGER
      },
      area: {
        type: DataTypes.FLOAT
      },
      status: {
        type: DataTypes.TINYINT,
        defaultValue: 0
      },
      floor: {
        type: DataTypes.INTEGER
      },
      owner_id: {
        type: DataTypes.INTEGER
      }
    },
    {
      sequelize,
      modelName: 'Apartment',
      tableName: 'apartments',
      underscored: true
    }
  )

  return Apartment
}
