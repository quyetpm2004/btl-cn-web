'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'payments',
      [
        {
          invoice_id: 1,
          resident_id: 1,
          method: 'credit_card',
          amount: 8100000,
          paid_at: '2025-11-03 17:57:41',
          transaction_code: '15317789'
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('payments', null, {})
  }
}
