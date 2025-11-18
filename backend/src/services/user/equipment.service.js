import {
  getAllEquipments,
  getEquipmentById,
} from "../../repositories/equipment.repository";

const handleGetAllEquipment = async () => {
  return await getAllEquipments();
};

const handleGetEquipmentById = async (equipmentId) => {
  return await getEquipmentById(equipmentId);
};

export { handleGetAllEquipment, handleGetEquipmentById };
