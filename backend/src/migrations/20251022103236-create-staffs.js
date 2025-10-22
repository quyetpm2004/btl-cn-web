'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('staffs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      full_name: {
        type: Sequelize.STRING
      },
      dob: {
        type: Sequelize.DATEONLY
      },
      gender: {
        type: Sequelize.TINYINT,
        comment: '1: male | 2: female | 3: other'
      },
      position: {
        type: Sequelize.STRING
      },
      department: {
        type: Sequelize.STRING
      },
      id_card: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      start_date: {
        type: Sequelize.DATEONLY
      },
      salary: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.TINYINT,
        defaultValue: 1,
        comment: '0: resigned | 1: active | 2: on leave'
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('staffs')
  }
}
