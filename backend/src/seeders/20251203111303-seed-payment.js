'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('payments', [
      {
        invoice_id: 3,
        resident_id: 1,
        method: 'credit_card',
        amount: 8205000,
        paid_at: '2025-09-03 17:20:25',
        transaction_code: '15317712'
      },
      {
        invoice_id: 2,
        resident_id: 1,
        method: 'credit_card',
        amount: 7910000,
        paid_at: '2025-10-03 17:20:48',
        transaction_code: '15317716',
      },
      {
        invoice_id: 1,
        resident_id: 1,
        method: 'credit_card',
        amount: 8100000,
        paid_at: '2025-11-03 17:57:41',
        transaction_code: '15317789',
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
