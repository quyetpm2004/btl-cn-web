"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // GIẢ SỬ service_id theo thứ tự bạn seed:
    const SERVICE_FEE = 1;   // Phí quản lý
    const ELECTRICITY = 2;   // Điện
    const WATER = 3;         // Nước
    
    const now = new Date();

    const items = [
      // Invoice 1: Apartment 1
      {
        invoice_id: 1,
        service_id: SERVICE_FEE,
        quantity: 70,         // 70m2
        unit_price: 15000,
        amount: 70 * 15000,
        created_at: now
      },
      {
        invoice_id: 1,
        service_id: ELECTRICITY,
        quantity: 120,        // 120 kWh
        unit_price: 2500,
        amount: 120 * 2500,
        created_at: now
      },
      {
        invoice_id: 1,
        service_id: WATER,
        quantity: 10,
        unit_price: 15000,
        amount: 10 * 15000,
        created_at: now
      },

      // Invoice 2: Apartment 2
      {
        invoice_id: 2,
        service_id: SERVICE_FEE,
        quantity: 80,
        unit_price: 15000,
        amount: 80 * 15000,
        created_at: now
      },
      {
        invoice_id: 2,
        service_id: ELECTRICITY,
        quantity: 90,
        unit_price: 2500,
        amount: 90 * 2500,
        created_at: now
      },
      {
        invoice_id: 2,
        service_id: WATER,
        quantity: 12,
        unit_price: 15000,
        amount: 12 * 15000,
        created_at: now
      },

      // Invoice 3: Apartment 3
      {
        invoice_id: 3,
        service_id: SERVICE_FEE,
        quantity: 60,
        unit_price: 15000,
        amount: 60 * 15000,
        created_at: now
      },
      {
        invoice_id: 3,
        service_id: ELECTRICITY,
        quantity: 110,
        unit_price: 2500,
        amount: 110 * 2500,
        created_at: now
      },
      {
        invoice_id: 3,
        service_id: WATER,
        quantity: 9,
        unit_price: 15000,
        amount: 9 * 15000,
        created_at: now
      }
    ];

    await queryInterface.bulkInsert("invoice_items", items);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("invoice_items", null, {});
  }
};
