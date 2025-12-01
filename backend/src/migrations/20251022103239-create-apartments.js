'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('apartments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      apartment_code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      building: {
        type: Sequelize.STRING
      },
      type_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'apartment_types',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      area: {
        type: Sequelize.FLOAT
      },
      status: {
        type: Sequelize.TINYINT,
        defaultValue: 0,
        comment: '0: vacant | 1: occupied (owner)'
      },
      floor: {
        type: Sequelize.INTEGER
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('apartments')
  }
}
