import { ResidentApartment } from '../models/index.js'

async function createResidentApartment(data, options = {}) {
  return ResidentApartment.create(data, options)
}

async function getResidentApartmentByResidentId(resident_id, options = {}) {
  const where = { resident_id, end_date: null, ...(options.where || {}) }
  return ResidentApartment.findOne({ ...options, where })
}

async function updateResidentApartmentByResidentId(
  resident_id,
  data,
  options = {}
) {
  const where = { resident_id, end_date: null, ...(options.where || {}) }
  return ResidentApartment.update(data, {
    ...options,
    where
  })
}

async function updateResidentApartmentByApartmentId(
  apartment_id,
  data,
  options = {}
) {
  const where = { apartment_id, end_date: null, ...(options.where || {}) }
  return ResidentApartment.update(data, {
    ...options,
    where
  })
}

async function getCurrentOwnerByApartmentId(apartment_id) {
  return ResidentApartment.findOne({
    where: {
      apartment_id,
      relationship: 'owner',
      end_date: null
    }
  })
}

async function deleteResidentApartment(resident_id) {
  return ResidentApartment.destroy({ where: { resident_id } })
}

export {
  createResidentApartment,
  getResidentApartmentByResidentId,
  updateResidentApartmentByResidentId,
  updateResidentApartmentByApartmentId,
  getCurrentOwnerByApartmentId,
  deleteResidentApartment
}
