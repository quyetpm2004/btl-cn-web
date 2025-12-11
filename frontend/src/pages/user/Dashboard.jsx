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
import { CalendarDays, Cctv, ChartArea, ClipboardType } from 'lucide-react'

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

  const apartments = resident?.apartments ?? []

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
        <Link
          to={'/user/payment'}
          className="card-hover rounded-xl bg-white p-6 shadow-sm">
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
        </Link>

        {/* Căn hộ đang sở hữu */}
        <Link
          to={'/user'}
          className="card-hover rounded-xl bg-white p-6 shadow-sm">
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
        </Link>

        {/* Phản ánh đang xử lý */}
        <Link
          to={'/user/maintenance'}
          className="card-hover rounded-xl bg-white p-6 shadow-sm">
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
        </Link>

        {/* Thông báo mới */}
        <Link
          to={'/user/notification'}
          className="card-hover rounded-xl bg-white p-6 shadow-sm">
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
        </Link>
      </div>

      {/* Căn hộ đang ở */}
      <div className="mt-8">
        <div className="mb-4">
          <p className="text-lg font-medium text-gray-600">Chi tiết căn hộ</p>
        </div>

        {apartments.map((apt, index) => (
          <div key={index} className="mb-6 rounded-xl bg-white p-6 shadow-sm">
            {/* Header */}
            <div className="mb-6 flex flex-col items-start gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-xl font-semibold">
                  Căn hộ {apt.apartmentCode}
                </h3>
                <p className="text-gray-600">
                  Tòa {apt.building} - Tầng {apt.floor} - Luxury Residence
                </p>
              </div>
              <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800">
                Đang ở
              </span>
            </div>

            {/* Nội dung */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Apartment Info */}
              <div>
                <h4 className="mb-4 text-gray-800">Thông số căn hộ</h4>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 rounded-lg bg-gray-50 p-3">
                    <ChartArea />
                    <div>
                      <p className="text-sm text-gray-600">Diện tích</p>
                      <p className="font-medium">{apt.area} m²</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 rounded-lg bg-gray-50 p-3">
                    <ClipboardType />
                    <div>
                      <p className="text-sm text-gray-600">Loại căn hộ</p>
                      <p className="font-medium">{apt.name}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contract Info */}
              <div>
                <h4 className="mb-4 font-semibold text-gray-800">
                  Thông tin chi tiết
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 rounded-lg bg-gray-50 p-3">
                    <CalendarDays />
                    <div>
                      <p className="text-sm text-gray-600">
                        Ngày bắt đầu sử dụng
                      </p>
                      <p className="font-medium">{apt.startDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 rounded-lg bg-gray-50 p-3">
                    <Cctv />
                    <div>
                      <p className="text-sm text-gray-600">Mô tả căn hộ</p>
                      <p className="font-medium">{apt.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Services Section */}
      <div className="mb-4">
        <div className="mb-4">
          <p className="text-lg font-medium text-gray-600">
            Danh sách các dịch vụ
          </p>
        </div>

        <div className="rounded-lg border bg-white px-4 text-gray-600 shadow-sm">
          <Table className="text-md">
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
                      <TableCell className="font-sm">{service.name}</TableCell>

                      <TableCell className="font-sm">
                        {service.price.toLocaleString('vi-VN') + ' đ'}
                      </TableCell>

                      <TableCell className="font-sm">
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
