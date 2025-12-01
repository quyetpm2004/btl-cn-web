'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // Lệnh UP: Tạo bảng
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('invoice_items', {
      // 1. id INT [pk, increment]
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      
      // 2. invoice_id INT [ref: > invoices.id]
      invoice_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'invoices', // Tên bảng (table name)
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE' // Tùy chọn: Xóa item khi hóa đơn bị xóa
      },
      
      // 3. service_id INT [ref: > services.id]
      service_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'services', // Tên bảng (table name)
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT' // Tùy chọn: Không cho xóa service nếu có item
      },
      
      // 4. quantity INT
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      
      // 5. unit_price INT
      unit_price: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      
      // 6. amount INT (quantity * unit_price)
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      
      // 7. note TEXT
      note: {
        type: Sequelize.TEXT,
        allowNull: true // Cho phép NULL
      },
      
      // 8. created_at TIMESTAMP
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') // Đảm bảo tự động điền giá trị
      },
      
      // Thêm updated_at theo chuẩn Sequelize (dù không được yêu cầu cụ thể, 
      // nó thường được tạo ra nếu `timestamps: true` trong model)
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  // Lệnh DOWN: Hoàn tác (Xóa bảng)
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('invoice_items');
  }
};