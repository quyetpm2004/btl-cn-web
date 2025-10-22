'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('apartments', [
      {
        apartment_code: 'A101',
        building: 'A',
        type_id: 3,
        area: 90,
        status: 1,
        floor: 1,
        owner_id: 1
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('apartments', null, {})
  }
}
