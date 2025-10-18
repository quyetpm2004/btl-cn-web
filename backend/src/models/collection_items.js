import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class collection_items extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    collection_period_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'collection_periods',
        key: 'id'
      }
    },
    room_number: {
      type: DataTypes.STRING(20),
      allowNull: false,
      references: {
        model: 'rooms',
        key: 'room_number'
      }
    },
    revenue_item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'revenue_items',
        key: 'id'
      }
    },
    quantity: {
      type: DataTypes.DECIMAL(12,2),
      allowNull: false
    },
    quantity_unit: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    unit_price: {
      type: DataTypes.DECIMAL(12,2),
      allowNull: false
    },
    total_amount: {
      type: DataTypes.DECIMAL(12,2),
      allowNull: false
    },
    note: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'collection_items',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "fk_collection_period_id",
        using: "BTREE",
        fields: [
          { name: "collection_period_id" },
        ]
      },
      {
        name: "fk_room_number",
        using: "BTREE",
        fields: [
          { name: "room_number" },
        ]
      },
      {
        name: "fk_revenue_item_id",
        using: "BTREE",
        fields: [
          { name: "revenue_item_id" },
        ]
      },
    ]
  });
  }
}
