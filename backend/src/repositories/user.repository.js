import { User } from '../models/index.js'

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

export {
  createUser,
  getUserById,
  getAllUsers,
  getUserByUsername,
  getUserByEmail,
  updateUser,
  deleteUser
}
