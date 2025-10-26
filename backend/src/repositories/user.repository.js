import { User } from '../models/index.js'

async function createUser(userData, options = {}) {
  return User.create(userData, options)
}

async function getUserById(userId) {
  return User.findByPk(userId)
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

async function updateUser(userId, updateData) {
  return User.update(updateData, { where: { id: userId } })
}

async function deleteUser(userId) {
  return User.destroy({ where: { id: userId } })
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
