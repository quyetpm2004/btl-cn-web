import { ServiceRegistration } from '../models/index.js'

async function create(data, options = {}) {
  return ServiceRegistration.create(data, options)
}

async function getAllActive() {
  return ServiceRegistration.findAll({
    where: { status: 1, end_date: null }
  })
}

async function getById(id) {
  return ServiceRegistration.findByPk(id)
}

async function getAllServicesApartment(apartment_id) {
  return ServiceRegistration.findAll({
    where: { apartment_id, status: 1, end_date: null }
  })
}

async function update(id, data, options = {}) {
  return ServiceRegistration.update(data, { where: { id }, ...options })
}

async function deleteServiceRegistration(apartment_id, service_id) {
  return ServiceRegistration.update(
    { status: 0 },
    { where: { apartment_id, service_id, end_date: null } }
  )
}

export {
  create,
  getAllActive,
  getById,
  update,
  deleteServiceRegistration,
  getAllServicesApartment
}
