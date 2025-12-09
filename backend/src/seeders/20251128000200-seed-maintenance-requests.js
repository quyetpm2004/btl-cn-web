'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('maintenance_requests', [
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
        assigned_to: 14,
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
      },
      {
        id: 4,
        resident_id: 2,
        apartment_id: 2,
        location: null,
        title: 'Cửa sổ phòng khách bị kẹt',
        description: 'Cửa sổ phòng khách không thể mở ra được',
        images: JSON.stringify(['https://example.com/images/window1.jpg']),
        status: 1,
        result: 'Đã bôi trơn và sửa chữa cơ chế khóa cửa sổ.',
        work_type_id: 4, // Vật tư khác
        assigned_to: 15,
        resolved_at: new Date(),
        created_at: new Date()
      },
      {
        id: 5,
        resident_id: 4,
        apartment_id: 4,
        location: 'Sân chơi trẻ em',
        title: 'Sửa dụng cụ chơi bị hỏng',
        description:
          'Một số dụng cụ chơi trong sân chơi trẻ em bị hỏng cần sửa chữa',
        images: JSON.stringify(['https://example.com/images/playground1.jpg']),
        status: 0,
        result: null,
        work_type_id: 4, // Vật tư khác
        assigned_to: null,
        resolved_at: null,
        created_at: new Date()
      },
      {
        id: 6,
        resident_id: 6,
        apartment_id: null,
        location: 'Hồ bơi tầng thượng',
        title: 'Hệ thống lọc nước hồ bơi không hoạt động',
        description: 'Nước hồ bơi không được lọc sạch, cần kiểm tra hệ thống',
        images: JSON.stringify(['https://example.com/images/pool1.jpg']),
        status: 1,
        result: null,
        work_type_id: 3, // Thiết bị chung cư
        assigned_to: 16,
        resolved_at: new Date(),
        created_at: new Date()
      },
      {
        id: 7,
        resident_id: 7,
        apartment_id: null,
        location: 'Sân chung cư',
        title: 'Sửa chữa hệ thống chiếu sáng công cộng',
        description:
          'Một số đèn chiếu sáng công cộng trong khu vực không hoạt động',
        images: JSON.stringify([]),
        status: 0,
        result: null,
        work_type_id: 1, // Sửa điện
        assigned_to: null,
        resolved_at: null,
        created_at: new Date()
      },
      {
        id: 8,
        resident_id: 8,
        apartment_id: 5,
        location: null,
        title: 'Sửa chữa vòi nước nóng trong căn hộ',
        description: 'Vòi nước nóng trong căn hộ không hoạt động',
        images: JSON.stringify(['https://example.com/images/hotwater1.jpg']),
        status: 0,
        result: null,
        work_type_id: 2, // Sửa nước
        assigned_to: null,
        resolved_at: null,
        created_at: new Date()
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('maintenance_requests', null, {
      truncate: true,
      cascade: true,
      restartIdentity: true
    })
  }
}
