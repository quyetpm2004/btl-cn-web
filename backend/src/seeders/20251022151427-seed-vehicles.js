'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('vehicles', [
      {
        apartment_id: 1,
        type: 1,
        brand: 'Toyota',
        license_plate: '30A-12345',
        color: 'Red',
        status: 1
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('vehicles', null, {})
  }
}
