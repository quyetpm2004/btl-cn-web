import {
  Invoice,
  ResidentApartment,
  MaintenanceRequest,
  NotificationReceiver
} from '../models/index.js'
import { Op } from 'sequelize'

async function countUnpaidPayments(residentId) {
  if (!residentId) return 0

  const apartmentIds = await ResidentApartment.findAll({
    where: { resident_id: residentId },
    attributes: ['apartment_id'],
    raw: true
  }).then((rows) => rows.map((row) => row.apartment_id))

  return Invoice.count({
    where: {
      apartment_id: {
        [Op.in]: apartmentIds
      },
      status: 0
    }
  })
}

async function countOwnedApartments(residentId) {
  if (!residentId) return 0
  return ResidentApartment.count({
    where: {
      resident_id: residentId,
      end_date: null
    }
  })
}

async function countPendingMaintenance(residentId) {
  if (!residentId) return 0
  return MaintenanceRequest.count({
    where: {
      resident_id: residentId,
      status: 'pending'
    }
  })
}

async function countNewNotifications(residentId) {
  if (!residentId) return 0
  return NotificationReceiver.count({
    where: {
      is_read: 0,
      resident_id: residentId
    }
  })
}

export {
  countUnpaidPayments,
  countOwnedApartments,
  countPendingMaintenance,
  countNewNotifications
}
