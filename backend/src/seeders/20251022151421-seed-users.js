'use strict'
const bcrypt = require('bcryptjs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        username: 'admin',
        password: await bcrypt.hash('admin123', 10),
        role_id: 1,
        email: 'admin@apartment.com',
        phone: '0123456789',
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        username: 'resident1',
        password: await bcrypt.hash('resident123', 10),
        role_id: 2,
        email: 'resident1@apartment.com',
        phone: '0123456789',
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        username: 'manager1',
        password: await bcrypt.hash('manager123', 10),
        role_id: 3,
        email: 'manager1@apartment.com',
        phone: '0123456789',
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        username: 'accountant1',
        password: await bcrypt.hash('accountant123', 10),
        role_id: 4,
        email: 'accountant1@apartment.com',
        phone: '0123456789',
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        username: 'technician1',
        password: await bcrypt.hash('tech123', 10),
        role_id: 5,
        email: 'technician1@apartment.com',
        phone: '0123456789',
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {})
  }
}
