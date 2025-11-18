import {
  handleGetResidentSchedule,
  handleGetScheduleDetail,
} from "../../services/user/maintenance.sche.service";

const getResidentSchedules = async (req, res) => {
  try {
    const { residentId } = req.params;
    const schedules = await handleGetResidentSchedule(residentId);

    return res.json({ schedules });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getMaintenanceScheduleDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const schedule = await handleGetScheduleDetail(id);

    if (!schedule)
      return res.status(404).json({ error: "Không tìm thấy lịch bảo trì" });

    return res.json({ schedule });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export { getResidentSchedules, getMaintenanceScheduleDetail };
