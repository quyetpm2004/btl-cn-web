'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Lấy tất cả user KHÔNG phải Resident => là Staff
    const [rows] = await queryInterface.sequelize.query(`
      SELECT u.id, u.username, r.name AS role_name
      FROM users u
      JOIN roles r ON u.role_id = r.id
      WHERE r.name <> 'Resident'
      ORDER BY u.id ASC
    `)

    const roleToDepartment = {
      Admin: 'Ban quản trị',
      Manager: 'Ban quản lý',
      Accountant: 'Phòng tài chính',
      Technician: 'Phòng kỹ thuật'
    }
    const roleToPosition = {
      Admin: 'Quản trị viên',
      Manager: 'Quản lý',
      Accountant: 'Kế toán',
      Technician: 'Kỹ thuật viên'
    }

    const staffs = []
    const baseStart = new Date(2021, 0, 1)

    for (let i = 0; i < rows.length; i++) {
      const u = rows[i]
      const dob = new Date(
        1980 + Math.floor(Math.random() * 20),
        Math.floor(Math.random() * 12),
        1 + Math.floor(Math.random() * 28)
      )
      staffs.push({
        user_id: u.id,
        full_name: `${roleToPosition[u.role_name] || 'Nhân viên'} ${i + 1}`,
        gender: Math.floor(Math.random() * 3) + 1,
        phone: `0${300000000 + i}`,
        dob: dob.toISOString().split('T')[0],
        id_card: `${100000000 + i}`,
        position: roleToPosition[u.role_name] || 'Nhân viên',
        department: roleToDepartment[u.role_name] || 'Hành chính',
        start_date: baseStart.toISOString().split('T')[0],
        status: 1
      })
    }

    if (staffs.length) {
      await queryInterface.bulkInsert('staffs', staffs)
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('staffs', null, {})
  }
}
