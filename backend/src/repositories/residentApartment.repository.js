import { ResidentApartment } from '../models/index.js'

async function createResidentApartment(data, options = {}) {
  return ResidentApartment.create(data, options)
}

async function getResidentApartmentByResidentId(resident_id) {
  return ResidentApartment.findOne({ where: { resident_id } })
}

export { createResidentApartment, getResidentApartmentByResidentId }
