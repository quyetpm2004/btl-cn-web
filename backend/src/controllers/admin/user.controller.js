import { toHttpError } from '@/utils/errors.js'
import { StatusCodes } from 'http-status-codes'
import * as userService from '@/services/admin/user.service'

async function getAllUsers(req, res) {
  try {
    const filters = req.query
    const users = await userService.getAllUsers(filters)
    return res.status(StatusCodes.OK).json(users)
  } catch (err) {
    const http = toHttpError(err)
    return res.status(http.status).json(http.body)
  }
}

async function createUser(req, res) {
  try {
    const user = await userService.createUser(req.body)
    return res.status(StatusCodes.CREATED).json(user)
  } catch (err) {
    const http = toHttpError(err)
    return res.status(http.status).json(http.body)
  }
}

async function updateUser(req, res) {
  try {
    const { id } = req.params
    const user = await userService.updateUser(id, req.body)
    return res.status(StatusCodes.OK).json(user)
  } catch (err) {
    const http = toHttpError(err)
    return res.status(http.status).json(http.body)
  }
}

async function deleteUser(req, res) {
  try {
    const { id } = req.params
    await userService.deleteUser(id)
    return res.status(StatusCodes.NO_CONTENT).send()
  } catch (err) {
    const http = toHttpError(err)
    return res.status(http.status).json(http.body)
  }
}

export { getAllUsers, createUser, updateUser, deleteUser }
