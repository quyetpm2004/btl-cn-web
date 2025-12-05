import React, { useEffect, useState } from 'react'
import { dashboardApi, getServicesApi } from '@/services/api'
import { useResidentStore } from '@/stores/useResidentStore'
import { Link } from 'react-router'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

const UserDashboard = () => {
  const [currentDate, setCurrentDate] = useState('')
  const [dashboardData, setDashboardData] = useState({
    unpaidPayments: 0,
    ownedApartments: 0,
    pendingMaintenanceRequests: 0,
    newNotifications: 0
  })
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const { resident } = useResidentStore()

  const formatUnit = (unit) => {
    switch (unit) {
      case 'm2':
        return 'm²'
      case 'm3':
        return 'm³'
      default:
        return unit
    }
  }

  // Hiển thị ngày hiện tại
  useEffect(() => {
    const today = new Date()
    const formatted = new Intl.DateTimeFormat('vi-VN', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(today)

    setCurrentDate(formatted)
  }, [])

  // Fetch dashboard data
  useEffect(() => {
    if (!resident?.id) {
      setLoading(false)
      return
    }

    const fetchDashboardData = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await dashboardApi(resident.id)

        if (response.data.success) {
          setDashboardData(response.data.data)
        }
      } catch (err) {
        console.error('Error fetching dashboard:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [resident?.id])

  // Fetch services data
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await getServicesApi()
        if (response.data) {
          setServices(response.data.services)
        }
      } catch (err) {
        console.error('Error fetching services:', err)
      }
    }

    fetchServices()
  }, [])

  return (
    <div id="dashboard" className="content-section">
      {/* Header */}
      <div className="mb-6">
        <h2 className="mb-2 text-2xl font-bold text-gray-800">
          Chào mừng trở lại!
        </h2>
        <p className="text-gray-600">
          Hôm nay là <span>{currentDate}</span>
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      {/* Quick Stats */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Hóa đơn chưa thanh toán */}
        <div className="card-hover rounded-xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Hóa đơn chưa thanh toán
              </p>
              <p className="text-2xl font-bold text-red-600">
                {loading ? '-' : dashboardData.unpaidPayments}
              </p>
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
              <p className="text-2xl font-bold text-green-600">
                {loading ? '-' : dashboardData.ownedApartments}
              </p>
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
              <p className="text-2xl font-bold text-yellow-600">
                {loading ? '-' : dashboardData.pendingMaintenanceRequests}
              </p>
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
              <p className="text-2xl font-bold text-blue-600">
                {loading ? '-' : dashboardData.newNotifications}
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
              <i className="fas fa-bell text-blue-600"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Link
          to={'/user/payment'}
          className="card-hover cursor-pointer rounded-xl bg-gradient-to-br from-green-500 to-green-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="mb-2 text-lg font-semibold">Thanh toán hóa đơn</h3>
              <p className="text-sm opacity-90">
                Thanh toán nhanh chóng và an toàn
              </p>
            </div>
            <i className="fas fa-credit-card text-3xl opacity-80"></i>
          </div>
        </Link>

        <Link
          to={'/user/profile'}
          className="card-hover cursor-pointer rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="mb-2 text-lg font-semibold">Hồ sơ cá nhân</h3>
              <p className="text-sm opacity-90">Quản lý thông tin cá nhân</p>
            </div>
            <i className="fas fa-user text-3xl opacity-80"></i>
          </div>
        </Link>

        <Link
          to={'/user/maintenance'}
          className="card-hover cursor-pointer rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="mb-2 text-lg font-semibold">Phản ánh chung cư</h3>
              <p className="text-sm opacity-90">
                Gửi yêu cầu bảo trì và phản ánh sự cố
              </p>
            </div>
            <i className="fas fa-concierge-bell text-3xl opacity-80"></i>
          </div>
        </Link>
      </div>

      {/* Services Section */}
      <div className="mb-8">
        <div className="mb-4">
          <h3 className="mb-2 text-xl font-bold text-gray-800">
            Dịch vụ hiện có
          </h3>
          <p className="text-gray-600">
            Danh sách các dịch vụ được cung cấp bởi chung cư
          </p>
        </div>

        <div className="rounded-lg border bg-white shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 hover:bg-gray-50">
                <TableHead className="font-semibold">Tên dịch vụ</TableHead>
                <TableHead className="font-semibold">Giá tiền</TableHead>
                <TableHead className="font-semibold">Đơn vị</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {services.length > 0 ? (
                services
                  .filter((service) => service.price > 0)
                  .map((service) => (
                    <TableRow key={service.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">
                        {service.name}
                      </TableCell>

                      <TableCell className="font-medium">
                        {service.price.toLocaleString('vi-VN') + ' đ'}
                      </TableCell>

                      <TableCell className="text-sm text-gray-600">
                        {formatUnit(service.unit) || 'VND'}
                      </TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan="4"
                    className="py-8 text-center text-gray-500">
                    Không có dịch vụ nào
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default UserDashboard
