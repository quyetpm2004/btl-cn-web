import { useEffect, useState } from 'react'
import { User, Lock, Building, Eye, EyeOff, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/stores/useAuthStore'
import { useNavigate, Link } from 'react-router'

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
    await login(username, password)
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

      <div className="relative z-10 flex min-h-screen items-center justify-center p-4 sm:p-8">
        <div className="animate-fade-in-up flex w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl lg:flex-row">
          {/* Left Column: Image and Promotional Content (Responsive) */}
          <div
            className="relative flex h-80 w-full flex-col justify-between p-6 text-white transition-all duration-300 lg:h-auto lg:w-5/12 lg:p-8"
            style={{
              backgroundImage: 'url(/images/login.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}>
            {/* Gradient overlay for better text contrast */}
            <div className="absolute inset-0 bg-linear-to-t from-gray-900/90 via-gray-900/20 to-transparent lg:rounded-none"></div>

            {/* Logo */}
            <div className="relative z-10 flex w-fit items-center space-x-2 rounded-full border border-white/10 bg-black/30 p-2 px-4 backdrop-blur-md">
              <Building className="h-5 w-5 text-white" />
              <span className="text-lg font-semibold tracking-wide">
                Luxury Residence
              </span>
            </div>

            {/* Bottom content */}
            <div className="relative z-10 mt-auto">
              <h2 className="mb-3 text-3xl leading-tight font-bold">
                Quản lý Chung cư <br /> Hiệu quả
              </h2>
              <p className="max-w-sm text-sm leading-relaxed opacity-90">
                Dễ dàng theo dõi thanh toán tiền thuê, yêu cầu bảo trì và giao
                tiếp với chung cư tại một nơi.
              </p>
            </div>
          </div>

          {/* Right Column: Login Form */}
          <div className="relative flex w-full flex-col justify-center p-6 sm:p-12 lg:w-7/12 lg:p-16">
            {/* Close Button */}
            <Link
              to="/"
              className="absolute top-4 right-4 rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600">
              <X className="h-6 w-6" />
            </Link>

            <h1 className="mt-8 text-3xl font-bold text-gray-900 lg:mt-0">
              Chào mừng trở lại!
            </h1>
            <p className="mt-2 mb-8 text-gray-500">
              Đăng nhập tài khoản của bạn
            </p>

            <form onSubmit={handleSubmit}>
              {/* Username Field */}
              <div className="mb-6">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Tài khoản
                </label>
                <div className="group relative">
                  <User className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400 transition-colors group-focus-within:text-blue-500" />
                  <input
                    placeholder="Vui lòng nhập tài khoản"
                    type="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 transition duration-150 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="mb-2">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Mật khẩu
                </label>
                <div className="group relative">
                  <Lock className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400 transition-colors group-focus-within:text-blue-500" />
                  <input
                    placeholder="Vui lòng nhập mật khẩu"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 py-3 pr-10 pl-10 transition duration-150 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    required
                  />
                  <Button
                    variant="icon"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-1/2 right-2 h-8 w-8 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <Link
                to="/forgot-password"
                className="float-right mb-2"
                style={{ fontSize: 14, color: '#1976d2' }}>
                Quên mật khẩu?
              </Link>

              {/* Login Button */}
              <Button
                type="submit"
                variant="blue"
                className="mt-4 h-11 w-full py-3 text-lg">
                Đăng nhập
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
