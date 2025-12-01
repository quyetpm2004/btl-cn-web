import { handleGetAllWorkType } from "../../services/user/worktype.service";

const getAllWorkType = async (req, res) => {
  try {
    const workType = await handleGetAllWorkType();
    return res.json({ workType });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};


export { getAllWorkType };
