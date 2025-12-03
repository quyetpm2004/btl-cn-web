'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('notifications', {
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
      category: {
        type: Sequelize.TINYINT,
        comment: '1: system | 2: event | 3: fee | 4: maintenance | 5: other'
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      created_by: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('notifications')
  }
}
