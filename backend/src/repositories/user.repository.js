import { User, Resident, Staff, Role } from '../models/index.js'

async function createUser(data, options = {}) {
  return User.create(data, options)
}

async function getUserById(id) {
  return User.findByPk(id)
}

async function getAllUsers() {
  return User.findAll()
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

async function deleteUser(id) {
  return User.destroy({ where: { id } })
}

async function getUserWithResident(userId) {
  return User.findOne({
    where: { id: userId },
    include: [{ model: Resident, as: 'resident' }],
    attributes: { exclude: ['password'] }
  })
}

async function getUserWithProfile(userId) {
  return User.findOne({
    where: { id: userId },
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

export {
  createUser,
  getUserById,
  getAllUsers,
  getUserByUsername,
  getUserByEmail,
  updateUser,
  deleteUser,
  getUserWithResident,
  getUserWithProfile,
  updateUserWithResident
}
