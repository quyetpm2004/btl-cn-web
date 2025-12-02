"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("invoices", [
      {
        apartment_id: 1,
        period_id: 1,
        total_amount: 0, // Sẽ cập nhật sau khi có invoice_items
        status: 0,
        created_by: 1,
        note: "Hóa đơn tháng 10 - Căn A101",
        created_at: new Date()
      },
      {
        apartment_id: 2,
        period_id: 1,
        total_amount: 0,
        status: 0,
        created_by: 1,
        note: "Hóa đơn tháng 10 - Căn A102",
        created_at: new Date()
      },
      {
        apartment_id: 3,
        period_id: 1,
        total_amount: 0,
        status: 0,
        created_by: 1,
        note: "Hóa đơn tháng 10 - Căn A103",
        created_at: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("invoices", null, {});
  }
};
