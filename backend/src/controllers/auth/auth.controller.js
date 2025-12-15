import { authService } from '@/services/auth/auth.service.js'
import { toHttpError } from '@/utils/errors.js'

async function register(req, res) {
  try {
    const result = await authService.registerService(req.body || {})
    return res.status(201).json({ message: 'Đăng ký thành công', ...result })
  } catch (err) {
    const http = toHttpError(err)
    return res.status(http.status).json(http.body)
  }
}

async function login(req, res) {
  try {
    const result = await authService.loginService(req.body || {})
    return res.status(200).json({ message: 'Đăng nhập thành công', ...result })
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
    return res
      .status(200)
      .json({ message: 'Lấy thông tin người dùng thành công', user })
  } catch (err) {
    const http = toHttpError(err)
    return res.status(http.status).json(http.body)
  }
}

export const authController = { register, login, me }
