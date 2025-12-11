'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'maintenance_requests',
      [
        {
          id: 1,
          resident_id: 1,
          apartment_id: null,
          location: 'Hành lang tầng 3',
          title: 'Sửa bóng đèn hành lang',
          description: 'Bóng đèn hành lang tầng 3 bị cháy, cần thay mới',
          images: JSON.stringify(['https://example.com/images/light1.jpg']),
          status: 0,
          result: null,
          work_type_id: 1, // Sửa điện
          assigned_to: null,
          resolved_at: null,
          created_at: new Date()
        },
        {
          id: 2,
          resident_id: 3,
          apartment_id: 3,
          location: null,
          title: 'Rò rỉ nước trong phòng vệ sinh',
          description: 'Ống nước dưới bồn rửa bị rò rỉ, nước chảy liên tục',
          images: JSON.stringify(['https://example.com/images/water1.jpg']),
          status: 1,
          result: null,
          work_type_id: 2, // Sửa nước
          assigned_to: 4,
          resolved_at: new Date(),
          created_at: new Date()
        },
        {
          id: 3,
          resident_id: 5,
          apartment_id: null,
          location: 'Cửa thang máy tầng 5',
          title: 'Camera hành lang không hoạt động',
          description: 'Camera ngay cửa thang máy tầng 5 bị mất tín hiệu',
          images: JSON.stringify([]),
          status: 0,
          result: null,
          work_type_id: 3, // Thiết bị chung cư
          assigned_to: null,
          resolved_at: null,
          created_at: new Date()
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('maintenance_requests', null, {
      truncate: true,
      cascade: true,
      restartIdentity: true
    })
  }
}
