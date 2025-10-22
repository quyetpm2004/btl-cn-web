'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('staffs', [
      {
        user_id: 1,
        full_name: 'Nguyễn Văn A',
        dob: '2000-12-12',
        gender: 1,
        position: 'Quản trị viên',
        department: 'Phòng Quản trị hệ thống',
        id_card: '123456789012',
        address: '123 Đường ABC, Phường 1, Quận 1, Hà Nội',
        start_date: '2020-01-01',
        salary: 15000000,
        status: 1
      },
      {
        user_id: 3,
        full_name: 'Nguyễn Văn B',
        dob: '1990-01-01',
        gender: 1,
        position: 'Quản lý',
        department: 'Ban Quản lý chung cư',
        id_card: '123456789012',
        address: '123 Đường ABC, Phường 1, Quận 1, Hà Nội',
        start_date: '2020-01-01',
        salary: 18000000,
        status: 1
      },
      {
        user_id: 4,
        full_name: 'Nguyễn Thị C',
        dob: '1995-05-05',
        gender: 2,
        position: 'Thu ngân',
        department: 'Phòng Kinh doanh',
        id_card: '987654321012',
        address: '456 Đường DEF, Phường 2, Quận 2, Hà Nội',
        start_date: '2021-06-15',
        salary: 10000000,
        status: 1
      },
      {
        user_id: 5,
        full_name: 'Nguyễn Văn D',
        dob: '1999-02-02',
        gender: 1,
        position: 'Kỹ thuật viên',
        department: 'Phòng Bảo trì',
        id_card: '123456789012',
        address: '123 Đường ABC, Phường 1, Quận 1, Hà Nội',
        start_date: '2020-01-01',
        salary: 12000000,
        status: 1
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('staffs', null, {})
  }
}
