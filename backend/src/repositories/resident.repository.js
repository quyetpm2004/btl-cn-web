import { Resident } from '../models/index.js'

async function createResident(residentData, options = {}) {
  return Resident.create(residentData, options)
}

async function getResidentById(residentId) {
  return Resident.findByPk(residentId)
}

async function getAllResidents() {
  return Resident.findAll()
}

async function updateResident(residentId, updateData) {
  return Resident.update(updateData, { where: { id: residentId } })
}

async function deleteResident(residentId) {
  return Resident.destroy({ where: { id: residentId } })
}

export {
  createResident,
  getResidentById,
  getAllResidents,
  updateResident,
  deleteResident
}
