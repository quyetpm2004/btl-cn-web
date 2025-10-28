import { ResidentApartment } from '../models/index.js'

async function createResidentApartment(data, options = {}) {
  return ResidentApartment.create(data, options)
}

export { createResidentApartment }
