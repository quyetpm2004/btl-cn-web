"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // GIẢ SỬ service_id theo thứ tự bạn seed:
    const SERVICE_FEE = 1;   // Phí quản lý
    const ELECTRICITY = 2;   // Điện
    const WATER = 3;         // Nước
    const INTERNET = 4;      // Internet
    const PARKING_CAR = 5;       // Bãi đỗ xe
    const PARKING_MOTORBIKE = 6;       // Bãi đỗ xe
    const RENT = 9; // Tiền thuê nhà (dịch vụ riêng)

    
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
      {
        invoice_id: 1,
        service_id: INTERNET,
        quantity: 1,
        unit_price: 200000,
        amount: 1 * 200000,
        created_at: now
      },
      {
        invoice_id: 1,
        service_id: PARKING_MOTORBIKE,
        quantity: 2,
        unit_price: 100000,
        amount: 2 * 100000,
        created_at: now
      },
      {
        invoice_id: 1,
        service_id: PARKING_CAR,
        quantity: 1,
        unit_price: 1200000,
        amount: 1 * 1200000,
        created_at: now
      },
      {
        invoice_id: 1,
        service_id: RENT,
        quantity: 1,
        unit_price: 5000000,
        amount: 1 * 5000000,
        created_at: now
      },

      // Invoice 2: Apartment 2
      // Tiền thuê nhà riêng cho căn hộ 2
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
      {
        invoice_id: 2,
        service_id: INTERNET,
        quantity: 1,
        unit_price: 200000,
        amount: 1 * 200000,
        created_at: now
      },
      {
        invoice_id: 2,
        service_id: PARKING_MOTORBIKE,
        quantity: 2,
        unit_price: 100000,
        amount: 2 * 100000,
        created_at: now
      },
      {
        invoice_id: 2,
        service_id: PARKING_CAR,
        quantity: 1,
        unit_price: 1200000,
        amount: 1 * 1200000,
        created_at: now
      },
      {
        invoice_id: 2,
        service_id: RENT,
        quantity: 1,
        unit_price: 5000000,
        amount: 1 * 5000000,
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
      },
      {
        invoice_id: 3,
        service_id: INTERNET,
        quantity: 1,
        unit_price: 200000,
        amount: 1 * 200000,
        created_at: now
      },
      {
        invoice_id: 3,
        service_id: PARKING_MOTORBIKE,
        quantity: 2,
        unit_price: 100000,
        amount: 2 * 100000,
        created_at: now
      },
      {
        invoice_id: 3,
        service_id: PARKING_CAR,
        quantity: 1,
        unit_price: 1200000,
        amount: 1 * 1200000,
        created_at: now
      },
      {
        invoice_id: 3,
        service_id: RENT,
        quantity: 1,
        unit_price: 5000000,
        amount: 1 * 5000000,
        created_at: now
      },

      // tháng 11 - apartment 1
      {
        invoice_id: 4,
        service_id: SERVICE_FEE,
        quantity: 60,
        unit_price: 15000,
        amount: 60 * 15000,
        created_at: now
      },
      {
        invoice_id: 4,
        service_id: ELECTRICITY,
        quantity: 100,
        unit_price: 2500,
        amount: 100 * 2500,
        created_at: now
      },
      {
        invoice_id: 4,
        service_id: WATER,
        quantity: 9,
        unit_price: 15000,
        amount: 9 * 15000,
        created_at: now
      },
      {
        invoice_id: 4,
        service_id: INTERNET,
        quantity: 1,
        unit_price: 200000,
        amount: 1 * 200000,
        created_at: now
      },
      {
        invoice_id: 4,
        service_id: PARKING_MOTORBIKE,
        quantity: 2,
        unit_price: 100000,
        amount: 2 * 100000,
        created_at: now
      },
      {
        invoice_id: 4,
        service_id: PARKING_CAR,
        quantity: 1,
        unit_price: 1200000,
        amount: 1 * 1200000,
        created_at: now
      },
      {
        invoice_id: 4,
        service_id: RENT,
        quantity: 1,
        unit_price: 5000000,
        amount: 1 * 5000000,
        created_at: now
      },
    ];

    await queryInterface.bulkInsert("invoice_items", items);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("invoice_items", null, {});
  }
};
