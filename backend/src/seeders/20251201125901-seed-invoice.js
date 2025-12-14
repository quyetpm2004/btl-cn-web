'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('invoices', [
      {
        apartment_id: 1,
        period_id: 1,
        total_amount: 8100000, // Sẽ cập nhật sau khi có invoice_items
        status: 1,
        created_by: 1,
        note: 'Hóa đơn tháng 10 - Căn A101',
        created_at: '2025-10-01T10:00:00Z',
        end_date: '2025-10-31',
        paid_at: '2025-11-03 17:20:25'
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('invoices', null, {})
  }
}
