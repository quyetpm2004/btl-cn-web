import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    null, 
    {
  host: process.env.DB_HOST, 
  dialect: 'mysql'
});

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    } catch (error) {
    console.error('Unable to connect to the database:', error);
    }
};


export { sequelize, testConnection };