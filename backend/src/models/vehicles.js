import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class vehicles extends Model {
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
    plate_number: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: "unique_plate_number"
    },
    type: {
      type: DataTypes.ENUM('motorbike','car'),
      allowNull: false
    },
    brand: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    color: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    registration_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    note: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'vehicles',
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
        name: "unique_plate_number",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "plate_number" },
        ]
      },
      {
        name: "fk_room_number",
        using: "BTREE",
        fields: [
          { name: "room_number" },
        ]
      },
    ]
  });
  }
}
