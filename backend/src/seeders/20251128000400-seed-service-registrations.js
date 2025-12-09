'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    const registration = []

    for (let i = 1; i <= 20; i++) {
      for (let j = 1; j <= 3; j++) {
        registration.push({
          apartment_id: i,
          service_id: j,
          start_date: new Date('2025-01-01'),
          status: 1
        })
      }

      if (i < 5) {
        registration.push({
          apartment_id: i,
          service_id: 4,
          start_date: new Date('2025-01-01'),
          status: 1
        })
      }
    }

    await queryInterface.bulkInsert('service_registrations', registration)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('service_registrations', null, {
      truncate: true,
      cascade: true,
      restartIdentity: true
    })
  }
}
