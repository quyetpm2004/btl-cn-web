'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('apartment_types', [
      {
        name: 'Studio',
        description: 'Căn hộ Studio, diện tích nhỏ gọn'
      },
      {
        name: '1 Phòng Ngủ',
        description: 'Căn hộ 1 phòng ngủ'
      },
      {
        name: '2 Phòng Ngủ',
        description: 'Căn hộ 2 phòng ngủ'
      },
      {
        name: '3 Phòng Ngủ',
        description: 'Căn hộ 3 phòng ngủ'
      },
      {
        name: 'Penthouse',
        description: 'Căn hộ cao cấp penthouse'
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('apartment_types', null, {})
  }
}
