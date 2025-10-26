import { ResidentApartment } from '../models/index.js'

async function createResidentApartment(residentApartmentData, options = {}) {
  return ResidentApartment.create(residentApartmentData, options)
}

export { createResidentApartment }
