const formatZodError = (error) =>
  error.issues?.map((e) => ({
    path: Array.isArray(e.path) ? e.path.join('.') : '',
    message: e.message
  })) || [{ message: 'Invalid payload' }]

export function validateBody(schema) {
  return (req, res, next) => {
    try {
      req.body = schema.parse(req.body)
      next()
    } catch (err) {
      const details = formatZodError(err)
      res.status(400).json({
        error: 'Validation Error',
        details
      })
    }
  }
}

export function validateParams(schema) {
  return (req, res, next) => {
    try {
      req.params = schema.parse(req.params)
      next()
    } catch (err) {
      const details = formatZodError(err)
      res.status(400).json({
        error: 'Validation Error',
        details
      })
    }
  }
}
