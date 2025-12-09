import { AppError } from '@/utils/errors.js'
import { StatusCodes } from 'http-status-codes'
import * as userRepo from '@/repositories/user.repository.js'
import * as residentRepo from '@/repositories/resident.repository.js'
import * as staffRepo from '@/repositories/staff.repository.js'
import bcrypt from 'bcryptjs'
import { sequelize } from '@/config/database.js'

async function getAllUsers(filters) {
  try {
    return await userRepo.getAllUsers(filters)
  } catch (error) {
    console.error(error)
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      'Failed to get all users'
    )
  }
}

async function createUser(data) {
  const t = await sequelize.transaction()
  try {
    const { username, password, role_id, status, resident_id, staff_data } =
      data

    // Check if username exists
    const existingUser = await userRepo.getUserByUsername(username)
    if (existingUser) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Username already exists')
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await userRepo.createUser(
      {
        username,
        password: hashedPassword,
        role_id,
        status: status || 1
      },
      { transaction: t }
    )

    if (role_id == 2) {
      // Resident
      if (!resident_id) {
        throw new AppError(
          StatusCodes.BAD_REQUEST,
          'Resident ID is required for Resident account'
        )
      }
      await residentRepo.updateResident(
        resident_id,
        { user_id: newUser.id },
        { transaction: t }
      )
    } else {
      // Staff
      if (staff_data) {
        await staffRepo.createStaff(
          {
            ...staff_data,
            start_date: new Date(),
            user_id: newUser.id
          },
          { transaction: t }
        )
      }
    }

    await t.commit()
    return newUser
  } catch (error) {
    await t.rollback()
    throw error
  }
}

async function updateUser(id, data) {
  const t = await sequelize.transaction()
  try {
    const { status, password, role_id, resident_id, staff_data } = data
    const updateData = {}
    if (status !== undefined) updateData.status = status
    if (password) {
      updateData.password = await bcrypt.hash(password, 10)
    }
    if (role_id) updateData.role_id = role_id

    await userRepo.updateUser(id, updateData, { transaction: t })

    // Handle role change or data update
    if (role_id == 2) {
      // Resident
      // If switching to resident or updating resident
      if (resident_id) {
        // Unlink previous resident if any (optional, depending on logic)
        // Link new resident
        await residentRepo.updateResident(
          resident_id,
          { user_id: id },
          { transaction: t }
        )
      }
    } else if (role_id && role_id != 2) {
      // Staff
      // If switching to staff or updating staff
      // Check if user already has staff profile
      const user = await userRepo.getUserWithProfile(id)
      if (user.staff) {
        if (staff_data) {
          await staffRepo.updateStaff(user.staff.id, staff_data, {
            transaction: t
          })
        }
      } else if (staff_data) {
        await staffRepo.createStaff(
          {
            ...staff_data,
            start_date: new Date(),
            user_id: id
          },
          { transaction: t }
        )
      }
    }

    await t.commit()
    return await userRepo.getUserById(id)
  } catch (error) {
    await t.rollback()
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      'Failed to update user'
    )
  }
}

async function deleteUser(id) {
  try {
    await userRepo.updateUser(id, { status: 0 })
  } catch (error) {
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      'Failed to delete user'
    )
  }
}

export { getAllUsers, createUser, updateUser, deleteUser }
