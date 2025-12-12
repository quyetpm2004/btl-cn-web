import {
  getUserById,
  getUserWithProfile,
  updateUser,
  updateUserWithResident,
  updateUserWithStaff
} from '../../repositories/user.repository'
import { comparePassword, hashPassword } from '../../validations/password'

const handleGetProfile = async (userId) => {
  const result = await getUserWithProfile(userId)
  const { email, resident, staff, avatar_url, role } = result
  if (resident) {
    const {
      full_name,
      gender,
      id_card,
      phone,
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
      avatar_url,
      role: role ? role.name : null
    }
  } else if (staff) {
    const {
      full_name,
      gender,
      id_card,
      dob,
      position,
      department,
      start_date,
      status
    } = staff
    return {
      email,
      full_name,
      phone: staff.phone || phone,
      gender,
      id_card,
      dob,
      position,
      department,
      start_date,
      status,
      avatar_url,
      role: role ? role.name : null
    }
  } else {
    return { email, phone, avatar_url, role: role ? role.name : null }
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
  const user = await getUserWithProfile(userId)
  if (user.resident) {
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
  } else if (user.staff) {
    return await updateUserWithStaff(userId, {
      email,
      full_name,
      phone,
      gender,
      id_card,
      dob,
      avatar
    })
  } else {
    if (avatar !== null) {
      return await updateUser(userId, { email, avatar_url: avatar })
    } else {
      return await updateUser(userId, { email })
    }
  }
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

  const hashedNewPassword = await hashPassword(newPassword)
  await updateUser(userId, { password: hashedNewPassword })

  return {
    success: true
  }
}

export { handleGetProfile, handleUpdatePassword, handleUpdateProfile }
