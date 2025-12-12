import { Service } from '../models/index.js'

async function create(data) {
  return Service.create(data)
}

async function getAllActive() {
  return Service.findAll({
    where: { status: 1 }
  })
}

async function getById(id) {
  return Service.findByPk(id)
}

async function update(id, data) {
  return Service.update(data, { where: { id } })
}

async function deleteService(id) {
  return Service.update({ status: 0 }, { where: { id } })
}

export { create, getAllActive, getById, update, deleteService }
