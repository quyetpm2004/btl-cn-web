import { authService } from '@/services/auth/auth.service.js'
import emailService from '@/services/email.service'
import { toHttpError } from '@/utils/errors.js'

async function register(req, res) {
  try {
    const result = await authService.registerService(req.body || {})
    return res
      .status(201)
      .json({ message: 'Registration successful', ...result })
  } catch (err) {
    const http = toHttpError(err)
    return res.status(http.status).json(http.body)
  }
}

async function login(req, res) {
  try {
    const result = await authService.loginService(req.body || {})
    return res.status(200).json({ message: 'Login successful', ...result })
  } catch (err) {
    const http = toHttpError(err)
    return res.status(http.status).json(http.body)
  }
}

async function me(req, res) {
  try {
    const { id } = req.user

    if (!id) return res.status(401).json({ error: 'Unauthorized' })

    const user = await authService.me(id)
    return res.status(200).json({ message: 'User profile fetched', user })
  } catch (err) {
    const http = toHttpError(err)
    return res.status(http.status).json(http.body)
  }
}

async function handlePasswordResetRequest(req, res) {
  const { email } = req.body

  if (!email) {
    return res.status(400).send({ message: 'Địa chỉ email là bắt buộc.' })
  }

  try {
    // Logic nghiệp vụ nằm trong Service
    await authService.requestPasswordReset(email)

    res.status(200).send({
      message: 'Email tồn tại, một mã xác minh đã được gửi.'
    })
  } catch (error) {
    console.error('Lỗi khi xử lý yêu cầu đặt lại mật khẩu:', error)
    res.status(500).send({ message: error.message || 'Lỗi máy chủ nội bộ.' })
  }
}

/**
 * POST /api/auth/verify-otp
 */
async function handleVerifyOtp(req, res) {
  const { email, code } = req.body

  if (!email || !code) {
    return res
      .status(400)
      .send({ message: 'Email và mã xác minh là bắt buộc.' })
  }

  try {
    const data = await authService.verifyOtp(email, code)

    // Trả về token cho frontend để chuyển sang bước đặt lại mật khẩu
    res.status(200).send({
      message: 'Xác minh thành công. Vui lòng tiếp tục đặt lại mật khẩu.',
      data
    })
  } catch (error) {
    console.error('Lỗi khi xác minh OTP:', error.message)
    // Trả về lỗi 400 cho các lỗi nghiệp vụ (mã sai, hết hạn)
    res.status(400).send({ message: error.message })
  }
}

/**
 * POST /api/auth/reset-password
 */
async function handleResetPassword(req, res) {
  const { token, newPassword } = req.body

  if (!token || !newPassword) {
    return res.status(400).send({ message: 'Thiếu token hoặc mật khẩu mới.' })
  }

  try {
    await authService.resetPassword(token, newPassword)

    res
      .status(200)
      .send({ message: 'Mật khẩu của bạn đã được cập nhật thành công.' })
  } catch (error) {
    console.error('Lỗi khi đặt lại mật khẩu:', error.message)
    // Trả về lỗi 403 cho các lỗi liên quan đến token (hết hạn, không hợp lệ)
    res.status(403).send({ message: error.message })
  }
}

export const authController = {
  register,
  login,
  me,
  handlePasswordResetRequest,
  handleVerifyOtp,
  handleResetPassword
}
