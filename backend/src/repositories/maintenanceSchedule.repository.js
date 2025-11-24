import { MaintenanceSchedule, Staff } from "../models/index.js";

async function findByResident(residentId) {
  return MaintenanceSchedule.findAll({
    where: { resident_id: residentId, status: 1 },
    include: [
      {
        model: Staff,
        as: "assignee",
        attributes: ["full_name"],
      },
    ],
    order: [["end_at", "DESC"]],
  });
}

async function findScheduleById(id) {
  return MaintenanceSchedule.findByPk(id);
}

export { findByResident, findScheduleById };
