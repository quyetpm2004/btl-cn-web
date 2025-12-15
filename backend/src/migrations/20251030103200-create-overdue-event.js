'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // await queryInterface.sequelize.query(
    //   'DROP EVENT IF EXISTS mark_overdue_invoices_daily;'
    // )
    // await queryInterface.sequelize.query(
    //   'DROP PROCEDURE IF EXISTS mark_overdue_invoices;'
    // )
    // // Update status of overdue invoices to 'overdue' (2)
    // await queryInterface.sequelize.query(
    //   `CREATE PROCEDURE mark_overdue_invoices()
    //   UPDATE invoices i
    //   JOIN collection_periods cp ON i.period_id = cp.id
    //   SET i.status = 2
    //   WHERE i.status = 0
    //     AND cp.end_date < CURDATE()
    //     AND cp.status = 1;`
    // )
    // await queryInterface.sequelize.query(`
    //   CREATE EVENT mark_overdue_invoices_daily
    //   ON SCHEDULE EVERY 1 DAY
    //   STARTS TIMESTAMP(CURDATE(), '00:00:00')
    //   DO CALL mark_overdue_invoices();
    // `)
  },

  async down(queryInterface, Sequelize) {
    // await queryInterface.sequelize.query(
    //   'DROP EVENT IF EXISTS mark_overdue_invoices_daily;'
    // )
    // await queryInterface.sequelize.query(
    //   'DROP PROCEDURE IF EXISTS mark_overdue_invoices;'
    // )
  }
}
