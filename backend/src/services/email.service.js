import nodemailer from 'nodemailer'
import { emailConfig, adminEmail } from '../config/email.config.js'

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport(emailConfig)
  }

  async sendContactEmail(contactData) {
    const { name, phone, email, apartmentType, message } = contactData

    const mailOptions = {
      from: `"Luxury Residence" <${emailConfig.auth.user}>`,
      to: adminEmail,
      subject: `Liên hệ mới từ ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="color: #8b5cf6; text-align: center;">Thông Tin Liên Hệ Mới</h2>
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Họ và tên:</strong> ${name}</p>
            <p><strong>Số điện thoại:</strong> ${phone}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Loại căn hộ quan tâm:</strong> ${apartmentType}</p>
            <p><strong>Tin nhắn:</strong></p>
            <p style="background-color: white; padding: 15px; border-radius: 4px; border-left: 4px solid #8b5cf6;">${message || 'Không có tin nhắn'}</p>
          </div>
          <p style="color: #666; font-size: 12px; text-align: center; margin-top: 20px;">
            Email này được gửi tự động từ hệ thống Luxury Residence
          </p>
        </div>
      `
    }

    try {
      const info = await this.transporter.sendMail(mailOptions)
      console.log('Email sent: %s', info.messageId)
      return {
        success: true,
        messageId: info.messageId
      }
    } catch (error) {
      console.error('Error sending email:', error)
      throw error
    }
  }

  async sendConfirmationEmail(email, name) {
    const mailOptions = {
      from: `"Luxury Residence" <${emailConfig.auth.user}>`,
      to: email,
      subject: 'Cảm ơn bạn đã liên hệ với Luxury Residence',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="color: #8b5cf6; text-align: center;">Luxury Residence</h2>
          <p>Xin chào <strong>${name}</strong>,</p>
          <p>Cảm ơn bạn đã quan tâm đến dự án Luxury Residence của chúng tôi!</p>
          <p>Chúng tôi đã nhận được thông tin liên hệ của bạn và sẽ phản hồi trong thời gian sớm nhất.</p>
          
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #8b5cf6;">Thông Tin Liên Hệ</h3>
            <p>📞 <strong>Hotline:</strong> 1900 1234</p>
            <p>✉️ <strong>Email:</strong> info@luxuryresidence.vn</p>
            <p>📍 <strong>Địa chỉ:</strong> P. Linh Đường, Hoàng Liệt, Hoàng Mai, Hà Nội 100000</p>
            <p>🕒 <strong>Giờ làm việc:</strong> 8:00 - 22:00 (Hàng ngày)</p>
          </div>
          
          <p>Trân trọng,<br><strong>Đội ngũ Luxury Residence</strong></p>
          
          <p style="color: #666; font-size: 12px; text-align: center; margin-top: 20px;">
            Email này được gửi tự động từ hệ thống Luxury Residence
          </p>
        </div>
      `
    }

    try {
      const info = await this.transporter.sendMail(mailOptions)
      console.log('Confirmation email sent: %s', info.messageId)
      return {
        success: true,
        messageId: info.messageId
      }
    } catch (error) {
      console.error('Error sending confirmation email:', error)
      // Không throw error vì email xác nhận là optional
      return {
        success: false,
        error: error.message
      }
    }
  }

  async sendForgotPasswordCode({ email, code }) {
    if (!email || typeof email !== 'string') {
      throw new Error(`Email không hợp lệ: ${email}`)
    }

    const mailOptions = {
      from: `"Luxury Residence" <${emailConfig.auth.user}>`,
      to: email.trim(), // ✅ tránh email rỗng do space
      subject: 'Mã xác nhận đặt lại mật khẩu',
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
        <h2 style="color: #8b5cf6; text-align: center;">
          Đặt lại mật khẩu
        </h2>

        <p>Xin chào,</p>
        <p>Bạn đã yêu cầu đặt lại mật khẩu cho tài khoản tại <strong>Luxury Residence</strong>.</p>

        <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
          <p style="font-size: 14px; color: #555;">Mã xác nhận của bạn là:</p>
          <p style="font-size: 32px; font-weight: bold; color: #8b5cf6; letter-spacing: 4px;">
            ${code}
          </p>
          <p style="font-size: 13px; color: #666;">
            Mã có hiệu lực trong <strong>5 phút</strong>
          </p>
        </div>

        <p style="color: #555;">
          Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.
        </p>

        <p style="color: #666; font-size: 12px; text-align: center; margin-top: 30px;">
          Email này được gửi tự động từ hệ thống Luxury Residence
        </p>
      </div>
    `
    }

    try {
      console.log('📧 Sending forgot-password mail to:', email)
      const info = await this.transporter.sendMail(mailOptions)
      console.log('✅ Forgot password email sent:', info.messageId)
      return { success: true, messageId: info.messageId }
    } catch (error) {
      console.error('❌ Error sending forgot password email:', error)
      throw error
    }
  }
}

export default new EmailService()
