'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('news', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      content: {
        type: Sequelize.TEXT
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      category: {
        type: Sequelize.TINYINT,
        comment: '1:event | 2:thông báo | 3:hướng dẫn | 4:tin nội khu'
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('news')
  }
}
