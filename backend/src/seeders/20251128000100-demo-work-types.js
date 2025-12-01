"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "work_types",
      [
        {
          id: 1,
          name: "Sửa chữa điện",
          description: "Các công việc liên quan đến hệ thống điện",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          name: "Sửa ống nước",
          description: "Liên quan đến rò rỉ hoặc hỏng đường ống nước",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 3,
          name: "Thiết bị chung cư",
          description: "Sửa chữa thang máy, camera, cửa ra vào, v.v.",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 4,
          name: "Khác",
          description: "Các yêu cầu không thuộc nhóm trên",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("work_types", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  },
};
