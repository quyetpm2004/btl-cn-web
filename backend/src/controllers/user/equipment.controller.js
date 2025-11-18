import {
  handleGetAllEquipment,
  handleGetEquipmentById,
} from "../../services/user/equipment.service";

const getAllEquipments = async (req, res) => {
  try {
    const equipments = await handleGetAllEquipment();
    return res.json({ equipments });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getEquipmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const equipment = await handleGetEquipmentById(id);
    if (!equipment)
      return res.status(404).json({ error: "Không tìm thấy thiết bị" });
    return res.json({ equipment });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export { getAllEquipments, getEquipmentById };
