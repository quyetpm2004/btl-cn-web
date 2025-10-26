'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    static associate(models) {
      // No associations needed for Project
    }
  }

  Project.init(
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
      image_url: {
        type: DataTypes.STRING
      }
    },
    {
      sequelize,
      modelName: 'Project',
      tableName: 'projects',
      underscored: true,
      timestamps: false
    }
  )

  return Project
}
