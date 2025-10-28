import { Apartment } from '../models/index.js'

async function createApartment(data) {
  return Apartment.create(data)
}

async function getAllApartments() {
  return Apartment.findAll()
}

async function getApartmentById(id) {
  return Apartment.findByPk(id)
}

async function getApartmentByCode(apartment_code) {
  return Apartment.findOne({ where: { apartment_code } })
}

async function updateApartment(id, data) {
  return Apartment.update(data, { where: { id } })
}

async function deleteApartment(id) {
  return Apartment.destroy({ where: { id } })
}

async function getApartmentCount() {
  return Apartment.count()
}

async function filterApartments(filters) {
  return Apartment.findAll({ where: filters })
}

export {
  createApartment,
  getAllApartments,
  getApartmentById,
  getApartmentByCode,
  updateApartment,
  deleteApartment,
  getApartmentCount,
  filterApartments
}
