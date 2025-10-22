'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('roles', [
      {
        name: 'Admin',
        description: 'Quản trị viên hệ thống, có toàn quyền'
      },
      {
        name: 'Resident',
        description: 'Cư dân chung cư'
      },
      {
        name: 'Manager',
        description: 'Quản lý chung cư, theo dõi báo cáo, thông báo, thiết bị'
      },
      {
        name: 'Accountant',
        description: 'Quản lý hóa đơn, thanh toán, công nợ, báo cáo tài chính'
      },
      {
        name: 'Technician',
        description:
          'Xử lý bảo trì, sửa chữa thiết bị, tiếp nhận yêu cầu cư dân'
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles', null, {})
  }
}
