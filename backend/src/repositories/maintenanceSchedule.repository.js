import { MaintenanceSchedule } from "../models/index.js";

async function findByResident(residentId) {
  return MaintenanceSchedule.findAll({
    where: { resident_id: residentId, status: 1 },
    order: [["end_at", "DESC"]],
  });
}

async function findScheduleById(id) {
  return MaintenanceSchedule.findByPk(id);
}

export { findByResident, findScheduleById };
