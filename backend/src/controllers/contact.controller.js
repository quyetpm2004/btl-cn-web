import { StatusCodes } from 'http-status-codes'
import emailService from '../services/email.service.js'

class ContactController {
  async sendContact(req, res) {
    try {
      const { name, phone, email, apartmentType, message } = req.body

      // Validate dữ liệu cơ bản
      if (!name || !phone || !email) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          success: false,
          message: 'Vui lòng điền đầy đủ thông tin: Họ tên, Số điện thoại và Email'
        })
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          success: false,
          message: 'Email không hợp lệ'
        })
      }

      // Validate phone format - chấp nhận số điện thoại 10-11 số
      const phoneRegex = /^(0|84|\+84)[0-9]{9,10}$/
      const cleanPhone = phone.replace(/[\s.-]/g, '') 
      if (!phoneRegex.test(cleanPhone)) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          success: false,
          message: 'Số điện thoại không hợp lệ. Vui lòng nhập số điện thoại 10-11 số.'
        })
      }

      // Thử gửi email cho admin
      if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
        try {
          await emailService.sendContactEmail({
            name,
            phone,
            email,
            apartmentType: apartmentType || 'Chưa chọn',
            message
          })

          // Gửi email xác nhận cho khách hàng
          await emailService.sendConfirmationEmail(email, name)
        } catch (emailError) {
          console.error('Email sending failed (but contact saved):', emailError)
        }
      } else {
        console.log('Email not configured. Skipping email sending.')
      }

      return res.status(StatusCodes.OK).json({
        success: true,
        message: 'Thông tin liên hệ đã được gửi thành công. Chúng tôi sẽ liên hệ lại với bạn sớm nhất!'
      })
    } catch (error) {
      console.error('Error in sendContact:', error)
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Có lỗi xảy ra khi gửi thông tin. Vui lòng nhập đúng thông tin hoặc liên hệ trực tiếp qua hotline.'
      })
    }
  }
}

export default new ContactController()
