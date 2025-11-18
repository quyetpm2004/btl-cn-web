"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("residents", "avatar", {
      type: Sequelize.STRING,
      allowNull: true,
      comment: "URL or path to resident avatar image",
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("residents", "avatar");
  },
};
