'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const [apartmentRows] = await queryInterface.sequelize.query(
      `SELECT id FROM apartments WHERE status = 1 ORDER BY id ASC LIMIT 100`
    )
    const count = Math.min(10, apartmentRows.length)
    const brands = ['Toyota', 'Honda', 'Yamaha', 'VinFast', 'Mazda', 'Ford']
    const colors = ['Red', 'Blue', 'Black', 'White', 'Silver', 'Gray']
    const vehicles = []

    for (let i = 0; i < count; i++) {
      const aptId = apartmentRows[i].id
      const type = 1 + (i % 3) // 1: car, 2: motorbike, 3: bicycle
      const brand = brands[i % brands.length]
      const color = colors[i % colors.length]
      const license_plate = `30${String.fromCharCode(65 + (i % 26))}-${
        10000 + i
      }`

      vehicles.push({
        apartment_id: aptId,
        type,
        brand,
        license_plate,
        color,
        status: 1
      })
    }

    if (vehicles.length) {
      await queryInterface.bulkInsert('vehicles', vehicles)
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('vehicles', null, {})
  }
}
