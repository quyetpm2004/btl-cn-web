"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Add resident_id column (nullable) to maintenance_schedules
    await queryInterface.addColumn("maintenance_schedules", "resident_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      comment: "references residents.id",
    });

    // Add foreign key constraint
    await queryInterface.addConstraint("maintenance_schedules", {
      fields: ["resident_id"],
      type: "foreign key",
      name: "fk_maintenance_schedules_resident_id",
      references: {
        table: "residents",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove constraint then column
    await queryInterface.removeConstraint(
      "maintenance_schedules",
      "fk_maintenance_schedules_resident_id"
    );
    await queryInterface.removeColumn("maintenance_schedules", "resident_id");
  },
};
