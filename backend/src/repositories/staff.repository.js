import { Op } from 'sequelize'
import { Staff, User, Role } from '../models/index.js'

async function getAllStaffs() {
  return Staff.findAll({
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['id', 'username', 'email', 'avatar_url']
      }
    ]
  })
}

async function getTechnicians() {
  return Staff.findAll({
    where: {
      [Op.or]: [
        { position: { [Op.like]: '%Kỹ thuật%' } },
        {
          department: { [Op.like]: '%Kỹ thuật%' }
        }
      ]
    },
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['id', 'username', 'avatar_url']
      }
    ]
  })
}

async function createStaff(data, options = {}) {
  return Staff.create(data, options)
}

async function updateStaff(id, data, options = {}) {
  return Staff.update(data, { where: { id }, ...options })
}

export { getAllStaffs, getTechnicians, createStaff, updateStaff }
