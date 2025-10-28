import { Resident } from '../models/index.js'

async function createResident(data, options = {}) {
  return Resident.create(data, options)
}

async function getResidentById(id) {
  return Resident.findByPk(id)
}

async function getAllResidents() {
  return Resident.findAll()
}

async function updateResident(id, data) {
  return Resident.update(data, { where: { id } })
}

async function deleteResident(id) {
  return Resident.destroy({ where: { id } })
}

async function getResidentCount() {
  return Resident.count()
}

export {
  createResident,
  getResidentById,
  getAllResidents,
  updateResident,
  deleteResident,
  getResidentCount
}
