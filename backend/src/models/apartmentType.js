'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class ApartmentType extends Model {
    static associate(models) {
      // ApartmentType has many Apartments
      ApartmentType.hasMany(models.Apartment, {
        foreignKey: 'type_id',
        as: 'apartments'
      })
    }
  }

  ApartmentType.init(
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
      description: {
        type: DataTypes.TEXT
      },
      layout_image: {
        type: DataTypes.STRING
      }
    },
    {
      sequelize,
      modelName: 'ApartmentType',
      tableName: 'apartment_types',
      underscored: true,
      timestamps: false
    }
  )

  return ApartmentType
}
