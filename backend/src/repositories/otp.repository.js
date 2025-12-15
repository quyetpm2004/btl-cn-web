import { Op } from 'sequelize'
import { Otp } from '../models/index.js'

async function upsertOtp(email, code, expiresAt) {
  return Otp.upsert({
    email,
    code,
    expiresAt
  })
}

async function findOtpByEmail(email) {
  return Otp.findOne({ where: { email } })
}

async function deleteOtpByEmail(email) {
  await Otp.destroy({ where: { email } })
}

export { upsertOtp, findOtpByEmail, deleteOtpByEmail }
