import { Service } from '../models/index.js'

async function createService(data, options = {}) {
  return Service.create(data, options)
}

async function getAllServices() {
  return Service.findAll()
}

async function getServiceById(id) {
  return Service.findByPk(id)
}

async function updateService(id, data) {
  return Service.update(data, { where: { id } })
}

async function deleteService(id) {
  return Service.destroy({ where: { id } })
}

async function filterServices(filters) {
  return Service.findAll({ where: filters })
}

export {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
  filterServices
}
