'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('residents', {
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
      gender: {
        type: Sequelize.TINYINT,
        comment: '1: male | 2: female | 3: other'
      },
      dob: {
        type: Sequelize.DATEONLY
      },
      place_of_birth: {
        type: Sequelize.STRING
      },
      ethnicity: {
        type: Sequelize.STRING
      },
      occupation: {
        type: Sequelize.STRING
      },
      hometown: {
        type: Sequelize.STRING
      },
      id_card: {
        type: Sequelize.STRING
      },
      household_no: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.TINYINT,
        defaultValue: 1,
        comment: '1: currently residing | 2: temporarily absent | 3: moved out'
      },
      registered_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('residents')
  }
}
