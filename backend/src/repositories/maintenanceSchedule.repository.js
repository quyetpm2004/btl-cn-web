import { MaintenanceSchedule, Staff, User } from '../models/index.js'

async function findByResident(residentId) {
  return MaintenanceSchedule.findAll({
    where: { resident_id: residentId, status: 1 },
    include: [
      {
        model: Staff,
        as: 'assignee',
        attributes: ['full_name']
      }
    ],
    order: [['end_at', 'DESC']]
  })
}

async function findScheduleById(id) {
  return MaintenanceSchedule.findByPk(id)
}

async function create(data, options = {}) {
  return MaintenanceSchedule.create(data, options)
}

async function update(id, data, options = {}) {
  return MaintenanceSchedule.update(data, {
    ...options,
    where: { id }
  })
}

async function getAll(filters) {
  const page = Number(filters.page) > 0 ? Number(filters.page) : 1
  const limit = Number(filters.limit) > 0 ? Number(filters.limit) : 10
  const offset = (page - 1) * limit

  const { page: _p, limit: _l, offset: _o } = filters || {}

  const total = await MaintenanceSchedule.count()

  const items = await MaintenanceSchedule.findAll({
    include: [
      {
        model: Staff,
        as: 'assignee',
        attributes: ['full_name']
      },
      {
        model: User,
        as: 'creator',
        attributes: ['username']
      }
    ],
    order: [
      ['status', 'ASC'],
      ['start_at', 'ASC']
    ],
    limit,
    offset
  })

  return { items, total, page, limit }
}

async function getAllPending() {
  return MaintenanceSchedule.findAll({
    where: { status: 0 },
    include: [
      {
        model: Staff,
        as: 'assignee',
        attributes: ['full_name']
      },
      {
        model: User,
        as: 'creator',
        attributes: ['username']
      }
    ],
    order: [['start_at', 'ASC']]
  })
}

async function deleteSchedule(id) {
  return MaintenanceSchedule.destroy({ where: { id } })
}

export {
  findByResident,
  findScheduleById,
  create,
  update,
  getAll,
  getAllPending,
  deleteSchedule
}
