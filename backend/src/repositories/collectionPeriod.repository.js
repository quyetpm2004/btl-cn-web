import { CollectionPeriod } from '../models/index.js'

async function create(data) {
  return CollectionPeriod.create(data)
}

async function getAll() {
  return CollectionPeriod.findAll({
    order: [
      ['status', 'DESC'],
      ['start_date', 'DESC']
    ]
  })
}

async function getById(id) {
  return CollectionPeriod.findByPk(id)
}

async function update(id, data) {
  return CollectionPeriod.update(data, { where: { id } })
}

async function close(id) {
  return CollectionPeriod.update({ status: 0 }, { where: { id } })
}

async function deleteCollectionPeriod(id) {
  return CollectionPeriod.destroy({ where: { id } })
}

export { create, getAll, getById, update, close, deleteCollectionPeriod }
