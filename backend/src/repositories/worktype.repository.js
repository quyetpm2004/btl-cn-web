import { WorkType } from '../models/index.js'

async function getAllWorkType() {
  return WorkType.findAll()
}

export { getAllWorkType }
