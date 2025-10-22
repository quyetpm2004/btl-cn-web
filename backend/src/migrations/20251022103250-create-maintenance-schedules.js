'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('maintenance_schedules', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      equipment_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'equipments',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      start_at: {
        type: Sequelize.DATE
      },
      end_at: {
        type: Sequelize.DATE
      },
      assigned_to: {
        type: Sequelize.INTEGER,
        references: {
          model: 'staffs',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      description: {
        type: Sequelize.TEXT
      },
      status: {
        type: Sequelize.TINYINT,
        defaultValue: 0,
        comment: '0: scheduled | 1: completed'
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('maintenance_schedules')
  }
}
