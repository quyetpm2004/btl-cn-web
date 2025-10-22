'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('residents', [
      {
        user_id: 2,
        full_name: 'Nguyễn Văn E',
        gender: 1,
        dob: '1980-03-03',
        place_of_birth: 'Hà Nội',
        ethnicity: 'Kinh',
        occupation: 'Kỹ sư',
        hometown: 'Nam Định',
        id_card: '123456789012',
        household_no: '987654321',
        status: 1,
        registered_at: new Date()
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('residents', null, {})
  }
}
