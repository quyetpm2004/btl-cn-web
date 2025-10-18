const { Sequelize, DataTypes, Model } = require('sequelize')
const sequelize = new Sequelize('sqlite::memory:')

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    }
  },
  {
    sequelize, // We need to pass the connection instance
    modelName: 'User' // We need to choose the model name
  }
)

console.log(User === sequelize.models.User) // true
