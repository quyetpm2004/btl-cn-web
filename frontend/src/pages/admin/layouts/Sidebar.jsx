import { User } from 'lucide-react'
import { Link } from 'react-router'
import { useAuthStore } from '@/stores/useAuthStore'

export const Sidebar = () => {
  const user = useAuthStore((s) => s.user)

  return (
    <div className="fixed top-16 bottom-0 left-0 z-40 w-64 overflow-y-auto bg-white shadow-lg">
      <div className="p-6">
        <div className="mb-6">
          <div className="rounded-lg bg-blue-50 p-4">
            <div className="flex items-center space-x-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500">
                <User className="text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">
                  {user?.display_name}
                </p>
                <p className="text-sm text-gray-600">{user?.role_name}</p>
              </div>
            </div>
          </div>
        </div>

        <nav className="space-y-2">
          <Link
            to="/admin"
            className="flex w-full items-center space-x-3 rounded-lg px-4 py-3 text-left transition-colors hover:bg-blue-50">
            <i className="fas fa-tachometer-alt text-blue-500"></i>
            <span>Tổng quan</span>
          </Link>

          <div className="space-y-1">
            <p className="px-4 py-2 text-xs font-semibold tracking-wider text-gray-500 uppercase">
              Quản lý
            </p>

            <Link
              to="/admin/residents"
              className="flex w-full items-center space-x-3 rounded-lg px-4 py-3 text-left transition-colors hover:bg-blue-50">
              <i className="fas fa-users text-green-500"></i>
              <span>Cư dân</span>
            </Link>
            <Link
              to="/admin/apartments"
              className="flex w-full items-center space-x-3 rounded-lg px-4 py-3 text-left transition-colors hover:bg-blue-50">
              <i className="fas fa-home text-purple-500"></i>
              <span>Căn hộ</span>
            </Link>
            <Link
              to="/admin/fees"
              className="flex w-full items-center space-x-3 rounded-lg px-4 py-3 text-left transition-colors hover:bg-blue-50">
              <i className="fas fa-money-bill-wave text-yellow-500"></i>
              <span>Phí & Thu chi</span>
            </Link>
            <Link
              to="/admin/facilities"
              className="flex w-full items-center space-x-3 rounded-lg px-4 py-3 text-left transition-colors hover:bg-blue-50">
              <i className="fas fa-tools text-red-500"></i>
              <span>Thiết bị</span>
            </Link>
            <Link
              to="/admin/staffs"
              className="flex w-full items-center space-x-3 rounded-lg px-4 py-3 text-left transition-colors hover:bg-blue-50">
              <i className="fas fa-user-tie text-indigo-500"></i>
              <span>Nhân sự</span>
            </Link>
            <Link
              to="/admin/notifications"
              className="flex w-full items-center space-x-3 rounded-lg px-4 py-3 text-left transition-colors hover:bg-blue-50">
              <i className="fas fa-bell text-yellow-500"></i>
              <span>Thông báo</span>
              <span className="ml-auto rounded-full bg-red-600 px-2 py-1 text-xs text-white">
                3
              </span>
            </Link>
          </div>

          {/* 
          <div
            className="space-y-1"
            id="residentMenu"
            style={{ display: 'none' }}>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-2">
              Dịch vụ
            </p>
            <button
              className=" w-full text-left px-4 py-3 rounded-lg hover:bg-blue-50 transition-colors flex items-center space-x-3"
              data-section="profile">
              <i className="fas fa-id-card text-blue-500"></i>
              <span>Thông tin cá nhân</span>
            </button>
            <button
              className=" w-full text-left px-4 py-3 rounded-lg hover:bg-blue-50 transition-colors flex items-center space-x-3"
              data-section="payment">
              <i className="fas fa-credit-card text-green-500"></i>
              <span>Thanh toán</span>
            </button>
            <button
              className=" w-full text-left px-4 py-3 rounded-lg hover:bg-blue-50 transition-colors flex items-center space-x-3"
              data-section="requests">
              <i className="fas fa-clipboard-list text-orange-500"></i>
              <span>Phản ánh</span>
            </button>
            <button
              className=" w-full text-left px-4 py-3 rounded-lg hover:bg-blue-50 transition-colors flex items-center space-x-3"
              data-section="services">
              <i className="fas fa-concierge-bell text-purple-500"></i>
              <span>Đăng ký dịch vụ</span>
            </button>
          </div> */}

          {/* <Link className="flex w-full items-center space-x-3 rounded-lg px-4 py-3 text-left transition-colors hover:bg-blue-50">
            <i className="fas fa-comments text-blue-500"></i>
            <span>Diễn đàn</span>
          </Link> */}
        </nav>

        {/* <div className="mt-8 border-t border-gray-200 pt-6">
          <button className="w-full rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 text-white transition-all hover:from-blue-600 hover:to-purple-700">
            <i className="fas fa-exchange-alt mr-2"></i>
            Chuyển vai trò
          </button>
        </div> */}
      </div>
    </div>
  )
}
