"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "maintenance_requests",
      [
        {
          id: 1,
          title: "Sửa bóng đèn hành lang",
          result: null,
          work_type_id: 1, // Sửa điện
          resident_id: 1,
          description: "Bóng đèn hành lang tầng 3 bị cháy, cần thay mới",
          images: JSON.stringify(["https://example.com/images/light1.jpg"]),
          priority: "medium",
          status: 0,
          assigned_to: 2,
          resolved_at: null,
          created_at: new Date(),
        },
        {
          id: 2,
          title: "Rò rỉ nước trong phòng vệ sinh",
          result: null,
          work_type_id: 2, // Sửa nước
          resident_id: 3,
          description: "Ống nước dưới bồn rửa bị rò rỉ, nước chảy liên tục",
          images: JSON.stringify(["https://example.com/images/water1.jpg"]),
          priority: "high",
          status: 1,
          assigned_to: 4,
          resolved_at: new Date(),
          created_at: new Date(),
        },
        {
          id: 3,
          title: "Camera hành lang không hoạt động",
          result: null,
          work_type_id: 3, // Thiết bị chung cư
          resident_id: 5,
          description: "Camera ngay cửa thang máy tầng 5 bị mất tín hiệu",
          images: JSON.stringify([]),
          priority: "low",
          status: 0,
          assigned_to: null,
          resolved_at: null,
          created_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("maintenance_requests", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  },
};
