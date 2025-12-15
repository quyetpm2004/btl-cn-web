import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { StatusCodes } from 'http-status-codes'
import { AppError } from '../../utils/errors.js'
import { sequelize } from '../../models/index.js'
import * as userRepo from '../../repositories/user.repository.js'
import * as otpRepository from '../../repositories/otp.repository.js'
import { createResident } from '../../repositories/resident.repository.js'
import { createResidentApartment } from '../../repositories/residentApartment.repository.js'
import { getApartmentByCode } from '../../repositories/apartment.repository.js'
import { hashPassword } from '@/validations/password.js'
import emailService from '../email.service.js'

const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '12h'

function toPublicUser(user) {
  if (!user) return null
  const resident = user.resident || null
  const staff = user.staff || null
  const roleName = user.role?.name || undefined
  const displayName = resident?.full_name || staff?.full_name || user.username

  return {
    id: user.id,
    username: user.username,
    email: user.email,
    phone: user.phone,
    role_id: user.role_id,
    role_name: roleName,
    display_name: displayName,
    avatar_url: user.avatar_url,
    resident: resident ?? undefined,
    staff: staff ?? undefined
  }
}

async function registerService({
  username,
  password,
  full_name,
  email,
  phone,
  apartment_code
}) {
  const t = await sequelize.transaction()
  try {
    if (!username || !password) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        'Username and password are required'
      )
    }

    const existUsername = await userRepo.getUserByUsername(username)
    if (existUsername) {
      throw new AppError(StatusCodes.CONFLICT, 'Username already exists')
    }

    const existEmail = await userRepo.getUserByEmail(email)
    if (existEmail) {
      throw new AppError(StatusCodes.CONFLICT, 'Email already in use')
    }

    const apartment = await getApartmentByCode(apartment_code)
    if (!apartment) {
      throw new AppError(StatusCodes.NOT_FOUND, 'Apartment not found')
    }

    const hashed = await bcrypt.hash(password, 10)

    const user = await userRepo.createUser(
      {
        username,
        password: hashed,
        role_id: 2, // Resident
        email,
        phone,
        status: 1
      },
      { transaction: t }
    )

    const resident = await createResident(
      {
        full_name,
        user_id: user.id
      },
      { transaction: t }
    )

    await createResidentApartment(
      {
        resident_id: resident.id,
        apartment_id: apartment.id,
        relationship: 'member',
        start_date: new Date()
      },
      { transaction: t }
    )

    const payload = {
      sub: user.id,
      username: user.username,
      role_id: user.role_id
    }
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })

    await t.commit()

    const fullUser = await userRepo.getUserWithProfile(user.id)
    return { user: toPublicUser(fullUser), token }
  } catch (error) {
    await t.rollback()
    throw error
  }
}

async function loginService({ username, password }) {
  if (!username || !password) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Missing login credentials')
  }

  const user = await userRepo.getUserByUsername(username)
  if (!user) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid login credentials')
  }

  const checkPassword = await bcrypt.compare(password, user.password)
  if (!checkPassword) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid login credentials')
  }

  if (user.status === 0) {
    throw new AppError(StatusCodes.FORBIDDEN, 'Account is inactive')
  }

  const payload = {
    sub: user.id,
    username: user.username,
    role_id: user.role_id
  }
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
  // include profile for convenience on login
  const fullUser = await userRepo.getUserWithProfile(user.id)
  return { user: toPublicUser(fullUser), token }
}

async function me(userId) {
  const user = await userRepo.getUserWithProfile(userId)
  return toPublicUser(user)
}

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

async function requestPasswordReset(email) {
  const user = await userRepo.getUserByEmail(email)

  if (user === null) {
    throw new Error('Email không tồn tại trong hệ thống.')
  }

  const code = generateOTP()
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000)

  if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
    try {
      console.log('Email configured. Sending forgot-password email.', email)
      await emailService.sendForgotPasswordCode({
        email,
        code
      })
    } catch (emailError) {
      console.error('Email sending failed (but contact saved):', emailError)
    }
  } else {
    console.log('Email not configured. Skipping email sending.')
  }

  return await otpRepository.upsertOtp(email, code, expiresAt)
}

async function verifyOtp(email, code) {
  const storedOtp = await otpRepository.findOtpByEmail(email)

  if (!storedOtp) {
    throw new Error('Email không hợp lệ hoặc chưa gửi yêu cầu khôi phục.')
  }

  if (storedOtp.code !== code) {
    throw new Error('Mã xác minh không khớp. Vui lòng thử lại.')
  }

  if (new Date() > storedOtp.expiresAt) {
    await otpRepository.deleteOtpByEmail(email)
    throw new Error('Mã xác minh đã hết hạn. Vui lòng yêu cầu mã mới.')
  }

  await otpRepository.deleteOtpByEmail(email)

  const user = await userRepo.getUserByEmail(email)
  if (!user) {
    throw new Error('Lỗi hệ thống: Không tìm thấy người dùng sau khi xác minh.')
  }

  const resetToken = jwt.sign(
    { userId: user.id, purpose: 'reset' },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  )

  return resetToken
}

async function resetPassword(token, newPassword) {
  let decoded
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET)
  } catch (err) {
    throw new Error('Liên kết đặt lại mật khẩu không hợp lệ hoặc đã hết hạn.')
  }

  if (decoded.purpose !== 'reset') {
    throw new Error('Token không hợp lệ.')
  }

  const userId = decoded.userId

  const newPasswordHash = await hashPassword(newPassword)

  const affectedRows = await userRepo.updatePassword(userId, newPasswordHash)

  console.log('affectedRows', affectedRows)

  if (affectedRows === 0) {
    throw new Error('Không tìm thấy người dùng để cập nhật.')
  }
}

export const authService = {
  registerService,
  loginService,
  me,
  requestPasswordReset,
  verifyOtp,
  resetPassword
}
