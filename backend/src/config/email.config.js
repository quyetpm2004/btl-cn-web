import dotenv from 'dotenv'
dotenv.config()

export const emailConfig = {
  service: process.env.EMAIL_SERVICE || 'gmail',
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: process.env.EMAIL_PORT || 587,
  secure: process.env.EMAIL_PORT == 587 ? false : true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
}

export const adminEmail = process.env.ADMIN_EMAIL || 'admin1@gmail.com'
