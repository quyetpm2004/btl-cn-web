import { User, Resident, Staff, Role, Apartment } from '../models/index.js'
import { Op } from 'sequelize'

async function createUser(data, options = {}) {
  return User.create(data, options)
}

async function getUserById(id) {
  return User.findByPk(id)
}

async function getUserByUsername(username) {
  return User.findOne({ where: { username } })
}

async function getUserByEmail(email) {
  return User.findOne({ where: { email } })
}

async function updateUser(id, data) {
  return User.update(data, { where: { id } })
}

async function getUserWithProfile(id) {
  return User.findOne({
    where: { id },
    include: [
      { model: Resident, as: 'resident' },
      { model: Staff, as: 'staff' },
      { model: Role, as: 'role' }
    ],
    attributes: { exclude: ['password'] }
  })
}

async function updateUserWithResident(userId, data) {
  const {
    email,
    full_name,
    phone,
    gender,
    id_card,
    dob,
    hometown,
    ethnicity,
    occupation,
    household_no,
    avatar
  } = data

  if (avatar !== null) {
    await User.update(
      { email, phone, avatar_url: avatar },
      { where: { id: userId } }
    )
  } else {
    await User.update({ email, phone }, { where: { id: userId } })
  }

  await Resident.update(
    {
      id_card,
      dob,
      full_name,
      gender,
      hometown,
      ethnicity,
      occupation,
      household_no
    },
    { where: { user_id: userId } }
  )

  return await User.findOne({
    where: { id: userId },
    include: [{ model: Resident, as: 'resident' }],
    attributes: { exclude: ['password'] }
  })
}

async function updateUserWithStaff(userId, data) {
  const { email, full_name, phone, gender, id_card, dob, address, avatar } =
    data

  if (avatar !== null) {
    await User.update({ email, avatar_url: avatar }, { where: { id: userId } })
  } else {
    await User.update({ email }, { where: { id: userId } })
  }

  await Staff.update(
    {
      full_name,
      gender,
      phone,
      id_card,
      dob
    },
    { where: { user_id: userId } }
  )

  return await User.findOne({
    where: { id: userId },
    include: [{ model: Staff, as: 'staff' }],
    attributes: { exclude: ['password'] }
  })
}

async function getCountAdmin() {
  return User.count({
    where: { role_id: 1 }
  })
}

async function getCountManager() {
  return User.count({
    where: { role_id: 3 }
  })
}

async function getCountAccountants() {
  return User.count({
    where: { role_id: 4 }
  })
}

async function getCountTechnicians() {
  return User.count({
    where: { role_id: 5 }
  })
}

async function getAllUsers(filters) {
  const page = Number(filters.page) > 0 ? Number(filters.page) : 1
  const limit = Number(filters.limit) > 0 ? Number(filters.limit) : 10
  const offset = (page - 1) * limit

  const {
    page: _p,
    limit: _l,
    offset: _o,
    query,
    role_id,
    status
  } = filters || {}

  const where = {}
  if (role_id) where.role_id = role_id
  if (status !== undefined && status !== '') where.status = status

  const include = [
    { model: Role, as: 'role' },
    { model: Resident, as: 'resident' },
    { model: Staff, as: 'staff' }
  ]

  if (query) {
    const search = `%${query}%`
    where[Op.or] = [
      { username: { [Op.like]: search } },
      { '$resident.full_name$': { [Op.like]: search } },
      { '$staff.full_name$': { [Op.like]: search } }
    ]
  }

  const total = await User.count({
    where,
    include
  })

  const items = await User.findAll({
    where,
    include,
    limit,
    offset
  })

  return { items, total, page, limit }
}

export {
  createUser,
  getUserById,
  getUserByUsername,
  getUserByEmail,
  updateUser,
  getUserWithProfile,
  updateUserWithResident,
  updateUserWithStaff,
  getCountAdmin,
  getCountManager,
  getCountAccountants,
  getCountTechnicians,
  getAllUsers
}
