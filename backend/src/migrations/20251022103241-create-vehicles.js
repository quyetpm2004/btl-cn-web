'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('vehicles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      apartment_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'apartments',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      type: {
        type: Sequelize.TINYINT,
        comment: '1: car | 2: motorbike | 3: bicycle'
      },
      brand: {
        type: Sequelize.STRING
      },
      license_plate: {
        type: Sequelize.STRING,
        unique: true
      },
      color: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.TINYINT,
        defaultValue: 1,
        comment: '0: inactive | 1: active'
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('vehicles')
  }
}
