'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const [typeRows] = await queryInterface.sequelize.query(
      `SELECT id, name FROM apartment_types ORDER BY id ASC`
    )
    const typeIds = typeRows.map((t) => t.id)

    const typeAreaRangeById = {}
    for (const t of typeRows) {
      const name = (t.name || '').toLowerCase()
      let range = [50, 120] // mặc định
      if (name.includes('studio')) range = [25, 40]
      else if (name.includes('1 phòng ngủ')) range = [40, 60]
      else if (name.includes('2 phòng ngủ')) range = [60, 85]
      else if (name.includes('3 phòng ngủ')) range = [85, 120]
      else if (name.includes('penthouse')) range = [120, 200]
      typeAreaRangeById[t.id] = range
    }

    const [residentRows] = await queryInterface.sequelize.query(
      `SELECT id FROM residents ORDER BY id ASC LIMIT 100`
    )
    const ownerIds = residentRows.map((r) => r.id)

    const apartments = []

    // Tạo lần lượt theo tòa A -> B -> C -> D, mỗi tòa 25 căn
    // 70 căn đang ở, 30 căn trống
    const occupiedCount = 70
    let created = 0

    const buildingsOrder = ['A', 'B', 'C', 'D']
    const perBuildingTarget = 25

    for (const building of buildingsOrder) {
      let perBuildingCreated = 0
      for (
        let floor = 1;
        floor <= 10 && created < 100 && perBuildingCreated < perBuildingTarget;
        floor++
      ) {
        for (
          let unit = 1;
          unit <= 5 && created < 100 && perBuildingCreated < perBuildingTarget;
          unit++
        ) {
          const apartment_code = `${building}${floor}${String(unit).padStart(
            2,
            '0'
          )}`
          const type_id = typeIds.length
            ? typeIds[created % typeIds.length]
            : null
          const [minA, maxA] = type_id ? typeAreaRangeById[type_id] : [50, 120]
          const area = minA + Math.floor(Math.random() * (maxA - minA + 1))

          const status = created < occupiedCount ? 1 : 0
          const owner_id =
            status === 1 && ownerIds.length
              ? ownerIds[created % ownerIds.length]
              : null

          apartments.push({
            apartment_code,
            building,
            type_id,
            area,
            status,
            floor,
            owner_id
          })

          created++
          perBuildingCreated++
        }
      }
      if (created >= 100) break
    }

    await queryInterface.bulkInsert('apartments', apartments)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('apartments', null, {})
  }
}
