"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("invoices", [
      {
        apartment_id: 1,
        period_id: 1,
        total_amount: 8100000, // Sẽ cập nhật sau khi có invoice_items
        status: 1,
        created_by: 1,
        note: "Hóa đơn tháng 10 - Căn A101",
        created_at: '2025-10-01T10:00:00Z',
        end_date: '2025-11-10T23:59:59Z',
        paid_at: '2025-11-03 17:20:25',
      },
      {
        apartment_id: 1,
        period_id: 2,
        total_amount: 7910000,
        status: 1,
        created_by: 1,
        note: "Hóa đơn tháng 9 - Căn A101",
        created_at: '2025-09-01T10:00:00Z',
        end_date: '2025-10-10T23:59:59Z',
        paid_at: '2025-10-03 17:20:25',
      },
      {
        apartment_id: 1,
        period_id: 3,
        total_amount: 8205000,
        status: 1,
        created_by: 1,
        note: "Hóa đơn tháng 8 - Căn A101",
        created_at: '2025-08-01T10:00:00Z',
        end_date: '2025-09-10T23:59:59Z',
        paid_at: '2025-09-03 17:20:25',
      },
      {
        apartment_id: 1,
        period_id: 4,
        total_amount: 8075000, // Sẽ cập nhật sau khi có invoice_items
        status: 0,
        created_by: 1,
        note: "Hóa đơn tháng 11 - Căn A101",
        created_at: '2025-11-01T10:00:00Z',
        end_date: '2025-12-10T23:59:59Z'
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("invoices", null, {});
  }
};
