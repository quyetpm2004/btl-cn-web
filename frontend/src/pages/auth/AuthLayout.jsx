import { Link, Outlet } from 'react-router'

export const AuthLayout = () => {
  return (
    <div className="gradient-primary min-h-full">
      <div className="flex min-h-full items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* <!-- Logo và Tiêu đề --> */}
          <div className="mb-8 text-center">
            <div className="animate-float mb-4 inline-block text-6xl text-white">
              🏢
            </div>
            <h1 className="mb-2 text-3xl font-bold text-white">
              Quản Lý Chung Cư
            </h1>
            <p className="text-white/90">
              Hệ thống quản lý hiện đại và thông minh
            </p>
          </div>

          {/* <!-- Form Container --> */}
          <div className="glass-morphism animate-fade-in rounded-2xl p-8 shadow-2xl">
            <div className="mb-8 flex rounded-lg bg-gray-100 p-1">
              <Link
                to="/auth/login"
                id="loginTab"
                className="text-primary-600 flex-1 rounded-md bg-white px-4 py-2 font-semibold shadow-sm transition-all duration-300 hover:shadow-md">
                Đăng Nhập
              </Link>
              <Link
                to="/auth/register"
                id="registerTab"
                className="flex-1 rounded-md px-4 py-2 font-semibold text-gray-600 transition-all duration-300 hover:bg-white/50 hover:text-gray-800">
                Đăng Ký
              </Link>
            </div>

            <Outlet />

            {/* <!-- Success Message --> */}
            <div
              id="successMessage"
              className="mt-6 hidden rounded-lg border border-green-200 bg-green-50 p-4">
              <div className="flex items-center">
                <span className="mr-3 text-2xl">✅</span>
                <div>
                  <p className="font-semibold text-green-800" id="successTitle">
                    Thành công!
                  </p>
                  <p className="text-sm text-green-600" id="successText"></p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center text-sm text-white">
            <p>© 2024 Hệ Thống Quản Lý Chung Cư. Bảo mật và an toàn.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
