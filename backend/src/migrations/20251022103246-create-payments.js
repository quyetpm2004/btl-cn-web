'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('payments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      invoice_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'invoices',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      resident_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'residents',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      method: {
        type: Sequelize.STRING,
        comment: 'cash | bank_transfer'
      },
      amount: {
        type: Sequelize.BIGINT
      },
      paid_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      transaction_code: {
        type: Sequelize.STRING
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('payments')
  }
}
