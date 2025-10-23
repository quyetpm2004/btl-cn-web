export const Login = () => {
  return (
    <form id="loginForm" className="space-y-6">
      <div>
        <label
          for="loginEmail"
          className="mb-2 block text-sm font-medium text-gray-700">
          Email hoặc Số điện thoại
        </label>
        <input
          type="text"
          id="loginEmail"
          className="input-glow focus:border-primary-500 w-full rounded-lg border border-gray-300 px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 focus:outline-none"
          placeholder="Nhập email hoặc số điện thoại"
          required
        />
      </div>

      <div>
        <label
          for="loginPassword"
          className="mb-2 block text-sm font-medium text-gray-700">
          Mật khẩu
        </label>
        <input
          type="password"
          id="loginPassword"
          className="input-glow focus:border-primary-500 w-full rounded-lg border border-gray-300 px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 focus:outline-none"
          placeholder="Nhập mật khẩu"
          required
        />
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
          />
          <span className="ml-2 text-sm text-gray-600">Ghi nhớ đăng nhập</span>
        </label>
        <a
          href="#"
          className="text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors">
          Quên mật khẩu?
        </a>
      </div>

      <button
        type="submit"
        className="btn-glow w-full rounded-lg bg-purple-600 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 active:scale-95">
        Đăng Nhập
      </button>
    </form>
  )
}
