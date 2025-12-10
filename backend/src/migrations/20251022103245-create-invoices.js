'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('invoices', {
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
      period_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'collection_periods',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      total_amount: {
        type: Sequelize.BIGINT
      },
      end_date: {
        type: Sequelize.DATEONLY
      },
      status: {
        type: Sequelize.TINYINT,
        defaultValue: 0,
        comment: '0: unpaid | 1: paid | 2: overdue | 3: cancelled'
      },
      created_at: {
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
      },
      note: {
        type: Sequelize.TEXT
      },
      paid_at: {
        type: Sequelize.DATE,
        allowNull: true
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('invoices')
  }
}
