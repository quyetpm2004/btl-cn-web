import { useState } from 'react'
import VerificationCodeInput from './VerificationCodeInput'
import { forgotPasswordApi } from '@/services/api'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

// Giả định các lớp CSS được sử dụng là của Tailwind CSS
function ForgotPassword() {
  const [step, setStep] = useState('request') // 'request' | 'verify' | 'reset_link_sent'
  const [email, setEmail] = useState('') // Email đang được nhập
  const [targetEmail, setTargetEmail] = useState('') // Email đã gửi yêu cầu thành công
  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email)
  // State cho bước 'request'
  const [requestMessage, setRequestMessage] = useState('')
  const [requestError, setRequestError] = useState('')
  const [requestIsLoading, setRequestIsLoading] = useState(false)
  const navigate = useNavigate()
  // --- Chức năng chuyển đổi luồng ---
  const handleRequestSuccess = (submittedEmail) => {
    console.log('Request success for email:', submittedEmail)
    setTargetEmail(submittedEmail)
    setStep('verify')
  }

  const handleVerificationSuccess = (email, token) => {
    setStep('reset_link_sent')
    navigate(
      `/reset-password?token=${encodeURIComponent(token)}&email=${encodeURIComponent(email)}`
    )
  }

  const handleBackToRequest = () => {
    setStep('request')
    setRequestMessage('')
    setRequestError('')
  }

  // --- Xử lý gửi yêu cầu quên mật khẩu (Bước 1) ---
  const submitRequest = async () => {
    setRequestMessage('')
    setRequestError('')

    if (!email) {
      setRequestError('Vui lòng nhập địa chỉ email của bạn.')
      return
    }

    if (!isValidEmail(email)) {
      setRequestError('Địa chỉ email không hợp lệ.')
      return
    }

    setRequestIsLoading(true)

    try {
      const res = await forgotPasswordApi(email)
      if (res.data) {
        toast.success(res.data.message)
        handleRequestSuccess(email)
      } else {
        toast.error('Email không tồn tại trong hệ thống')
      }
    } catch (err) {
      console.log('err', err)
      toast.error('Email không tồn tại trong hệ thống')
    } finally {
      setRequestIsLoading(false)
    }
  }

  // --- Conditional Rendering ---

  if (step === 'verify') {
    return (
      <div className="relative min-h-screen w-full overflow-hidden">
        <div
          className="absolute inset-0 z-0 scale-105 transform"
          style={{
            backgroundImage: 'url(/images/bg-auth.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(8px)'
          }}
        />
        <div className="absolute inset-0 z-0 bg-black/40" />
        <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
          <VerificationCodeInput
            email={targetEmail}
            onVerificationSuccess={handleVerificationSuccess}
            onBack={handleBackToRequest}
          />
        </div>
      </div>
    )
  }

  if (step === 'reset_link_sent') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
        <div className="w-full max-w-md space-y-6 rounded-xl bg-white p-8 text-center shadow-2xl">
          <h2 className="text-3xl font-extrabold text-green-600">
            Thành công!
          </h2>
          <p className="text-gray-700">
            Tài khoản của bạn đã được xác minh. Vui lòng kiểm tra email một lần
            nữa để nhận liên kết đặt lại mật khẩu cuối cùng.
          </p>
          <p className="text-sm text-gray-500">
            (Trong môi trường thực tế, bước này sẽ là giao diện nhập mật khẩu
            mới)
          </p>
          <a
            href="/auth/login"
            className="mt-4 block font-medium text-indigo-600 hover:text-indigo-500">
            Quay lại
          </a>
        </div>
      </div>
    )
  }

  // Mặc định: step === 'request'
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 z-0 scale-105 transform"
        style={{
          backgroundImage: 'url(/images/bg-auth.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(8px)'
        }}
      />
      <div className="absolute inset-0 z-0 bg-black/40" />
      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6 rounded-xl bg-white p-8 shadow-2xl">
          {/* Tiêu đề và Mô tả */}
          <h2 className="text-center text-3xl font-semibold text-gray-900">
            Quên mật khẩu?
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Đừng lo lắng! Nhập email của bạn để chúng tôi gửi liên kết đặt lại
            mật khẩu.
          </p>

          {/* Hiển thị thông báo Lỗi hoặc Thành công */}
          {requestError && (
            <div
              className="rounded-lg bg-red-100 p-3 text-sm text-red-700"
              role="alert">
              {requestError}
            </div>
          )}
          {requestMessage && (
            <div
              className="rounded-lg bg-green-100 p-3 text-sm text-green-700"
              role="alert">
              {requestMessage}
            </div>
          )}

          {/* Form nhập liệu */}
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700">
                Địa chỉ Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm"
                  placeholder="vd: tenban@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={requestIsLoading} // Vô hiệu hóa khi đang tải
                />
              </div>
            </div>

            {/* Nút Gửi */}
            <button
              onClick={submitRequest}
              disabled={requestIsLoading}
              className={`flex w-full cursor-pointer justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm ${
                requestIsLoading
                  ? 'cursor-not-allowed bg-indigo-400'
                  : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none'
              }`}>
              {requestIsLoading ? (
                <>
                  <svg
                    className="mr-3 -ml-1 h-5 w-5 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Đang gửi...
                </>
              ) : (
                'Gửi yêu cầu đặt lại mật khẩu'
              )}
            </button>
          </div>

          {/* Liên kết quay lại trang Đăng nhập */}
          <div className="text-center">
            <a
              href="/auth/login"
              className="font-medium text-indigo-600 hover:text-indigo-500">
              Quay lại
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
