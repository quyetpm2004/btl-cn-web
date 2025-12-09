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
        created_by: 6,
        status: 0
      },
      {
        name: 'Tháng 11/2025',
        type: 1,
        start_date: '2025-11-01',
        end_date: '2025-11-30',
        description: 'Kỳ thu phí tháng 11 năm 2025',
        created_at: '2025-10-31 10:00:00',
        created_by: 6,
        status: 0
      },
      {
        name: 'Tháng 12/2025',
        type: 1,
        start_date: '2025-12-01',
        end_date: '2025-12-31',
        description: 'Kỳ thu phí tháng 12 năm 2025',
        created_at: '2025-11-30 10:00:00',
        created_by: 6,
        status: 1
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('collection_periods', null, {})
  }
}
