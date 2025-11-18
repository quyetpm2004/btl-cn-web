import { Equipment } from "../models/index.js";

async function getEquipmentById(equipmentId) {
  return Equipment.findByPk(equipmentId);
}

async function getAllEquipments() {
  return Equipment.findAll();
}

export { getEquipmentById, getAllEquipments };
