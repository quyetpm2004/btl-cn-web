import {
  getUserById,
  getUserWithResident,
  updateUser,
  updateUserWithResident
} from '../../repositories/user.repository'
import { comparePassword, hashPassword } from '../../validations/password'

const handleGetProfile = async (userId) => {
  const result = await getUserWithResident(userId)
  const { email, phone, resident, avatar_url } = result
  if (resident) {
    const {
      full_name,
      gender,
      id_card,
      dob,
      hometown,
      ethnicity,
      occupation,
      household_no
    } = resident
    return {
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
      avatar_url
    }
  } else {
    return { email, phone, avatar_url }
  }
}

const handleUpdateProfile = async (
  userId,
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
) => {
  return await updateUserWithResident(userId, {
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
  })
}

const handleUpdatePassword = async (
  userId,
  oldPassword,
  newPassword,
  confirmPassword
) => {
  // Implementation for updating password goes here
  const { password } = await getUserById(userId)

  const isMatch = await comparePassword(oldPassword, password)

  if (!isMatch) {
    throw new Error('Old password is incorrect')
  }

  if (newPassword !== confirmPassword) {
    throw new Error('New password and confirm password do not match')
  }

  if (newPassword.length < 6) {
    throw new Error('New password must be at least 6 characters long')
  }

  const hashedNewPassword = await hashPassword(newPassword)
  await updateUser(userId, { password: hashedNewPassword })

  return {
    success: true
  }
}

export { handleGetProfile, handleUpdatePassword, handleUpdateProfile }
