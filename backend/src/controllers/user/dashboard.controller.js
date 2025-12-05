import { getDashboardCounts } from '../../services/dashboard.service.js'

/**
 * GET /api/user/dashboard
 * Accepts residentId in query or from authenticated user (req.user / req.resident)
 * Response: { unpaidPayments, ownedApartments, pendingMaintenanceRequests, newNotifications }
 */
async function getDashboard(req, res) {
  try {
    const residentId = req.query?.residentId 

    if (!residentId) {
      return res.status(400).json({
        success: false,
        message: 'residentId is required (query parameter)'
      })
    }

    const data = await getDashboardCounts(residentId)
    return res.status(200).json({ success: true, data })
  } catch (err) {
    console.error('getDashboard error', err)
    return res.status(500).json({ success: false, message: 'Internal server error' })
  }
}

export { getDashboard }