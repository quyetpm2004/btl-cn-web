import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { verifyOtpApi } from '@/services/api'
import { toast } from 'sonner'

// Giả định thời gian chờ gửi lại mã (tính bằng giây)
const RESEND_TIME_LIMIT = 300

function VerificationCodeInput({ email, onVerificationSuccess, onBack }) {
  const [otp, setOtp] = useState(new Array(6).fill('')) // Mã OTP 6 chữ số
  const [timeLeft, setTimeLeft] = useState(RESEND_TIME_LIMIT)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const inputRefs = useRef([]) // Refs để quản lý focus giữa các ô nhập

  // --- 1. Xử lý đồng hồ đếm ngược ---
  useEffect(() => {
    let timer = null
    if (timeLeft > 0 && !isLoading) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      clearInterval(timer)
    }
    return () => clearInterval(timer)
  }, [timeLeft, isLoading])

  // --- 2. Xử lý nhập mã OTP ---
  const handleOtpChange = (e, index) => {
    const value = e.target.value
    if (/[^0-9]/.test(value) && value !== '') return // Chỉ cho phép nhập số

    const newOtp = [...otp]
    newOtp[index] = value.slice(-1) // Chỉ lấy ký tự cuối cùng (nếu dán)
    setOtp(newOtp)

    // Tự động chuyển focus
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  // Xử lý khi nhấn Backspace
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  // --- 3. Gửi Mã Xác Minh ---
  const handleVerify = async () => {
    const verificationCode = otp.join('')
    setError('')

    if (verificationCode.length !== 6) {
      setError('Mã xác minh phải có đủ 6 chữ số.')
      return
    }

    setIsLoading(true)

    try {
      // Gọi API để xác minh mã
      // await axios.post('/api/auth/verify-otp', {
      //   email: email, // Giả định component nhận email từ prop
      //   code: verificationCode
      // })

      const res = await verifyOtpApi(email, verificationCode)
      if (res.data) {
        toast.success(res.data.message)
        onVerificationSuccess(email, res.data.data)
      } else {
        toast.error('Mã xác minh không hợp lệ hoặc đã hết hạn.')
      }

      // Nếu thành công, chuyển sang bước tiếp theo (ví dụ: đặt lại mật khẩu)
    } catch (err) {
      const serverError =
        err.response?.data?.message ||
        'Mã xác minh không hợp lệ hoặc đã hết hạn.'
      setError(`❌ Lỗi: ${serverError}`)
    } finally {
      setIsLoading(false)
    }
  }

  // --- 4. Gửi Lại Mã Xác Minh ---
  const handleResend = async () => {
    if (timeLeft > 0) return // Chỉ cho phép gửi lại khi đếm ngược = 0

    setError('')
    setIsLoading(true)

    try {
      // Gọi lại API gửi yêu cầu quên mật khẩu (hoặc API chuyên gửi lại mã)
      await axios.post('/api/auth/resend-otp', { email })

      // Đặt lại đồng hồ đếm ngược và xóa mã cũ
      setTimeLeft(RESEND_TIME_LIMIT)
      setOtp(new Array(6).fill(''))
      setError('')
    } catch (err) {
      const serverError =
        err.response?.data?.message || 'Không thể gửi lại mã. Vui lòng thử lại.'
      setError(`❌ Lỗi: ${serverError}`)
      setTimeLeft(0) // Giữ thời gian là 0 nếu gửi lại thất bại
    } finally {
      setIsLoading(false)
    }
  }

  // --- Giao diện ---
  return (
    <div className="w-full max-w-md space-y-6 rounded-xl bg-white p-8 shadow-2xl">
      <h2 className="text-center text-3xl font-semibold text-gray-900">
        Nhập Mã Xác Minh
      </h2>
      <p className="mt-2 text-center text-sm text-gray-600">
        Chúng tôi đã gửi mã xác minh gồm 6 chữ số tới email/số điện thoại của
        bạn.
      </p>

      {error && (
        <div
          className="rounded-lg bg-red-100 p-3 text-sm text-red-700"
          role="alert">
          {error}
        </div>
      )}

      {/* Ô Nhập Mã OTP */}
      <div className="flex justify-center space-x-2">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            inputMode="numeric"
            maxLength="1"
            value={digit}
            onChange={(e) => handleOtpChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="h-12 w-12 rounded-lg border-2 border-gray-300 text-center text-2xl transition duration-150 ease-in-out focus:border-indigo-500 focus:ring-indigo-500"
            disabled={isLoading}
          />
        ))}
      </div>

      {/* Nút Xác Minh */}
      <button
        onClick={handleVerify}
        disabled={isLoading || otp.join('').length !== 6}
        className={`flex w-full cursor-pointer justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm ${
          isLoading
            ? 'cursor-not-allowed bg-indigo-400'
            : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none'
        }`}>
        {isLoading ? 'Đang xác minh...' : 'Xác Minh'}
      </button>

      {/* Đếm ngược và Gửi lại mã */}
      <div className="text-center text-sm">
        {timeLeft > 0 ? (
          <p className="text-gray-500">
            Bạn có thể gửi lại mã sau:{' '}
            <span className="font-bold text-indigo-600">{timeLeft}s</span>
          </p>
        ) : (
          <button
            onClick={handleResend}
            disabled={isLoading}
            className={`font-medium ${
              isLoading
                ? 'cursor-not-allowed text-gray-400'
                : 'text-indigo-600 hover:text-indigo-500'
            }`}>
            Gửi lại mã
          </button>
        )}
      </div>

      {/* Liên kết quay lại */}
      <div className="pt-2 text-center">
        <button
          onClick={onBack}
          className="text-sm text-gray-500 hover:cursor-pointer hover:text-gray-700">
          ← Quay lại
        </button>
      </div>
    </div>
  )
}

export default VerificationCodeInput
