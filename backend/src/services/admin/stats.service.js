import { AppError } from '@/utils/errors.js'
import { StatusCodes } from 'http-status-codes'
import * as userRepo from '@/repositories/user.repository.js'
import * as residentRepo from '@/repositories/resident.repository.js'
import * as apartmentRepo from '@/repositories/apartment.repository.js'
import * as maintenanceRequestRepo from '@/repositories/maintenanceRequest.repository.js'
import { Invoice } from '@/models/index.js'

/**
 * Get dashboard statistics for admin
 * @returns Dashboard statistics for admin
 */
async function getDashboardStats() {
  try {
    const [residentCount, apartmentCount, requestCount, totalInvoiceAmount] =
      await Promise.all([
        residentRepo.getResidentCount(),
        apartmentRepo.getApartmentCount(),
        maintenanceRequestRepo.getRequestCount(),
        Invoice.sum('total_amount')
      ])
    return {
      residentCount,
      apartmentCount,
      requestCount,
      totalInvoiceAmount
    }
  } catch (error) {
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      'Failed to get dashboard stats'
    )
  }
}

/**
 * Get counts of different user roles for admin dashboard
 * @returns Counts of different user roles for admin dashboard
 */
async function getAccountStats() {
  try {
    const [adminCount, managerCount, accountantCount, technicianCount] =
      await Promise.all([
        userRepo.getCountAdmin(),
        userRepo.getCountManager(),
        userRepo.getCountAccountants(),
        userRepo.getCountTechnicians()
      ])
    return {
      adminCount,
      managerCount,
      accountantCount,
      technicianCount
    }
  } catch (error) {
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      'Failed to get account stats'
    )
  }
}

export { getDashboardStats, getAccountStats }
