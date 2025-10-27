import { NavLink, Outlet } from 'react-router' // SỬA 1: Import từ 'react-router-dom'

export const AuthLayout = () => {
  // KHÔNG CẦN DÙNG window.location nữa. NavLink sẽ tự xử lý.

  // SỬA 2: Tạo một hàm để tái sử dụng className, giúp code gọn hơn
  const getTabClassName = ({ isActive }) =>
    `flex-1 rounded-md px-4 py-2 text-center font-semibold transition-all duration-300 ${
      isActive
        ? 'bg-white text-primary-600 shadow-sm'
        : 'text-primary-600 hover:bg-white/50 hover:text-gray-800'
    }`

  return (
    <div className="gradient-primary bg-auth min-h-screen">
      {' '}
      {/* Sửa min-h-full thành min-h-screen */}
      <div className="flex min-h-full min-h-screen items-center justify-center bg-black/40 px-4 py-12">
        <div className="w-full max-w-md">
          {/* */}
          <div className="mb-8 text-center">
            <div className="animate-float text-primary mb-4 inline-block text-6xl">
              🏢
            </div>
            <h1 className="mb-2 text-3xl font-bold text-white">
              Quản Lý Chung Cư
            </h1>
            <p className="text-white/90">
              Hệ thống quản lý hiện đại và thông minh
            </p>
          </div>

          {/* */}
          <div className="glass-morphism animate-fade-in rounded-2xl p-8 shadow-2xl">
            <div className="mb-8 flex rounded-lg bg-gray-100 p-1">
              {/* SỬA 3: Dùng NavLink thay cho Link */}
              <NavLink to="/auth/login" className={getTabClassName}>
                Đăng Nhập
              </NavLink>
              <NavLink to="/auth/register" className={getTabClassName}>
                Đăng Ký
              </NavLink>
            </div>

            <Outlet />

            {/* */}
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
            <p>© 2025 Hệ Thống Quản Lý Chung Cư. Bảo mật và an toàn.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
