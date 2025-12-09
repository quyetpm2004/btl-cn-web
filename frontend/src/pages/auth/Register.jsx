import { useState } from 'react'
import { useAuthStore } from '../../stores/useAuthStore'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'

export const Register = () => {
  const navigate = useNavigate()
  const { register } = useAuthStore()

  const [fullName, setFullName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [apartmentCode, setApartmentCode] = useState('')
  const [password, setPassword] = useState('')

  const handleRegister = async (e) => {
    e.preventDefault()

    try {
      await register(username, password, fullName, email, phone, apartmentCode)
      navigate('/auth/login')
    } catch (error) {
      console.error('Registration error:', error)
      toast.error('Đăng ký thất bại, vui lòng thử lại.')
    }
  }

  return (
    <form id="registerForm" onSubmit={handleRegister} className="space-y-6">
      <div>
        <label className="mb-2 block text-sm font-medium text-white">
          Họ và tên
        </label>
        <input
          type="text"
          className="input-glow focus:border-primary-500 w-full rounded-lg border border-white px-4 py-3 text-white transition-all duration-300 hover:-translate-y-0.5 focus:outline-none"
          placeholder="Nhập họ và tên"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-white">
          Tên đăng nhập
        </label>
        <input
          type="text"
          className="input-glow focus:border-primary-500 w-full rounded-lg border border-white px-4 py-3 text-white transition-all duration-300 hover:-translate-y-0.5 focus:outline-none"
          placeholder="Nhập username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-white">
          Email
        </label>
        <input
          type="email"
          className="input-glow focus:border-primary-500 w-full rounded-lg border border-white px-4 py-3 text-white transition-all duration-300 hover:-translate-y-0.5 focus:outline-none"
          placeholder="Nhập email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-white">
          Số điện thoại
        </label>
        <input
          type="tel"
          className="input-glow focus:border-primary-500 w-full rounded-lg border border-white px-4 py-3 text-white transition-all duration-300 hover:-translate-y-0.5 focus:outline-none"
          placeholder="Nhập số điện thoại"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-white">
          Mã căn hộ
        </label>
        <input
          type="text"
          className="input-glow focus:border-primary-500 w-full rounded-lg border border-white px-4 py-3 text-white transition-all duration-300 hover:-translate-y-0.5 focus:outline-none"
          placeholder="VD: A101"
          value={apartmentCode}
          onChange={(e) => setApartmentCode(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-white">
          Mật khẩu
        </label>
        <input
          type="password"
          className="input-glow focus:border-primary-500 w-full rounded-lg border border-white px-4 py-3 text-white transition-all duration-300 hover:-translate-y-0.5 focus:outline-none"
          placeholder="Nhập mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className="btn-glow w-full rounded-lg bg-purple-600 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 active:scale-95">
        Đăng Ký
      </button>
    </form>
  )
}
