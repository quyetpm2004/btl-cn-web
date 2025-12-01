'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Chỉ liên kết cư dân với những căn hộ đang ở (status = 1).
    // Với căn hộ trống (status = 0) thì không tạo liên kết cư trú.
    const [occupiedApts] = await queryInterface.sequelize.query(`
      SELECT id
      FROM apartments 
      WHERE status = 1 
      ORDER BY id ASC
    `)

    // Lấy tất cả cư dân
    const [allResidents] = await queryInterface.sequelize.query(`
      SELECT id FROM residents
    `)

    const links = []
    const start = new Date()

    // Clone array to manage used residents
    const residents = [...allResidents]

    // Thêm chủ hộ
    for (const apt of occupiedApts) {
      if (residents.length === 0) break

      const owner = residents.shift()
      links.push({
        resident_id: owner.id,
        apartment_id: apt.id,
        relationship: 'owner',
        start_date: start.toISOString().split('T')[0],
        end_date: null
      })
    }

    // Phân bổ người thân vào các căn hộ (round-robin)
    if (occupiedApts.length > 0 && residents.length > 0) {
      residents.forEach((resident, index) => {
        const apt = occupiedApts[index % occupiedApts.length]
        links.push({
          resident_id: resident.id,
          apartment_id: apt.id,
          relationship: 'relative',
          start_date: start.toISOString().split('T')[0],
          end_date: null
        })
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
