import React from 'react'
import { Link, useLocation } from 'react-router'
import { useResidentStore } from '@/stores/useResidentStore'

const Sidebar = () => {
  const { resident } = useResidentStore()
  const location = useLocation()

  const { fullName, apartments } = resident
  const { apartmentCode, building, floor } = apartments[0]

  // Hàm kiểm tra active
  const isActive = (path) =>
    location.pathname === path
      ? 'bg-blue-50 text-blue-700'
      : 'text-gray-700 hover:bg-blue-50'

  return (
    <aside
      id="sidebar"
      className="sidebar-transition sidebar-hidden fixed z-30 h-full w-80 bg-white shadow-lg md:relative md:translate-x-0">
      <div className="p-6">
        {/* User Profile Card */}
        <div className="mb-6">
          <div className="rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white">
            <div className="flex items-center space-x-3">
              <div className="bg-opacity-20 flex h-12 w-12 items-center justify-center rounded-full bg-white">
                <i className="fas fa-user"></i>
              </div>
              <div>
                <p className="font-semibold">{fullName}</p>
                <p className="text-sm opacity-90">Căn hộ {apartmentCode}</p>
                <p className="text-xs opacity-75">
                  Tòa {building} - Tầng {floor}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-2">
          {/* Dashboard */}
          <Link
            to="/user"
            className={`nav-item flex w-full items-center space-x-3 rounded-lg px-4 py-3 text-left font-medium transition-colors ${isActive(
              '/user'
            )}`}>
            <i className="fas fa-home text-blue-500"></i>
            <span>Trang chủ</span>
          </Link>

          {/* Personal Info */}
          <div className="space-y-1">
            <p className="px-4 py-2 text-xs font-semibold tracking-wider text-gray-500 uppercase">
              Thông tin cá nhân
            </p>

            <Link
              to="/user/profile"
              className={`nav-item flex w-full items-center space-x-3 rounded-lg px-4 py-3 text-left transition-colors ${isActive(
                '/user/profile'
              )}`}>
              <i className="fas fa-id-card text-green-500"></i>
              <span>Hồ sơ cá nhân</span>
            </Link>

            <Link
              to="/user/apartment"
              className={`nav-item flex w-full items-center space-x-3 rounded-lg px-4 py-3 text-left transition-colors ${isActive(
                '/user/apartment'
              )}`}>
              <i className="fas fa-building text-purple-500"></i>
              <span>Thông tin căn hộ</span>
            </Link>
          </div>

          {/* Services */}
          <div className="space-y-1">
            <p className="px-4 py-2 text-xs font-semibold tracking-wider text-gray-500 uppercase">
              Dịch vụ
            </p>

            <Link
              to="/user/payment"
              className={`nav-item flex w-full items-center space-x-3 rounded-lg px-4 py-3 text-left transition-colors ${isActive(
                '/user/payment'
              )}`}>
              <i className="fas fa-credit-card text-green-500"></i>
              <span>Thanh toán</span>
              <span className="ml-auto rounded-full bg-red-500 px-2 py-1 text-xs text-white">
                1
              </span>
            </Link>

            <Link
              to="/user/services"
              className={`nav-item flex w-full items-center space-x-3 rounded-lg px-4 py-3 text-left transition-colors ${isActive(
                '/user/services'
              )}`}>
              <i className="fas fa-concierge-bell text-purple-500"></i>
              <span>Đăng ký dịch vụ</span>
            </Link>
          </div>
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar
