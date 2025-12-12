import { AppError } from '@/utils/errors.js'
import { StatusCodes } from 'http-status-codes'
import * as periodRepo from '@/repositories/collectionPeriod.repository.js'

async function create(data) {
  return periodRepo.create(data)
}

async function getAll() {
  return periodRepo.getAll()
}

async function update(id, data) {
  const [updatedRows] = await periodRepo.update(id, data)
  if (updatedRows === 0) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      'Collection period not found or no changes made'
    )
  }
  return periodRepo.getById(id)
}

async function close(id) {
  const [updatedRows] = await periodRepo.close(id)
  if (updatedRows === 0) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      'Collection period not found or already closed'
    )
  }
}

async function deleteCollectionPeriod(id) {
  const deletedRows = await periodRepo.deleteCollectionPeriod(id)
  if (deletedRows === 0) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Collection period not found')
  }
}

export { create, getAll, update, close, deleteCollectionPeriod }
