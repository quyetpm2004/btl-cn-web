import { authService } from '@/services/auth/auth.service.js'
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

export const authController = { register, login, me }
