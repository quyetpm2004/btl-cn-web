'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Insert services
    await queryInterface.bulkInsert('equipments', [
      {
        name: 'Camera 1',
        location: 'Cổng chính',
        status: 1,
        last_maintenance: '2025-09-30 10:00:00'
      },
      {
        name: 'Camera 2',
        location: 'Cổng phụ',
        status: 1,
        last_maintenance: '2025-09-30 10:00:00'
      },
      {
        name: 'Camera 3',
        location: 'Tầng 1 Tòa A',
        status: 1,
        last_maintenance: '2025-09-30 10:00:00'
      },
      {
        name: 'Thang máy 1',
        location: 'Tòa A',
        status: 1,
        last_maintenance: '2025-09-30 10:00:00'
      },
      {
        name: 'Thang máy 2',
        location: 'Tòa A',
        status: 1,
        last_maintenance: '2025-09-30 10:00:00'
      },
      {
        name: 'Thang máy 3',
        location: 'Tòa A',
        status: 1,
        last_maintenance: '2025-09-30 10:00:00'
      },
      {
        name: 'Thang máy 4',
        location: 'Tòa A',
        status: 1,
        last_maintenance: '2025-09-30 10:00:00'
      },
      {
        name: 'Thang máy 1',
        location: 'Tòa B',
        status: 1,
        last_maintenance: '2025-09-30 10:00:00'
      },
      {
        name: 'Thang máy 2',
        location: 'Tòa B',
        status: 1,
        last_maintenance: '2025-09-30 10:00:00'
      },
      {
        name: 'Thang máy 3',
        location: 'Tòa B',
        status: 1,
        last_maintenance: '2025-09-30 10:00:00'
      },
      {
        name: 'Thang máy 4',
        location: 'Tòa B',
        status: 1,
        last_maintenance: '2025-09-30 10:00:00'
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('equipments', null, {})
  }
}
