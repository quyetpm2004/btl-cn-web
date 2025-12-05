import {
  countUnpaidPayments,
  countOwnedApartments,
  countPendingMaintenance,
  countNewNotifications
} from '../repositories/dashboard.repository.js'

async function getDashboardCounts(residentId) {
  if (!residentId) {
    throw new Error('residentId is required')
  }

  const [
    unpaidCount,
    apartmentsCount,
    pendingMaintenanceCount,
    newNotificationsCount
  ] = await Promise.all([
    countUnpaidPayments(residentId),
    countOwnedApartments(residentId),
    countPendingMaintenance(residentId),
    countNewNotifications(residentId)
  ])

  return {
    unpaidPayments: Number(unpaidCount) || 0,
    ownedApartments: Number(apartmentsCount) || 0,
    pendingMaintenanceRequests: Number(pendingMaintenanceCount) || 0,
    newNotifications: Number(newNotificationsCount) || 0
  }
}

export { getDashboardCounts }