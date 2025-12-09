import { Resident, Apartment, User } from '../models/index.js'
import { Op } from 'sequelize'

async function createResident(data, options = {}) {
  return Resident.create(data, options)
}

async function getAllResidents() {
  return Resident.findAll({
    include: [
      {
        model: Apartment,
        as: 'apartments',
        attributes: ['id', 'apartment_code'],
        through: { attributes: [] }
      }
    ]
  })
}

async function getResidentById(id) {
  return Resident.findByPk(id)
}

async function updateResident(id, data, options = {}) {
  return Resident.update(data, { where: { id }, ...options })
}

async function deleteResident(id) {
  return Resident.destroy({ where: { id } })
}

async function getResidentCount() {
  return Resident.count()
}

async function filterResidents(filters) {
  // Extract pagination from filters (req.query are strings)
  const page = Number(filters.page) > 0 ? Number(filters.page) : 1
  const limit = Number(filters.limit) > 0 ? Number(filters.limit) : 10
  const offset = (page - 1) * limit

  // Build safe where object: exclude pagination-related keys and empty values
  const { page: _p, limit: _l, offset: _o, full_name, user_id, ...rest } = filters || {}
  const where = Object.fromEntries(
    Object.entries(rest).filter(
      ([, v]) => v !== undefined && v !== null && v !== ''
    )
  )

  // Add full_name search with LIKE if provided
  if (full_name && full_name.trim()) {
    where.full_name = {
      [Op.like]: `%${full_name.trim()}%`
    }
  }

  // Handle user_id filter
  if (user_id !== undefined) {
    if (user_id === 'null' || user_id === null) {
      where.user_id = null
    } else {
      where.user_id = user_id
    }
  }

  const total = await Resident.count({
    where
  })

  const items = await Resident.findAll({
    where,
    include: [
      {
        model: Apartment,
        as: 'apartments',
        attributes: ['id', 'apartment_code'],
        through: {
          attributes: ['end_date', 'is_living'],
          where: { end_date: null, is_living: true }
        }
      }
    ],
    limit,
    offset
  })

  return { items, total, page, limit }
}

async function getResidentsWithoutAccount() {
  return Resident.findAll({
    where: { user_id: null }
  })
}

export {
  createResident,
  getAllResidents,
  getResidentById,
  updateResident,
  deleteResident,
  getResidentCount,
  filterResidents,
  getResidentsWithoutAccount
}
