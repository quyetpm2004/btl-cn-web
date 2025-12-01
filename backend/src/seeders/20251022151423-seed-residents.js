'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const residentUsers = await queryInterface.sequelize.query(
      `SELECT u.id 
      FROM users u 
      JOIN roles r ON u.role_id = r.id 
      WHERE r.name = 'Resident' LIMIT 100`
    )
    const userIds = residentUsers[0].map((u) => u.id)

    const occupations = [
      'Kỹ sư',
      'Bác sĩ',
      'Giáo viên',
      'NV văn phòng',
      'Kinh doanh',
      'Khác'
    ]
    const residents = []

    for (let i = 0; i < 100; i++) {
      const dob = new Date(
        1970 + Math.floor(Math.random() * 30),
        Math.floor(Math.random() * 12),
        1 + Math.floor(Math.random() * 28)
      )
      residents.push({
        user_id: userIds[i],
        full_name: `Cư dân ${i + 1}`,
        gender: Math.floor(Math.random() * 3) + 1,
        phone: `0${900000000 + i}`,
        dob: dob.toISOString().split('T')[0],
        place_of_birth: `Tỉnh ${Math.floor(Math.random() * 63) + 1}`,
        ethnicity: 'Kinh',
        occupation: occupations[Math.floor(Math.random() * occupations.length)],
        hometown: 'Hà Nội',
        id_card: `${300000000 + i}`,
        household_no: `HH${i + 1}`,
        status: 1,
        registered_at: new Date()
      })
    }

    await queryInterface.bulkInsert('residents', residents)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('residents', null, {})
  }
}
