'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('resident_apartment', [
      {
        resident_id: 1,
        apartment_id: 1,
        relationship: 'Chủ hộ',
        start_date: '2023-01-01',
        end_date: null
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('resident_apartment', null, {})
  }
}
