class AppError extends Error {
  constructor(status, message, extras) {
    super(message)
    this.status = status
    this.extras = extras
    this.name = 'AppError'
  }
}

const toHttpError = (err) => {
  if (err && err.name === 'AppError') {
    return {
      status: err.status || 400,
      body: {
        error: err.message,
        ...(err.extras ? { details: err.extras } : {})
      }
    }
  }

  return { status: 500, body: { error: 'Server error', details: err?.message } }
}

export { AppError, toHttpError }
