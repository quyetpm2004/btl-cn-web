'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Insert services
    await queryInterface.bulkInsert('services', [
      {
        name: 'Phí quản lý',
        description: 'Phí quản lý chung cư hàng tháng',
        price: 15000,
        unit: 'm2'
      },
      {
        name: 'Điện',
        description: 'Tiền điện sinh hoạt',
        price: 2500,
        unit: 'kWh'
      },
      {
        name: 'Nước',
        description: 'Tiền nước sinh hoạt',
        price: 15000,
        unit: 'm3'
      },
      {
        name: 'Internet',
        description: 'Dịch vụ Internet',
        price: 200000,
        unit: 'tháng'
      },
      {
        name: 'Giữ xe ô tô',
        description: 'Phí giữ xe ô tô',
        price: 1200000,
        unit: 'tháng'
      },
      {
        name: 'Giữ xe máy',
        description: 'Phí giữ xe máy',
        price: 100000,
        unit: 'tháng'
      },
      {
        name: 'Phòng Gym',
        description: 'Sử dụng phòng gym',
        price: 300000,
        unit: 'tháng'
      },
      {
        name: 'Hồ bơi',
        description: 'Sử dụng hồ bơi',
        price: 500000,
        unit: 'tháng'
      },
      {
        name: 'Tiền thuê nhà',
        description: 'Tiền thuê căn hộ chung cư',
        price: 0,
        unit: 'tháng'
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('services', null, {})
  }
}
