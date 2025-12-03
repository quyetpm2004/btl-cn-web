import { Op } from 'sequelize'
import { Staff, User, Role } from '../models/index.js'

async function getAllStaffs() {
  return Staff.findAll({
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['id', 'username', 'email', 'phone', 'avatar_url']
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
        attributes: ['id', 'username', 'email', 'phone', 'avatar_url']
      }
    ]
  })
}

export { getAllStaffs, getTechnicians }
