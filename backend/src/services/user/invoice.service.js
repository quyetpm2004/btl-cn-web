import * as invoiceRepo from '../../repositories/invoice.repository.js'
import { getApartmentByUserId } from '../../repositories/apartment.repository.js'

/**
 * Get unpaid invoices for the apartment owned by the given user
 * @param {number} userId
 */
async function getUnpaidInvoicesForUser(userId) {
  const apartment = await getApartmentByUserId(userId)
  if (!apartment) return []
  return invoiceRepo.getInvoicesByApartmentAndStatus(apartment, [0, 2])
}

/**
 * Get paid invoices for the apartment owned by the given user
 * @param {number} userId
 */
async function getPaidInvoicesForUser(userId) {
  const apartment = await getApartmentByUserId(userId)
  if (!apartment) return []
  return invoiceRepo.getInvoicesByApartmentAndStatus(apartment, 1)
}

export const invoiceService = {
  getUnpaidInvoicesForUser,
  getPaidInvoicesForUser
}
