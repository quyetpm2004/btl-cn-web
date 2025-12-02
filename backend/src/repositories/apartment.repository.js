import { Apartment, Resident, User, ApartmentType, ResidentApartment } from '../models/index.js'
import { Op } from 'sequelize'

async function createApartment(data, options = {}) {
  return Apartment.create(data, options)
}

async function getAllApartments() {
  return Apartment.findAll({
    include: [
      {
        model: ApartmentType,
        as: 'type',
        attributes: ['id', 'name', 'description']
      },
      {
        model: Resident,
        as: 'residents',
        attributes: ['id', 'full_name'],
        through: {
          attributes: ['end_date'],
          where: { end_date: null }
        }
      }
    ]
  })
}

async function getApartmentById(id) {
  return Apartment.findByPk(id)
}

async function getApartmentByCode(apartment_code) {
  return Apartment.findOne({ where: { apartment_code } })
}

async function updateApartment(id, data, options = {}) {
  return Apartment.update(data, { where: { id }, ...options })
}

async function deleteApartment(id) {
  return Apartment.destroy({ where: { id } })
}

async function getApartmentCount() {
  return Apartment.count()
}

async function filterApartments(filters) {
  // Extract pagination from filters (req.query are strings)
  const page = Number(filters.page) > 0 ? Number(filters.page) : 1
  const limit = Number(filters.limit) > 0 ? Number(filters.limit) : 9
  const offset = (page - 1) * limit

  // Build safe where object: exclude pagination-related keys and empty values
  const { page: _p, limit: _l, offset: _o, query, ...rest } = filters || {}
  const where = Object.fromEntries(
    Object.entries(rest).filter(
      ([, v]) => v !== undefined && v !== null && v !== ''
    )
  )

  // Add OR condition for query search (apartment_code)
  const whereClause = query
    ? {
        [Op.and]: [
          where,
          {
            apartment_code: {
              [Op.like]: `%${query}%`
            }
          }
        ]
      }
    : where

  const total = await Apartment.count({
    where: whereClause
  })

  const items = await Apartment.findAll({
    where: whereClause,
    include: [
      {
        model: ApartmentType,
        as: 'type',
        attributes: ['id', 'name', 'description']
      },
      {
        model: Resident,
        as: 'residents',
        attributes: ['id', 'full_name', 'registered_at'],
        through: {
          attributes: ['relationship'],
          where: { end_date: null, relationship: 'owner' }
        }
      }
    ],
    limit,
    offset
  })

  return { items, total, page, limit }
}

async function getApartmentByUserId(userId) {
  const resident = await Resident.findOne({
    where: { user_id: userId },
    include: [
      {
        model: ResidentApartment,
        as: 'residentApartment',
        include: [{ model: Apartment, as: 'apartment' }]
      }
    ]
  });


  const apartment = resident.residentApartment[0].apartment;
  return apartment;
}

async function getBuildingsApartment() {
  return Apartment.findAll({
    attributes: ['building'],
    group: ['building'],
    raw: true
  })
}

async function getTypesApartment() {
  return ApartmentType.findAll({
    attributes: ['name'],
    group: ['id'],
    raw: true
  })
}

export {
  createApartment,
  getAllApartments,
  getApartmentById,
  getApartmentByCode,
  updateApartment,
  deleteApartment,
  getApartmentCount,
  filterApartments,
  getApartmentByUserId,
  getBuildingsApartment,
  getTypesApartment
}
