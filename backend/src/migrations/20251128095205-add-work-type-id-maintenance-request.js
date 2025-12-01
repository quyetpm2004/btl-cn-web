"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Xóa dữ liệu cũ (truncate)
    await queryInterface.bulkDelete("maintenance_requests", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });

    // 5. Thêm cột work_type (loại công việc)
    await queryInterface.addColumn("maintenance_requests", "work_type_id", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    // Rollback: thêm lại equipment_id và xóa các cột mới

    await queryInterface.removeColumn("maintenance_requests", "work_type_id");
  },
};
