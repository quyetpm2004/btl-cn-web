import React, { useEffect, useState } from 'react'

const UserDashboard = ({ onNavigate }) => {
  const [currentDate, setCurrentDate] = useState('')

  // Hiển thị ngày hiện tại
  useEffect(() => {
    const today = new Date()
    const formatted = today.toLocaleDateString('vi-VN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long'
    })
    setCurrentDate(formatted)
  }, [])

  return (
    <div id="dashboard" className="content-section">
      {/* Header */}
      <div className="mb-6">
        <h2 className="mb-2 text-2xl font-bold text-gray-800">
          Chào mừng trở lại!
        </h2>
        <p className="text-gray-600">
          Hôm nay là ngày <span>{currentDate}</span>
        </p>
      </div>

      {/* Quick Stats */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Hóa đơn chưa thanh toán */}
        <div className="card-hover rounded-xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Hóa đơn chưa thanh toán
              </p>
              <p className="text-2xl font-bold text-red-600">1</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
              <i className="fas fa-exclamation-triangle text-red-600"></i>
            </div>
          </div>
        </div>

        {/* Căn hộ đang sở hữu */}
        <div className="card-hover rounded-xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Căn hộ đang sở hữu
              </p>
              <p className="text-2xl font-bold text-green-600">3</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
              <i className="fas fa-check-circle text-green-600"></i>
            </div>
          </div>
        </div>

        {/* Phản ánh đang xử lý */}
        <div className="card-hover rounded-xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Phản ánh đang xử lý
              </p>
              <p className="text-2xl font-bold text-yellow-600">2</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-100">
              <i className="fas fa-clock text-yellow-600"></i>
            </div>
          </div>
        </div>

        {/* Thông báo mới */}
        <div className="card-hover rounded-xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Thông báo mới</p>
              <p className="text-2xl font-bold text-blue-600">3</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
              <i className="fas fa-bell text-blue-600"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div
          className="card-hover cursor-pointer rounded-xl bg-gradient-to-br from-green-500 to-green-600 p-6 text-white"
          onClick={() => onNavigate?.('payment')}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="mb-2 text-lg font-semibold">Thanh toán hóa đơn</h3>
              <p className="text-sm opacity-90">
                Thanh toán nhanh chóng và an toàn
              </p>
            </div>
            <i className="fas fa-credit-card text-3xl opacity-80"></i>
          </div>
        </div>

        <div
          className="card-hover cursor-pointer rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 p-6 text-white"
          onClick={() => onNavigate?.('profile')}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="mb-2 text-lg font-semibold">Hồ sơ cá nhân</h3>
              <p className="text-sm opacity-90">Quản lý thông tin cá nhân</p>
            </div>
            <i className="fas fa-user text-3xl opacity-80"></i>
          </div>
        </div>

        <div
          className="card-hover cursor-pointer rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 p-6 text-white"
          onClick={() => onNavigate?.('services')}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="mb-2 text-lg font-semibold">Phản ánh chung cư</h3>
              <p className="text-sm opacity-90">
                Gửi yêu cầu bảo trì và phản ánh sự cố
              </p>
            </div>
            <i className="fas fa-concierge-bell text-3xl opacity-80"></i>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDashboard
