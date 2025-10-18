import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _collection_items from  "./collection_items.js";
import _collection_periods from  "./collection_periods.js";
import _payments from  "./payments.js";
import _residents from  "./residents.js";
import _revenue_items from  "./revenue_items.js";
import _rooms from  "./rooms.js";
import _users from  "./users.js";
import _vehicles from  "./vehicles.js";

export default function initModels(sequelize) {
  const collection_items = _collection_items.init(sequelize, DataTypes);
  const collection_periods = _collection_periods.init(sequelize, DataTypes);
  const payments = _payments.init(sequelize, DataTypes);
  const residents = _residents.init(sequelize, DataTypes);
  const revenue_items = _revenue_items.init(sequelize, DataTypes);
  const rooms = _rooms.init(sequelize, DataTypes);
  const users = _users.init(sequelize, DataTypes);
  const vehicles = _vehicles.init(sequelize, DataTypes);

  collection_items.belongsTo(collection_periods, { as: "collection_period", foreignKey: "collection_period_id"});
  collection_periods.hasMany(collection_items, { as: "collection_items", foreignKey: "collection_period_id"});
  payments.belongsTo(collection_periods, { as: "collection_period", foreignKey: "collection_period_id"});
  collection_periods.hasMany(payments, { as: "payments", foreignKey: "collection_period_id"});
  collection_items.belongsTo(revenue_items, { as: "revenue_item", foreignKey: "revenue_item_id"});
  revenue_items.hasMany(collection_items, { as: "collection_items", foreignKey: "revenue_item_id"});
  collection_items.belongsTo(rooms, { as: "room_number_room", foreignKey: "room_number"});
  rooms.hasMany(collection_items, { as: "collection_items", foreignKey: "room_number"});
  payments.belongsTo(rooms, { as: "room_number_room", foreignKey: "room_number"});
  rooms.hasMany(payments, { as: "payments", foreignKey: "room_number"});
  residents.belongsTo(rooms, { as: "room_number_room", foreignKey: "room_number"});
  rooms.hasMany(residents, { as: "residents", foreignKey: "room_number"});
  vehicles.belongsTo(rooms, { as: "room_number_room", foreignKey: "room_number"});
  rooms.hasMany(vehicles, { as: "vehicles", foreignKey: "room_number"});

  return {
    collection_items,
    collection_periods,
    payments,
    residents,
    revenue_items,
    rooms,
    users,
    vehicles,
  };
}
