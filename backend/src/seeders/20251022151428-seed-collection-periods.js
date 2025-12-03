'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Determine a valid `created_by` user id to satisfy FK constraint.
    // Prefer an existing admin/manager/accountant if available, else use the first user.
    let createdBy = null
    try {
      const users = await queryInterface.sequelize.query(
        `SELECT id FROM users ORDER BY id LIMIT 1;`
      )
      if (users && users[0] && users[0].length > 0) {
        createdBy = users[0][0].id
      }
    } catch (err) {
      // if query fails (table doesn't exist yet), fallback to null
      createdBy = null
    }

    await queryInterface.bulkInsert('collection_periods', [
      {
        name: 'Hóa đơn hàng tháng tháng 10-2025',
        type: 1,
        start_date: '2025-10-01',
        end_date: '2025-10-31',
        description: 'Kỳ thu phí tháng 10 năm 2025',
        created_at: '2025-10-30 10:00:00',
        created_by: createdBy,
        status: 1
      },
      {
        name: 'Hóa đơn hàng tháng tháng 9-2025',
        type: 1,
        start_date: '2025-9-01',
        end_date: '2025-9-31',
        description: 'Kỳ thu phí tháng 9 năm 2025',
        created_at: '2025-09-30 10:00:00',
        created_by: createdBy,
        status: 1
      },
      {
        name: 'Hóa đơn hàng tháng tháng 8-2025',
        type: 1,
        start_date: '2025-8-01',
        end_date: '2025-8-31',
        description: 'Kỳ thu phí tháng 8 năm 2025',
        created_at: '2025-08-30 10:00:00',
        created_by: createdBy,
        status: 1
      },
      {
        name: 'Hóa đơn hàng tháng tháng 11-2025',
        type: 1,
        start_date: '2025-11-01',
        end_date: '2025-11-31',
        description: 'Kỳ thu phí tháng 11 năm 2025',
        created_at: '2025-11-30 10:00:00',
        created_by: createdBy,
        status: 1
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('collection_periods', null, {})
  }
}
