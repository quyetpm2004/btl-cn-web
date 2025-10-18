import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class residents extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    full_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    date_of_birth: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    place_of_birth: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    ethnicity: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    occupation: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    hometown: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    id_card_number: {
      type: DataTypes.STRING(20),
      allowNull: true,
      unique: "unique_id_card_number"
    },
    residence_status: {
      type: DataTypes.ENUM('permanent','temporary'),
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    gender: {
      type: DataTypes.ENUM('male','female','other'),
      allowNull: false
    },
    relationship_to_owner: {
      type: DataTypes.ENUM('owner','spouse','parent','child','other'),
      allowNull: false
    },
    room_number: {
      type: DataTypes.STRING(20),
      allowNull: false,
      references: {
        model: 'rooms',
        key: 'room_number'
      }
    },
    status: {
      type: DataTypes.ENUM('living','moved_out'),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'residents',
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
        name: "unique_id_card_number",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_card_number" },
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
