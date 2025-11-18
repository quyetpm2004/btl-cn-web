import {
  findById,
  findPending,
  createMaintenanceRequest,
  updateRequest,
  deleteRequest,
} from "../../repositories/maintenanceRequest.repository";

const handleCreateMaintenanceRequest = async (
  equipment_id,
  resident_id,
  description,
  priority,
  images
) => {
  const request = await createMaintenanceRequest({
    equipment_id,
    resident_id,
    description,
    priority,
    images,
  });

  return request;
};

const handleGetPendingRequest = async (residentId) => {
  return await findPending(residentId);
};

const handleGetRequestDetail = async (id) => {
  return await findById(id);
};

const handleUpdateRequest = async (id, data) => {
  const request = await findById(id);
  if (!request) return null;

  await updateRequest(id, data);
  return await findById(id);
};

const handleDeleteRequest = async (id) => {
  const request = await findById(id);
  if (!request) return null;

  await deleteRequest(id);
  return true;
};

export {
  handleCreateMaintenanceRequest,
  handleGetPendingRequest,
  handleGetRequestDetail,
  handleUpdateRequest,
  handleDeleteRequest,
};
