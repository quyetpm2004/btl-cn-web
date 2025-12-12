import { getDashboardStatsApi } from '@/services/stat.api.js'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

const StatsCard = ({ title, value, icon, color }) => (
  <div className="rounded-xl bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value ?? '-'}</p>
      </div>
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-lg bg-${color}-100`}>
        <i className={`fas fa-${icon} text-${color}-600`}></i>
      </div>
    </div>
  </div>
)

export const Dashboard = () => {
  const {
    data: dashboardStatsData,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: () => getDashboardStatsApi(),
    placeholderData: keepPreviousData
  })

  const dashboardStats = dashboardStatsData?.dashboardStats || {}

  if (isLoading) return <div>Đang tải...</div>
  if (isError) return <div>Lỗi tải dữ liệu</div>

  return (
    <>
      <div className="mb-6">
        <h2 className="mb-2 text-2xl font-bold text-gray-800">
          Tổng quan hệ thống
        </h2>
        <p className="text-gray-600">
          Chào mừng bạn đến với hệ thống quản lý chung cư
        </p>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Tổng căn hộ"
          value={dashboardStats?.apartmentCount}
          icon="home"
          color="blue"
        />
        <StatsCard
          title="Tổng cư dân"
          value={dashboardStats?.residentCount}
          icon="users"
          color="green"
        />

        <StatsCard
          title="Tổng doanh thu"
          value={
            dashboardStats?.totalInvoiceAmount
              ? new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND'
                }).format(dashboardStats.totalInvoiceAmount)
              : '-'
          }
          icon="money-bill-wave"
          color="yellow"
        />

        <StatsCard
          title="Phản ánh"
          value={dashboardStats?.requestCount}
          icon="tools"
          color="red"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold">Hoạt động gần đây</h3>
          <div className="flex flex-col gap-y-4">
            <div className="flex items-center gap-x-3 rounded-lg bg-blue-50 p-3">
              <i className="fas fa-user-plus text-blue-500"></i>
              <div>
                <p className="font-medium">Cư dân mới đăng ký</p>
                <p className="text-sm text-gray-600">
                  Căn hộ A1205 - 10 phút trước
                </p>
              </div>
            </div>
            <div className="flex items-center gap-x-3 rounded-lg bg-green-50 p-3">
              <i className="fas fa-money-bill text-green-500"></i>
              <div>
                <p className="font-medium">Thanh toán phí quản lý</p>
                <p className="text-sm text-gray-600">
                  Căn hộ B0801 - 1 giờ trước
                </p>
              </div>
            </div>
            <div className="flex items-center gap-x-3 rounded-lg bg-yellow-50 p-3">
              <i className="fas fa-tools text-yellow-500"></i>
              <div>
                <p className="font-medium">Yêu cầu sửa chữa</p>
                <p className="text-sm text-gray-600">
                  Thang máy tầng 15 - 2 giờ trước
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold">Thông báo quan trọng</h3>
          <div className="flex flex-col gap-y-4">
            <div className="border-l-4 border-red-500 pl-4">
              <p className="font-medium text-red-700">Bảo trì hệ thống điện</p>
              <p className="text-sm text-gray-600">
                Ngày 15/12 từ 8:00 - 12:00
              </p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <p className="font-medium text-blue-700">Họp cư dân định kỳ</p>
              <p className="text-sm text-gray-600">Chủ nhật 17/12 lúc 9:00</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <p className="font-medium text-green-700">Khai trương gym mới</p>
              <p className="text-sm text-gray-600">Từ ngày 20/12/2024</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
