'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Insert facilities
    await queryInterface.bulkInsert('facilities', [
      {
        name: 'Hồ bơi ngoài trời',
        description: 'Hồ bơi tiêu chuẩn Olympic với view đẹp'
      },
      {
        name: 'Phòng Gym hiện đại',
        description: 'Phòng tập gym với đầy đủ trang thiết bị'
      },
      {
        name: 'Sân chơi trẻ em',
        description: 'Khu vui chơi an toàn cho trẻ em'
      },
      {
        name: 'Công viên xanh',
        description: 'Khuôn viên cây xanh rộng rãi'
      },
      {
        name: 'Sân thể thao đa năng',
        description: 'Sân bóng đá, bóng rổ, cầu lông'
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('facilities', null, {})
  }
}
