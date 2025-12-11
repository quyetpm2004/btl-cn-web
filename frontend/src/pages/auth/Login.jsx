import React, { useEffect, useState } from 'react'
import { User, Lock, Building, LogIn, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/stores/useAuthStore'
import { toast } from 'sonner'
import { useNavigate } from 'react-router'
// Component chính
export const Login = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const { user, login, accessToken } = useAuthStore()

  useEffect(() => {
    if (accessToken && user) {
      if (user.role_name === 'Resident') {
        navigate('/user')
      } else {
        navigate('/admin')
      }
    }
  }, [accessToken, user, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await login(username, password)
    if (res.data) {
      toast.success('Đăng nhập thành công')
    } else {
      toast.error('Có lỗi xảy ra')
    }
    // Add login logic here
  }

  // Placeholder URL for background image

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4 sm:p-8">
      <div className="flex w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl lg:flex-row">
        {/* Left Column: Image and Promotional Content (Responsive) */}
        <div
          className="relative flex h-80 w-full flex-col justify-between p-6 text-white transition-all duration-300 lg:h-auto lg:w-5/12 lg:p-8"
          style={{
            backgroundImage: 'url(/images/login.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}>
          {/* Gradient overlay for better text contrast */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-gray-900/80 via-gray-900/10 to-transparent"></div>

          {/* Logo */}
          <div className="relative z-10 flex w-fit items-center space-x-2 rounded-full bg-black/30 p-2 backdrop-blur-sm">
            <Building className="h-5 w-5 text-white" />
            <span className="text-lg font-semibold">Luxury Residence</span>
          </div>

          {/* Bottom content */}
          <div className="relative z-10">
            <h2 className="mb-3 text-3xl font-bold">
              Quản lý Chung cư Hiệu quả
            </h2>
            <p className="text-sm opacity-90">
              Dễ dàng theo dõi thanh toán tiền thuê, yêu cầu bảo trì và giao
              tiếp với chung cư tại một nơi.
            </p>
          </div>
        </div>

        {/* Right Column: Login Form */}
        <div className="relative flex w-full flex-col justify-center p-6 sm:p-12 lg:w-7/12 lg:p-16">
          {/* Login Button (Top right corner) - Kept for visual consistency with the original image */}

          <h1 className="mt-8 text-3xl font-bold text-gray-900 lg:mt-0">
            Chào mừng trở lại!
          </h1>
          <p className="mb-8 text-gray-500">Đăng nhập tài khoản của bạn</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* username Field */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Tài khoản
              </label>
              <div className="relative">
                <User className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                <input
                  type="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 py-2 pr-4 pl-10 transition duration-150 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Mật khẩu
              </label>
              <div className="relative">
                <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 py-2 pr-10 pl-10 transition duration-150 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 transform p-1 text-gray-400 hover:text-gray-600">
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              variant="blue"
              className="mt-8 w-full py-3 text-lg">
              Đăng nhập
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
