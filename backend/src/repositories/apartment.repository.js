import { Apartment } from '../models/index.js'

async function getApartmentByCode(apartment_code) {
  return Apartment.findOne({ where: { apartment_code } })
}

export { getApartmentByCode }
