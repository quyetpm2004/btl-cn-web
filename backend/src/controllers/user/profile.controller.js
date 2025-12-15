import {
  handleGetProfile,
  handleUpdatePassword,
  handleUpdateProfile
} from '../../services/user/profile.service'

const getProfile = async (req, res) => {
  const { id } = req.user

  try {
    const data = await handleGetProfile(id)
    return res
      .status(200)
      .json({ message: 'Lấy thông tin cá nhân thành công', data })
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
}

const updateProfile = async (req, res) => {
  const { id } = req.user
  const {
    email,
    full_name,
    phone,
    gender,
    id_card,
    dob,
    hometown,
    ethnicity,
    occupation,
    household_no
  } = req.body
  const avatar = req.file ? req.file.filename : null
  try {
    const data = await handleUpdateProfile(
      id,
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
    )
    return res
      .status(200)
      .json({ message: 'Cập nhật thông tin cá nhân thành công', data })
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
}

const updatePassword = async (req, res) => {
  const { id } = req.user
  const { oldPassword, newPassword, confirmPassword } = req.body
  try {
    const data = await handleUpdatePassword(
      id,
      oldPassword,
      newPassword,
      confirmPassword
    )
    return res
      .status(200)
      .json({ message: 'Cập nhật mật khẩu thành công', data })
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
}

export { getProfile, updatePassword, updateProfile }
