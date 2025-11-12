import { useState } from 'react'
import { useAuthStore } from '../../stores/useAuthStore'
import { useNavigate } from 'react-router'

export const Login = () => {
  const navigate = useNavigate()
  const { user, login, accessToken } = useAuthStore()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    // Xử lý đăng nhập ở đây

    try {
      await login(username, password)
      navigate('/admin')
    } catch (error) {
      console.error('Login error:', error)
    }
  }

  return (
    <form id="loginForm" className="space-y-6">
      <div>
        <label className="mb-2 block text-sm font-medium text-white">
          Email hoặc Số điện thoại
        </label>
        <input
          type="text"
          id="loginEmail"
          className="input-glow focus:border-primary-500 w-full rounded-lg border border-gray-300 px-4 py-3 text-white transition-all duration-300 hover:-translate-y-0.5 focus:outline-none"
          placeholder="Nhập email hoặc số điện thoại"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-white">
          Mật khẩu
        </label>
        <input
          type="password"
          id="loginPassword"
          className="input-glow focus:border-primary-500 w-full rounded-lg border border-gray-300 px-4 py-3 text-white transition-all duration-300 hover:-translate-y-0.5 focus:outline-none"
          placeholder="Nhập mật khẩu"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center"></label>
        <a
          href="#"
          className="text-primary-600 hover:text-primary-700 text-sm font-medium text-white transition-colors">
          Quên mật khẩu?
        </a>
      </div>

      <button
        type="submit"
        onClick={handleLogin}
        className="btn-glow w-full rounded-lg bg-purple-600 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 active:scale-95">
        Đăng Nhập
      </button>
    </form>
  )
}
