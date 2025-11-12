import express from 'express'
import {
  fetchResident,
  getApartment,
  getProfile,
  updatePassword,
  updateProfile
} from '../controllers/user.controller.js'

const userRoute = express.Router()

userRoute.get('/profile', getProfile)
userRoute.put('/profile', updateProfile)
userRoute.put('/password', updatePassword)
userRoute.get('/apartment', getApartment)
userRoute.get('/fetch-resident', fetchResident)

export default userRoute
