import jwt from 'jsonwebtoken'

export const authMiddleware = (req, res, next) => {
  // Whitelist paths that do not require authentication
  const whitelists = ['/login', '/register']
  if (whitelists.find((path) => '/api-v1' + path === req.originalUrl))
    return next()

  try {
    const auth = req.headers['authorization'] || req.headers['Authorization']
    if (!auth || !auth.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Missing authentication token' })
    }
    const token = auth.substring('Bearer '.length)
    const payload = jwt.verify(token, process.env.JWT_SECRET)

    req.user = {
      id: payload.sub,
      username: payload.username,
      role_id: payload.role_id
    }
    return next()
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' })
  }
}
