import { getDashboardStatsApi } from '@/services/stat.api.js'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getAllPendingRequestsApi } from '@/services/request.api'
import { formatDistanceToNow } from 'date-fns'
import { vi } from 'date-fns/locale'
import { getNotificationsApi } from '@/services/notification.api'

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
  // Dashboard Stats Query
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

  // Requests Query
  const { data: requestsData, isLoading: requestsLoading } = useQuery({
    queryKey: ['maintenanceRequests'],
    queryFn: getAllPendingRequestsApi
  })

  const requests = requestsData?.requests || []

  // Notifications Query
  const { data: notificationsData, isLoading: notificationsLoading } = useQuery(
    {
      queryKey: ['admin-notifications', { page: 1, limit: 5 }],
      queryFn: () => getNotificationsApi({ page: 1, limit: 5 }),
      placeholderData: keepPreviousData
    }
  )

  const notifications = notificationsData?.items || []

  if (isLoading) return <div>Đang tải...</div>
  if (isError) return <div>Lỗi tải dữ liệu</div>

  return (
    <div className="animate-in fade-in duration-300">
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
          <h3 className="mb-4 text-lg font-semibold">Thông báo gần đây</h3>
          <div className="flex flex-col gap-y-4">
            {notificationsLoading ? (
              <p className="text-gray-600">Đang tải thông báo...</p>
            ) : notifications.length === 0 ? (
              <p className="text-gray-600">Không có thông báo mới.</p>
            ) : (
              notifications.slice(0, 3).map((noti) => (
                <div
                  key={noti.id}
                  className="rounded-lg border border-l-4 border-l-blue-500 bg-gray-50 p-3">
                  <p className="font-medium">{noti.title}</p>
                  <p className="text-sm text-gray-500">
                    {noti.createdAt
                      ? formatDistanceToNow(new Date(noti.createdAt), {
                          addSuffix: true,
                          locale: vi
                        })
                      : 'Vừa xong'}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold">Phản ánh gần đây</h3>
          {requestsLoading ? (
            <p className="text-gray-600">Đang tải phản ánh...</p>
          ) : requests.length === 0 ? (
            <p className="text-gray-600">Không có phản ánh nào đang chờ.</p>
          ) : (
            <div className="flex flex-col gap-y-4">
              {requests.slice(0, 3).map((req) => (
                <div key={req.id} className="border-l-4 border-red-500 pl-4">
                  <p className="font-medium text-red-700">{req.title}</p>
                  <p className="text-sm text-gray-700">
                    Báo cáo bởi: {req.resident?.full_name || 'Ẩn danh'}
                  </p>
                  <p className="text-sm text-gray-500">
                    {req.created_at
                      ? formatDistanceToNow(new Date(req.created_at), {
                          addSuffix: true,
                          locale: vi
                        })
                      : 'Vừa xong'}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
