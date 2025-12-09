import express from 'express'
import * as userController from '@/controllers/admin/user.controller'
import { validateBody, validateParams } from '@/middlewares/validate.js'

const accountRouter = express.Router()

accountRouter.get('/', userController.getAllUsers)
accountRouter.post('/', userController.createUser)
accountRouter.put('/:id', userController.updateUser)
accountRouter.delete('/:id', userController.deleteUser)

export default accountRouter
