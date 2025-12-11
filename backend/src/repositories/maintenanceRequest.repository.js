import { MaintenanceRequest, WorkType, Resident } from '../models/index.js'
import { Op } from 'sequelize'

async function createMaintenanceRequest(data, option = {}) {
  return MaintenanceRequest.create(data, option)
}

async function findPendingByResidentId(residentId) {
  return MaintenanceRequest.findAll({
    where: { resident_id: residentId },
    order: [['created_at', 'DESC']],
    include: ['work_type']
  })
}

async function findById(id) {
  return MaintenanceRequest.findByPk(id)
}

async function updateRequest(id, data) {
  return MaintenanceRequest.update(data, { where: { id } })
}

async function deleteRequest(id) {
  return MaintenanceRequest.destroy({ where: { id } })
}

async function findAllPending(user) {
  const whereClause = {
    status: {
      [Op.in]: [0, 3] // 0: Pending, 3: In Progress
    }
  }

  // Nếu là Technician (role_id = 5), chỉ lấy:
  // 1. Request chưa ai nhận (status = 0)
  // 2. Request đã nhận bởi chính mình (status = 3 AND assigned_to = user.id)
  if (user && user.role_id === 5) {
    whereClause[Op.or] = [
      { status: 0 },
      {
        status: 3,
        assigned_to: user.id
      }
    ]
    delete whereClause.status // Xóa điều kiện status IN [0, 3] chung chung
  }

  return MaintenanceRequest.findAll({
    where: whereClause,
    order: [['created_at', 'DESC']],
    include: [
      {
        model: WorkType,
        as: 'work_type',
        attributes: ['id', 'name']
      },
      {
        model: Resident,
        as: 'resident',
        attributes: ['id', 'full_name']
      }
    ]
  })
}

export {
  createMaintenanceRequest,
  findPendingByResidentId,
  findById,
  updateRequest,
  deleteRequest,
  findAllPending
}
