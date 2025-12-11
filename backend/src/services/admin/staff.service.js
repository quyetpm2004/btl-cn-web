import * as StaffRepo from '@/repositories/staff.repository'

async function getAllStaffs() {
  return await StaffRepo.getAllStaffs()
}

async function getTechnicians() {
  return await StaffRepo.getTechnicians()
}

export { getAllStaffs, getTechnicians }
