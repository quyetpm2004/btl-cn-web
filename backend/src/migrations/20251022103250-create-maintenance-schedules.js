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
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      maintenance_object: {
        type: Sequelize.STRING,
        comment: 'Elevator, Swimming Pool, Gym, etc.'
      },
      location: {
        type: Sequelize.STRING
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
      status: {
        type: Sequelize.TINYINT,
        defaultValue: 0,
        comment: '0: scheduled | 1: completed'
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      created_by: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('maintenance_schedules')
  }
}
