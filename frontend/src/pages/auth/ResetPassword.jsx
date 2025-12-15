import React, { useState, useEffect } from 'react'
import { resetPasswordApi } from '@/services/api'
import { toast } from 'sonner'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '../../components/ui/button'

/**
 * Hook để lấy giá trị tham số truy vấn (query parameter) từ URL.
 * Extracts 'token' from URL: /reset-password?token=XYZ
 */
const useQuery = () => {
  // Trả về đối tượng URLSearchParams để dễ dàng truy cập các tham số
  if (typeof window !== 'undefined') {
    return new URLSearchParams(window.location.search)
  }
  return new URLSearchParams() // Trả về rỗng nếu không phải môi trường trình duyệt
}

function ResetPassword() {
  const query = useQuery()
  // Lấy token từ URL param khi component mount
  const initialToken = query.get('token')

  // Token được lưu trong state để có thể thay đổi (ví dụ: bị xóa nếu hết hạn)
  const [token, setToken] = useState(initialToken)

  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isResetComplete, setIsResetComplete] = useState(false)

  // Kiểm tra token ban đầu
  useEffect(() => {
    if (!initialToken) {
      setError(
        '❌ Lỗi: Không tìm thấy token đặt lại mật khẩu trong URL. Vui lòng thử lại quy trình khôi phục.'
      )
    }
  }, [initialToken])

  const handleReset = async () => {
    setError('')
    setMessage('')

    if (!token) {
      toast.error('Token đặt lại mật khẩu bị thiếu. Vui lòng bắt đầu lại.')
      return
    }

    if (newPassword !== confirmPassword) {
      toast.error('Mật khẩu mới và mật khẩu xác nhận không khớp.')
      return
    }

    setIsLoading(true)

    try {
      //   await axios.post('/api/auth/reset-password', {
      //     token: token, // Sử dụng token từ state
      //     newPassword: newPassword
      //   })

      const res = await resetPasswordApi(token, newPassword)
      if (res.data) {
        toast.success(res.data.message)
        setMessage('Mật khẩu của bạn đã được đặt lại thành công!')
        setIsResetComplete(true)
        setNewPassword('')
        setConfirmPassword('')
      } else {
        toast.error('Đặt lại mật khẩu không thành công. Vui lòng thử lại.')
      }
    } catch (err) {
      // Xử lý lỗi từ server (ví dụ: token hết hạn, không hợp lệ)
      const serverError =
        err.response?.data?.message ||
        'Đã xảy ra lỗi không xác định khi đặt lại mật khẩu.'
      setError(`❌ Lỗi: ${serverError}`)

      // Nếu token bị vô hiệu hóa/hết hạn, xóa token khỏi state để vô hiệu hóa form
      if (
        serverError.includes('hết hạn') ||
        serverError.includes('không hợp lệ')
      ) {
        setToken(null)
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Xác định trạng thái token (dựa trên state)
  const isTokenValid = !!token

  // Giao diện khi đặt lại thành công
  if (isResetComplete) {
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
          <div className="w-full max-w-md space-y-6 rounded-xl bg-white p-8 text-center shadow-2xl">
            <h2 className="font-semibold text-green-600">Thành công!</h2>
            <p className="text-gray-700">
              {message} Bây giờ bạn có thể đăng nhập bằng mật khẩu mới của mình.
            </p>
            <a
              href="/auth/login"
              className="flex w-full cursor-pointer justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none">
              Đăng nhập ngay
            </a>
          </div>
        </div>
      </div>
    )
  }

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
          <h2 className="text-center text-3xl font-semibold text-gray-900">
            Đặt Lại Mật Khẩu
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Vui lòng nhập mật khẩu mới của bạn.
          </p>

          {/* Hiển thị thông báo Lỗi */}
          {error && (
            <div
              className="rounded-lg bg-red-100 p-3 text-sm text-red-700"
              role="alert">
              {error}
            </div>
          )}

          {/* Chỉ hiển thị form nếu có token */}
          {!isTokenValid ? (
            <div className="rounded-lg border border-gray-300 p-4 text-center text-gray-600">
              Token không hợp lệ hoặc đã bị vô hiệu hóa. Vui lòng bắt đầu lại
              quy trình khôi phục mật khẩu.
              <a
                href="/forgot-password"
                className="mt-2 block font-medium text-indigo-600 hover:text-indigo-500">
                Quay lại trang Quên mật khẩu
              </a>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Mật khẩu mới */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700">
                  Mật khẩu mới (Tối thiểu 8 ký tự)
                </label>
                <div className="relative mt-1">
                  <input
                    id="password"
                    name="password"
                    type={showNewPassword ? 'text' : 'password'}
                    required
                    className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 pr-10 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    disabled={isLoading}
                  />
                  <Button
                    variant="icon"
                    type="button"
                    className="absolute top-0 right-0 h-9.5 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowNewPassword(!showNewPassword)}>
                    {showNewPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Xác nhận mật khẩu mới */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700">
                  Xác nhận Mật khẩu mới
                </label>
                <div className="relative mt-1">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 pr-10 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={isLoading}
                  />
                  <Button
                    variant="icon"
                    type="button"
                    className="absolute top-0 right-0 h-9.5 text-gray-500 hover:text-gray-700"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }>
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Nút Đặt lại */}
              <button
                onClick={handleReset}
                className={`flex w-full cursor-pointer justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm ${
                  isLoading
                    ? 'cursor-not-allowed bg-indigo-400'
                    : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none'
                }`}>
                {isLoading ? (
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
                    Đang đặt lại...
                  </>
                ) : (
                  'Đặt Lại Mật Khẩu'
                )}
              </button>
            </div>
          )}

          <div className="pt-2 text-center">
            <a
              href="/auth/login"
              className="font-medium text-gray-500 hover:text-gray-700">
              Quay lại trang Đăng nhập
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
