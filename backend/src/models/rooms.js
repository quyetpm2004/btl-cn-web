import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class rooms extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    room_number: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    floor: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    area: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('available','occupied'),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'rooms',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "room_number" },
        ]
      },
    ]
  });
  }
}
