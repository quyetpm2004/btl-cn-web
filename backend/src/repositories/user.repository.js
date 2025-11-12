import { User, Resident } from '../models/index.js'

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
    occupation
  } = data
  console.log('check data', data, userId)
  await User.update({ email, phone }, { where: { id: userId } })

  await Resident.update(
    { id_card, dob, full_name, gender, hometown, ethnicity, occupation },
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
  updateUserWithResident
}
