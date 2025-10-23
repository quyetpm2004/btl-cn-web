export const Register = () => {
  return (
    <form id="registerForm" className="space-y-6">
      <div>
        <label
          for="registerName"
          className="mb-2 block text-sm font-medium text-gray-700">
          Họ và tên
        </label>
        <input
          type="text"
          id="registerName"
          className="input-glow focus:border-primary-500 w-full rounded-lg border border-gray-300 px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 focus:outline-none"
          placeholder="Nhập họ và tên"
          required
        />
      </div>

      <div>
        <label
          for="registerEmail"
          className="mb-2 block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="registerEmail"
          className="input-glow focus:border-primary-500 w-full rounded-lg border border-gray-300 px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 focus:outline-none"
          placeholder="Nhập email"
          required
        />
      </div>

      <div>
        <label
          for="registerPhone"
          className="mb-2 block text-sm font-medium text-gray-700">
          Số điện thoại
        </label>
        <input
          type="tel"
          id="registerPhone"
          className="input-glow focus:border-primary-500 w-full rounded-lg border border-gray-300 px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 focus:outline-none"
          placeholder="Nhập số điện thoại"
          required
        />
      </div>

      <div>
        <label
          for="registerApartment"
          className="mb-2 block text-sm font-medium text-gray-700">
          Mã căn hộ
        </label>
        <input
          type="text"
          id="registerApartment"
          className="input-glow focus:border-primary-500 w-full rounded-lg border border-gray-300 px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 focus:outline-none"
          placeholder="VD: A-1201"
          required
        />
      </div>

      <div>
        <label
          for="registerPassword"
          className="mb-2 block text-sm font-medium text-gray-700">
          Mật khẩu
        </label>
        <input
          type="password"
          id="registerPassword"
          className="input-glow focus:border-primary-500 w-full rounded-lg border border-gray-300 px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 focus:outline-none"
          placeholder="Nhập mật khẩu"
          required
        />
      </div>

      <div>
        <label
          for="registerConfirmPassword"
          className="mb-2 block text-sm font-medium text-gray-700">
          Xác nhận mật khẩu
        </label>
        <input
          type="password"
          id="registerConfirmPassword"
          className="input-glow focus:border-primary-500 w-full rounded-lg border border-gray-300 px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 focus:outline-none"
          placeholder="Nhập lại mật khẩu"
          required
        />
      </div>

      <label className="flex items-start">
        <input
          type="checkbox"
          className="text-primary-600 focus:ring-primary-500 mt-1 h-4 w-4 rounded border-gray-300"
          required
        />
        <span className="ml-2 text-sm text-gray-600">
          Tôi đồng ý với
          <a
            href="#"
            className="text-primary-600 hover:text-primary-700 font-medium transition-colors">
            Điều khoản sử dụng
          </a>
          và
          <a
            href="#"
            className="text-primary-600 hover:text-primary-700 font-medium transition-colors">
            Chính sách bảo mật
          </a>
        </span>
      </label>

      <button
        type="submit"
        className="btn-glow w-full rounded-lg bg-purple-600 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 active:scale-95">
        Đăng Ký
      </button>
    </form>
  )
}
