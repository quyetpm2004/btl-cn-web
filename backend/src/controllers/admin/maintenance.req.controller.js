import * as MaintenanceRequestService from '@/services/admin/maintenance.req.service'
import { toHttpError } from '@/utils/errors.js'
import { StatusCodes } from 'http-status-codes'

async function getMaintenanceRequestDetail(req, res) {
  try {
    const { id } = req.params
    const request = await MaintenanceRequestService.getDetail(id)

    return res.status(StatusCodes.OK).json({ request })
  } catch (err) {
    const http = toHttpError(err)
    return res.status(http.status).json(http.body)
  }
}

async function getAllPendingMaintenanceRequests(req, res) {
  try {
    const requests = await MaintenanceRequestService.getAllPending(req.user)
    return res.status(StatusCodes.OK).json({ requests })
  } catch (err) {
    const http = toHttpError(err)
    return res.status(http.status).json(http.body)
  }
}

async function assignRequest(req, res) {
  try {
    const { id } = req.params
    const { technician_id } = req.body
    const request = await MaintenanceRequestService.assign(id, technician_id)

    // Emit socket event
    req.io.emit('maintenance_request_updated', {
      action: 'assign',
      requestId: id,
      technicianId: technician_id
    })

    return res.status(StatusCodes.OK).json({ request })
  } catch (err) {
    const http = toHttpError(err)
    return res.status(http.status).json(http.body)
  }
}

async function updateStatus(req, res) {
  try {
    const { id } = req.params
    const { status } = req.body
    // Truyền thêm req.user.id để biết ai đang thao tác (dùng khi Technician tự nhận việc)
    const request = await MaintenanceRequestService.updateStatus(
      id,
      status,
      req.user?.id
    )

    // Emit socket event
    req.io.emit('maintenance_request_updated', {
      action: 'update_status',
      requestId: id,
      status: status,
      userId: req.user?.id
    })

    return res.status(StatusCodes.OK).json({ request })
  } catch (err) {
    const http = toHttpError(err)
    return res.status(http.status).json(http.body)
  }
}

async function completeRequest(req, res) {
  try {
    const { id } = req.params
    const { result } = req.body
    const request = await MaintenanceRequestService.complete(id, result)

    // Emit socket event
    req.io.emit('maintenance_request_updated', {
      action: 'complete',
      requestId: id
    })

    return res.status(StatusCodes.OK).json({ request })
  } catch (err) {
    const http = toHttpError(err)
    return res.status(http.status).json(http.body)
  }
}

async function getAllMaintenanceRequests(req, res) {
  try {
    const filters = req.query
    const requests = await MaintenanceRequestService.getAll(filters)
    return res.status(StatusCodes.OK).json(requests)
  } catch (err) {
    const http = toHttpError(err)
    return res.status(http.status).json(http.body)
  }
}

export {
  getMaintenanceRequestDetail,
  getAllPendingMaintenanceRequests,
  assignRequest,
  updateStatus,
  completeRequest,
  getAllMaintenanceRequests
}
