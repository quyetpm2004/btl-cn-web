"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Add images column to maintenance_requests to store array of image URLs/paths
    await queryInterface.addColumn("maintenance_requests", "images", {
      type: Sequelize.JSON,
      allowNull: true,
      comment: "Array of image URLs or paths",
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("maintenance_requests", "images");
  },
};
