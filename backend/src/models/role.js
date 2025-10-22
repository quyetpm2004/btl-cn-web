'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      // Role has many Users
      Role.hasMany(models.User, {
        foreignKey: 'role_id',
        as: 'users'
      })
    }
  }

  Role.init(
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
      }
    },
    {
      sequelize,
      modelName: 'Role',
      tableName: 'roles',
      underscored: true
    }
  )

  return Role
}
