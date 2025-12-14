import {
  handleCreateMaintenanceRequest,
  handleDeleteRequest,
  handleGetPendingRequest,
  handleGetRequestDetail,
  handleUpdateRequest
} from '../../services/user/maintenance.req.service'

const createMaintenanceRequest = async (req, res) => {
  try {
    const { work_type_id, resident_id, description, title } = req.body

    const images = req.files?.map((file) => file.filename) || []

    const request = await handleCreateMaintenanceRequest(
      work_type_id,
      resident_id,
      description,
      title,
      images
    )

    // Emit thông báo realtime cho tất cả client
    req.io.emit('maintenance_request_updated', {
      action: 'create',
      requestId: request.id
    })

    return res.status(201).json({
      message: 'Tạo yêu cầu bảo trì thành công',
      request
    })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}

const getPendingRequests = async (req, res) => {
  try {
    const { residentId } = req.params
    const requests = await handleGetPendingRequest(residentId)
    return res.json({ requests })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}

const getMaintenanceRequestDetail = async (req, res) => {
  try {
    const { id } = req.params
    const request = await handleGetRequestDetail(id)

    if (!request)
      return res.status(404).json({ error: 'Không tìm thấy yêu cầu' })

    return res.json({ request })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}

const updateMaintenanceRequest = async (req, res) => {
  try {
    console.log('Updating maintenance request...', req.body, req.files)
    const { id } = req.params
    const updated = await handleUpdateRequest(id, req.body, req.files)

    if (!updated) {
      return res
        .status(404)
        .json({ error: 'Không tìm thấy yêu cầu để cập nhật' })
    }

    return res.json({
      message: 'Cập nhật yêu cầu bảo trì thành công',
      request: updated
    })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}

const deleteMaintenanceRequest = async (req, res) => {
  try {
    const { id } = req.params
    const deleted = await handleDeleteRequest(id)

    if (!deleted) {
      return res.status(404).json({ error: 'Không tìm thấy yêu cầu để xóa' })
    }

    // Emit thông báo realtime cho tất cả client
    req.io.emit('maintenance_request_updated', {
      action: 'delete',
      requestId: id
    })

    return res.json({ message: 'Xóa yêu cầu bảo trì thành công' })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}
export {
  createMaintenanceRequest,
  getPendingRequests,
  getMaintenanceRequestDetail,
  updateMaintenanceRequest,
  deleteMaintenanceRequest
}
