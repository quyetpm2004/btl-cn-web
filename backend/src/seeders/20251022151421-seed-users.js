'use strict'
const bcrypt = require('bcryptjs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Map role names to IDs
    const roles = await queryInterface.sequelize.query(
      `SELECT id, name FROM roles`
    )
    const roleId = {}
    roles[0].forEach((r) => (roleId[r.name] = r.id))

    const users = []
    const now = new Date()

    // 2 Admin
    for (let i = 1; i <= 2; i++) {
      users.push({
        username: `admin${i}`,
        password: bcrypt.hashSync('123456', 10),
        role_id: roleId['Admin'],
        email: `admin${i}@gmail.com`,
        phone: `09000000${i.toString().padStart(2, '0')}`,
        status: 1,
        created_at: now,
        updated_at: now
      })
    }

    // 3 Manager
    for (let i = 1; i <= 3; i++) {
      users.push({
        username: `manager${i}`,
        password: bcrypt.hashSync('123456', 10),
        role_id: roleId['Manager'],
        email: `manager${i}@gmail.com`,
        phone: `09100000${i.toString().padStart(2, '0')}`,
        status: 1,
        created_at: now,
        updated_at: now
      })
    }

    // 5 Accountant
    for (let i = 1; i <= 5; i++) {
      users.push({
        username: `accountant${i}`,
        password: bcrypt.hashSync('123456', 10),
        role_id: roleId['Accountant'],
        email: `accountant${i}@gmail.com`,
        phone: `09200000${i.toString().padStart(2, '0')}`,
        status: 1,
        created_at: now,
        updated_at: now
      })
    }

    // 10 Technician
    for (let i = 1; i <= 10; i++) {
      users.push({
        username: `technician${i}`,
        password: bcrypt.hashSync('123456', 10),
        role_id: roleId['Technician'],
        email: `technician${i}@gmail.com`,
        phone: `09300000${i.toString().padStart(2, '0')}`,
        status: 1,
        created_at: now,
        updated_at: now
      })
    }

    // 100 Residents
    for (let i = 1; i <= 100; i++) {
      users.push({
        username: `resident${i}`,
        password: bcrypt.hashSync('123456', 10),
        role_id: roleId['Resident'],
        email: `resident${i}@gmail.com`,
        phone: `09${Math.floor(Math.random() * 9) + 1}${Math.floor(
          Math.random() * 1000000
        )
          .toString()
          .padStart(7, '0')}`,
        status: 1,
        created_at: now,
        updated_at: now
      })
    }

    await queryInterface.bulkInsert('users', users)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {})
  }
}
