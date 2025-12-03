'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('maintenance_requests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      resident_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'residents',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      apartment_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'apartments',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      location: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      images: {
        type: Sequelize.JSON,
        allowNull: true,
        comment: 'Array of image URLs or paths'
      },
      status: {
        type: Sequelize.TINYINT,
        defaultValue: 0,
        comment: '0:pending | 1:done | 2:cancelled'
      },
      result: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      work_type_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'work_types',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      assigned_to: {
        type: Sequelize.INTEGER,
        references: {
          model: 'staffs',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      resolved_at: {
        type: Sequelize.DATE
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('maintenance_requests')
  }
}
