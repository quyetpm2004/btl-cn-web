import { AppError } from '../utils/errors.js'
import { StatusCodes } from 'http-status-codes'
import * as apartmentRepo from '../repositories/apartment.repository.js'
import { residentApartmentService } from './residentApartment.service.js'
import { sequelize } from '../models/index.js'

async function createApartmentService(data) {
  const t = await sequelize.transaction()
  try {
    const apartment = await apartmentRepo.createApartment(
      {
        apartment_code: data.apartment_code,
        building: data.building,
        type_id: data.type_id,
        area: data.area,
        status: data.status,
        floor: data.floor
      },
      {
        transaction: t
      }
    )

    await residentApartmentService.assignOwnerToApartment(
      data.owner_id,
      apartment.id,
      t
    )

    await t.commit()
    return apartment
  } catch (error) {
    await t.rollback()
    throw error
  }
}

async function getApartmentsService() {
  return apartmentRepo.getAllApartments()
}

async function getApartmentDetailService(id) {
  const apartment = await apartmentRepo.getApartmentById(id)
  if (!apartment) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Apartment not found')
  }
  return apartment
}

async function updateApartmentService(id, data) {
  const t = await sequelize.transaction()
  try {
    // Get current apartment to check existence
    const currentApartment = await apartmentRepo.getApartmentById(id)
    if (!currentApartment) {
      throw new AppError(StatusCodes.NOT_FOUND, 'Apartment not found')
    }

    // Get current owner from resident_apartment table
    const currentOwnerResidency =
      await residentApartmentService.getCurrentOwner(id)
    const currentOwnerId = currentOwnerResidency
      ? currentOwnerResidency.resident_id
      : null

    // If owner is changing, end residency for old owner
    if (
      data.owner_id &&
      currentOwnerId &&
      String(data.owner_id) !== String(currentOwnerId)
    ) {
      await residentApartmentService.endResidency(currentOwnerId, id, t)
    }

    const [updatedRows] = await apartmentRepo.updateApartment(
      id,
      {
        apartment_code: data.apartment_code,
        building: data.building,
        type_id: data.type_id,
        area: data.area,
        status: data.status,
        floor: data.floor
      },
      { transaction: t }
    )

    const result = await residentApartmentService.assignOwnerToApartment(
      data.owner_id,
      id,
      t
    )

    // if (updatedRows === 0 || !result) {
    //   throw new AppError(
    //     StatusCodes.INTERNAL_SERVER_ERROR,
    //     'Failed to update apartment'
    //   )
    // }

    await t.commit()
    return apartmentRepo.getApartmentById(id)
  } catch (error) {
    await t.rollback()
    throw error
  }
}

async function filterApartmentsService(filters) {
  return apartmentRepo.filterApartments(filters)
}

async function deleteApartmentService(id) {
  const deletedRows = await apartmentRepo.deleteApartment(id)
  if (deletedRows === 0) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Apartment not found')
  }
}

async function getApartmentCountService() {
  return apartmentRepo.getApartmentCount() ?? 0
}

async function getBuildingsApartmentService() {
  const buildings = await apartmentRepo.getBuildingsApartment()
  return buildings.map((b) => b.building)
}

async function getTypesApartmentService() {
  const types = await apartmentRepo.getTypesApartment()
  return types.map((t) => t.name)
}

export const apartmentService = {
  createApartmentService,
  getApartmentsService,
  getApartmentDetailService,
  updateApartmentService,
  filterApartmentsService,
  deleteApartmentService,
  getApartmentCountService,
  getBuildingsApartmentService,
  getTypesApartmentService
}
