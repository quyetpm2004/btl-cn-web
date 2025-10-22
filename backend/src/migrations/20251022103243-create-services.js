'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('services', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT
      },
      price: {
        type: Sequelize.INTEGER
      },
      unit: {
        type: Sequelize.STRING,
        comment: 'tháng, lượt, m2, người'
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('services')
  }
}
