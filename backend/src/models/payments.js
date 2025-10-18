import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class payments extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    room_number: {
      type: DataTypes.STRING(20),
      allowNull: false,
      references: {
        model: 'rooms',
        key: 'room_number'
      }
    },
    collection_period_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'collection_periods',
        key: 'id'
      }
    },
    paid_amount: {
      type: DataTypes.DECIMAL(12,2),
      allowNull: false
    },
    payment_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    note: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    debt_amount: {
      type: DataTypes.DECIMAL(12,2),
      allowNull: true,
      defaultValue: 0.00
    },
    excess_amount: {
      type: DataTypes.DECIMAL(12,2),
      allowNull: true,
      defaultValue: 0.00
    }
  }, {
    sequelize,
    tableName: 'payments',
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
        name: "fk_room_number",
        using: "BTREE",
        fields: [
          { name: "room_number" },
        ]
      },
      {
        name: "fk_collection_period_id",
        using: "BTREE",
        fields: [
          { name: "collection_period_id" },
        ]
      },
    ]
  });
  }
}
