import * as StaffService from '@/services/admin/staff.service'
import { toHttpError } from '@/utils/errors.js'

async function getAllStaffs(req, res) {
  try {
    const staffs = await StaffService.getAllStaffs()
    return res.json({ staffs })
  } catch (err) {
    const http = toHttpError(err)
    return res.status(http.status).json(http.body)
  }
}

async function getTechnicians(req, res) {
  try {
    const technicians = await StaffService.getTechnicians()
    return res.json({ technicians })
  } catch (err) {
    const http = toHttpError(err)
    return res.status(http.status).json(http.body)
  }
}

export { getAllStaffs, getTechnicians }
