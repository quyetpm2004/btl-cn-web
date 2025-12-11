'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Thêm một vài thông báo mẫu
    await queryInterface.bulkInsert(
      'notifications',
      [
        {
          title: 'Cập nhật hệ thống quản lý cư dân',
          content:
            'Hệ thống sẽ được bảo trì từ 22:00 đến 23:30 tối nay để cập nhật tính năng mới.',
          created_by: 1,
          category: 1, // system
          created_at: new Date()
        },
        {
          title: 'Sự kiện Trung thu cho cư dân',
          content:
            'Ban quản lý mời quý cư dân tham gia lễ hội Trung thu vào ngày 10/9 tại khu vực sảnh chính.',
          created_by: 1,
          category: 2, // event
          created_at: new Date()
        },
        {
          title: 'Thông báo phí dịch vụ tháng 11',
          content:
            'Vui lòng thanh toán phí dịch vụ tháng 11 trước ngày 15 để tránh phát sinh phí trễ hạn.',
          created_by: 1,
          category: 3, // fee
          created_at: new Date()
        },
        {
          title: 'Bảo trì thang máy tòa A',
          content:
            'Thang máy số 2 tòa A sẽ được bảo trì từ 8:00 đến 11:00 sáng ngày 8/11.',
          created_by: 1,
          category: 4, // maintenance
          created_at: new Date()
        },
        {
          title: 'Khảo sát ý kiến cư dân',
          content:
            'Ban quản lý mong nhận được ý kiến đóng góp của cư dân về môi trường sống trong khu.',
          created_by: 1,
          category: 5, // other
          created_at: new Date()
        }
      ],
      { returning: true }
    )

    // Lấy các ID vừa tạo để tạo bản ghi ở bảng notification_receivers
    const insertedNotifications = await queryInterface.sequelize.query(
      `SELECT id FROM notifications ORDER BY id DESC LIMIT 5;`
    )

    const notificationRows = insertedNotifications[0]

    const receivers = notificationRows.map((n) => ({
      notification_id: n.id,
      user_id: 21, // gửi cho cư dân có id = 1
      is_read: false,
      read_at: null
    }))

    await queryInterface.bulkInsert('notification_receivers', receivers)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('notification_receivers', null, {})
    await queryInterface.bulkDelete('notifications', null, {})
  }
}
