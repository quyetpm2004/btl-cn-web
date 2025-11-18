import {
  findByResident,
  findScheduleById,
} from "../../repositories/maintenanceSchedule.repository";

const handleGetResidentSchedule = async (residentId) => {
  return await findByResident(residentId);
};

const handleGetScheduleDetail = async (id) => {
  return await findScheduleById(id);
};

export { handleGetResidentSchedule, handleGetScheduleDetail };
