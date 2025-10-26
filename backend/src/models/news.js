'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    static associate(models) {
      // No associations needed for News
    }
  }

  News.init(
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
      category: {
        type: DataTypes.INTEGER
      }
    },
    {
      sequelize,
      modelName: 'News',
      tableName: 'news',
      underscored: true,
      updatedAt: false
    }
  )

  return News
}
