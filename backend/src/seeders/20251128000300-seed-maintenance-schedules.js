'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date()
    const addHours = (date, h) => new Date(date.getTime() + h * 60 * 60 * 1000)
    const addDays = (days) =>
      new Date(now.getTime() + days * 24 * 60 * 60 * 1000)

    await queryInterface.bulkInsert('maintenance_schedules', [
      {
        title: 'Bảo trì thang máy Tòa A',
        description:
          'Kiểm tra định kỳ hệ thống cáp và phanh an toàn thang máy số 1 và 2.',
        maintenance_object: 'Thang máy',
        location: 'Tòa A - Sảnh chính',
        start_at: addDays(1), // Tomorrow
        end_at: addHours(addDays(1), 2), // Tomorrow + 2h
        assigned_to: 11,
        status: 0,
        created_by: 1,
        created_at: new Date()
      },
      {
        title: 'Vệ sinh hồ bơi',
        description: 'Thay nước và xử lý hóa chất hồ bơi khu vực tiện ích.',
        maintenance_object: 'Hồ bơi',
        location: 'Khu tiện ích tầng 2',
        start_at: addDays(-2), // 2 days ago
        end_at: addHours(addDays(-2), 4), // 2 days ago + 4h
        assigned_to: 12,
        status: 1,
        created_by: 1,
        created_at: new Date()
      },
      {
        title: 'Kiểm tra thiết bị Gym',
        description: 'Bảo dưỡng máy chạy bộ và các thiết bị tập tạ.',
        maintenance_object: 'Phòng Gym',
        location: 'Tòa B - Tầng 3',
        start_at: addDays(3),
        end_at: addHours(addDays(3), 1),
        assigned_to: 13,
        status: 0,
        created_by: 1,
        created_at: new Date()
      },
      {
        title: 'Kiểm tra hệ thống báo cháy',
        description: 'Test thử hệ thống chuông báo và đầu báo khói các tầng.',
        maintenance_object: 'Hệ thống PCCC',
        location: 'Toàn bộ tòa nhà',
        start_at: addDays(5),
        end_at: addHours(addDays(5), 3),
        assigned_to: 13,
        status: 0,
        created_by: 1,
        created_at: new Date()
      },
      {
        title: 'Cắt tỉa cây xanh',
        description: 'Chăm sóc và cắt tỉa cây cảnh khuôn viên phía trước.',
        maintenance_object: 'Cảnh quan',
        location: 'Khuôn viên ngoài trời',
        start_at: addDays(-5),
        end_at: addHours(addDays(-5), 5),
        assigned_to: 12,
        status: 1,
        created_by: 1,
        created_at: new Date()
      },
      {
        title: 'Bảo dưỡng điều hòa trung tâm',
        description: 'Vệ sinh màng lọc và kiểm tra gas hệ thống điều hòa sảnh.',
        maintenance_object: 'Điều hòa',
        location: 'Sảnh Lễ tân',
        start_at: addDays(2),
        end_at: addHours(addDays(2), 2),
        assigned_to: 11,
        status: 0,
        created_by: 1,
        created_at: new Date()
      },
      {
        title: 'Kiểm tra hệ thống chiếu sáng hầm xe',
        description: 'Thay thế bóng đèn hỏng và kiểm tra tủ điện chiếu sáng.',
        maintenance_object: 'Hệ thống chiếu sáng',
        location: 'Hầm B1, B2',
        start_at: addDays(4),
        end_at: addHours(addDays(4), 3),
        assigned_to: 17,
        status: 0,
        created_by: 1,
        created_at: new Date()
      },
      {
        title: 'Bảo trì máy phát điện dự phòng',
        description: 'Chạy thử tải và kiểm tra nhiên liệu máy phát điện.',
        maintenance_object: 'Máy phát điện',
        location: 'Phòng kỹ thuật Tòa A',
        start_at: addDays(6),
        end_at: addHours(addDays(6), 4),
        assigned_to: 12,
        status: 0,
        created_by: 1,
        created_at: new Date()
      },
      {
        title: 'Vệ sinh khu vực rác thải',
        description: 'Phun khử trùng và vệ sinh tổng thể nhà chứa rác.',
        maintenance_object: 'Khu vực rác',
        location: 'Nhà rác trung tâm',
        start_at: addDays(-1),
        end_at: addHours(addDays(-1), 2),
        assigned_to: 13,
        status: 1,
        created_by: 1,
        created_at: new Date()
      },
      {
        title: 'Kiểm tra camera an ninh',
        description: 'Kiểm tra góc quay và tín hiệu ghi hình các camera.',
        maintenance_object: 'Camera',
        location: 'Các sảnh và hành lang',
        start_at: addDays(0),
        end_at: addHours(addDays(0), 5),
        assigned_to: 15,
        status: 0,
        created_by: 1,
        created_at: new Date()
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('maintenance_schedules', null, {
      truncate: true,
      cascade: true,
      restartIdentity: true
    })
  }
}
