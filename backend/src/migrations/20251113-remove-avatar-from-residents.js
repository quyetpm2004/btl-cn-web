"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Remove the avatar column from residents. This preserves all other data.
    await queryInterface.removeColumn("residents", "avatar");
  },
  async down(queryInterface, Sequelize) {
    // Re-add the avatar column on rollback (nullable so existing rows are fine).
    await queryInterface.addColumn("residents", "avatar", {
      type: Sequelize.STRING,
      allowNull: true,
      comment: "URL or path to resident avatar image",
    });
  },
};
