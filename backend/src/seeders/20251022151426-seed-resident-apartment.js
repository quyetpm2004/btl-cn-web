'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Chỉ liên kết cư dân với những căn hộ đang ở (status = 1).
    // Với căn hộ cho thuê (status = 2) hoặc trống (status = 0) thì không tạo liên kết cư trú.
    const [occupiedApts] = await queryInterface.sequelize.query(`
      SELECT id, owner_id 
      FROM apartments 
      WHERE status = 1 
      AND owner_id IS NOT NULL 
      ORDER BY id ASC
    `)

    const links = []
    const start = new Date()
    for (const apt of occupiedApts) {
      links.push({
        resident_id: apt.owner_id, // chủ nhà cư trú
        apartment_id: apt.id,
        relationship: 'Chủ hộ',
        start_date: start.toISOString().split('T')[0],
        end_date: null
      })
    }

    if (links.length) {
      await queryInterface.bulkInsert('resident_apartment', links)
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('resident_apartment', null, {})
  }
}
