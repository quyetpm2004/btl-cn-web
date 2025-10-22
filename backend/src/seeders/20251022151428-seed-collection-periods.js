'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('collection_periods', [
      {
        name: 'Tháng 10/2025',
        type: 1,
        start_date: '2025-10-01',
        end_date: '2025-10-31',
        description: 'Kỳ thu phí tháng 10 năm 2025',
        created_at: '2025-09-30 10:00:00',
        created_by: 4,
        status: 1
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('collection_periods', null, {})
  }
}
