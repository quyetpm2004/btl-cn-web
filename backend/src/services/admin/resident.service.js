import { AppError } from '../../utils/errors.js'
import { StatusCodes } from 'http-status-codes'
import * as residentRepo from '../../repositories/resident.repository.js'
import * as residentApartmentRepo from '../../repositories/residentApartment.repository.js'
import { sequelize } from '../../models/index.js'

async function createResidentService(data) {
  const t = await sequelize.transaction()
  try {
    const resident = await residentRepo.createResident(
      {
        full_name: data.full_name,
        gender: data.gender,
        phone: data.phone,
        dob: data.dob,
        place_of_birth: data.place_of_birth,
        ethnicity: data.ethnicity,
        occupation: data.occupation,
        hometown: data.hometown,
        id_card: data.id_card,
        household_no: data.household_no,
        status: data.status,
        registered_at: data.registered_at
      },
      { transaction: t }
    )

    // If apartment_id is provided, create association
    if (data.apartment_id) {
      await residentApartmentRepo.createResidentApartment(
        {
          resident_id: resident.id,
          apartment_id: data.apartment_id,
          relationship: data?.relationship || 'member',
          start_date: data?.start_date || new Date()
        },
        { transaction: t }
      )
    }
    await t.commit()
    return resident
  } catch (error) {
    await t.rollback()
    throw error
  }
}

async function getResidentsService() {
  return residentRepo.getAllResidents()
}

async function getResidentsWithoutAccountService() {
  return residentRepo.getResidentsWithoutAccount()
}

async function getResidentDetailService(id) {
  const resident = await residentRepo.getResidentById(id)
  if (!resident) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Resident not found')
  }
  return resident
}

async function updateResidentService(id, data) {
  const t = await sequelize.transaction()
  try {
    let [updatedRows] = await residentRepo.updateResident(
      id,
      {
        full_name: data.full_name,
        gender: data.gender,
        phone: data.phone,
        dob: data.dob,
        place_of_birth: data.place_of_birth,
        ethnicity: data.ethnicity,
        occupation: data.occupation,
        hometown: data.hometown,
        id_card: data.id_card,
        household_no: data.household_no,
        status: data.status,
        registered_at: data.registered_at
      },
      { transaction: t }
    )
    if (data.apartment_id) {
      await residentApartmentRepo.updateResidentApartmentByResidentId(
        id,
        {
          end_date: new Date(),
          is_living: false
        },
        {
          transaction: t
        }
      )

      await residentApartmentRepo.createResidentApartment(
        {
          resident_id: id,
          apartment_id: data.apartment_id,
          relationship: data?.relationship || 'member',
          start_date: data?.start_date || new Date(),
          is_living: true
        },
        { transaction: t }
      )

      updatedRows += 1
    }
    if (updatedRows === 0) {
      throw new AppError(
        StatusCodes.NOT_FOUND,
        'Resident not found or no changes made'
      )
    }
    await t.commit()
    return residentRepo.getResidentById(id)
  } catch (error) {
    await t.rollback()
    throw error
  }
}

async function filterResidentsService(filters) {
  return residentRepo.filterResidents(filters)
}

async function deleteResidentService(id) {
  const deletedRows = await residentRepo.deleteResident(id)
  if (deletedRows === 0) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Resident not found')
  }
}

async function getResidentCountService() {
  return residentRepo.getResidentCount() ?? 0
}

export const residentService = {
  createResidentService,
  getResidentsService,
  getResidentDetailService,
  updateResidentService,
  filterResidentsService,
  deleteResidentService,
  getResidentCountService,
  getResidentsWithoutAccountService
}
