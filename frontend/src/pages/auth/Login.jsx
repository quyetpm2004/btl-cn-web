export const Login = () => {
  return (
    <form id="loginForm" className="space-y-6">
      <div>
        <label
          for="loginEmail"
          className="mb-2 block text-sm font-medium text-white">
          Email hoặc Số điện thoại
        </label>
        <input
          type="text"
          id="loginEmail"
          className="input-glow focus:border-primary-500 w-full rounded-lg border border-gray-300 px-4 py-3 text-white transition-all duration-300 hover:-translate-y-0.5 focus:outline-none"
          placeholder="Nhập email hoặc số điện thoại"
          name="username"
          required
        />
      </div>

      <div>
        <label
          for="loginPassword"
          className="mb-2 block text-sm font-medium text-white">
          Mật khẩu
        </label>
        <input
          type="password"
          id="loginPassword"
          className="input-glow focus:border-primary-500 w-full rounded-lg border border-gray-300 px-4 py-3 text-white transition-all duration-300 hover:-translate-y-0.5 focus:outline-none"
          placeholder="Nhập mật khẩu"
          name="password"
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
        className="btn-glow w-full rounded-lg bg-purple-600 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 active:scale-95">
        Đăng Nhập
      </button>
    </form>
  )
}
