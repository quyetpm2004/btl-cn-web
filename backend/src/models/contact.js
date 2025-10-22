'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {
    static associate(models) {
      // No associations needed for Contact
    }
  }

  Contact.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      email: {
        type: DataTypes.STRING
      },
      phone: {
        type: DataTypes.STRING
      },
      address: {
        type: DataTypes.STRING
      },
      map_embed_url: {
        type: DataTypes.TEXT
      }
    },
    {
      sequelize,
      modelName: 'Contact',
      tableName: 'contacts',
      underscored: true
    }
  )

  return Contact
}
