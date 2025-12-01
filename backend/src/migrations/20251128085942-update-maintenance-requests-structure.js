"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Xóa dữ liệu cũ (truncate)
    await queryInterface.bulkDelete("maintenance_requests", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });

    // 2. Xóa cột equipment_id
    await queryInterface.removeColumn("maintenance_requests", "equipment_id");

    // 3. Thêm cột title
    await queryInterface.addColumn("maintenance_requests", "title", {
      type: Sequelize.STRING,
      allowNull: false,
    });

    // 4. Thêm cột result
    await queryInterface.addColumn("maintenance_requests", "result", {
      type: Sequelize.TEXT,
      allowNull: true,
    });

    // 5. Thêm cột work_type (loại công việc)
    await queryInterface.addColumn("maintenance_requests", "work_type", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    // Rollback: thêm lại equipment_id và xóa các cột mới
    await queryInterface.addColumn("maintenance_requests", "equipment_id", {
      type: Sequelize.INTEGER,
    });

    await queryInterface.removeColumn("maintenance_requests", "title");
    await queryInterface.removeColumn("maintenance_requests", "result");
    await queryInterface.removeColumn("maintenance_requests", "work_type");
  },
};
