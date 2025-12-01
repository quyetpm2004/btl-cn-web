import { MaintenanceRequest } from "../models/index.js";

async function createMaintenanceRequest(data, option = {}) {
  return MaintenanceRequest.create(data, option);
}

async function findPending(residentId) {
  return MaintenanceRequest.findAll({
    where: { resident_id: residentId },
    order: [["created_at", "DESC"]],
    include: ["work_type"]
  });
}

async function findById(id) {
  return MaintenanceRequest.findByPk(id);
}

async function updateRequest(id, data) {
  return MaintenanceRequest.update(data, { where: { id } });
}

async function deleteRequest(id) {
  return MaintenanceRequest.destroy({ where: { id } });
}

export {
  createMaintenanceRequest,
  findPending,
  findById,
  updateRequest,
  deleteRequest,
};
