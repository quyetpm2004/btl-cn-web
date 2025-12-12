import { useEffect, useState } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Bell,
  DollarSign,
  Settings,
  Calendar,
  MoreHorizontal,
  Wrench
} from 'lucide-react'
import { NotificationDetailModal } from './NotificationDetailModal'
import { useNotificationStore } from '@/stores/useNotificationStore'
import { useAuthStore } from '@/stores/useAuthStore'

const Notification = () => {
  const { notifications, fetchNotifications, markAsRead } =
    useNotificationStore()
  const [activeTab, setActiveTab] = useState('all')
  const { user } = useAuthStore()

  // lấy filter từ URL (ví dụ: ?filter=payment)
  const getFilterFromUrl = () => {
    try {
      const params = new URLSearchParams(window.location.search)
      return params.get('filter') || 'all'
    } catch {
      return 'all'
    }
  }

  useEffect(() => {
    const initial = getFilterFromUrl()
    setActiveTab(initial)
    fetchNotifications(user.id, initial)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // khi user đổi tab -> cập nhật URL param và gọi backend
  const handleTabChange = (value) => {
    setActiveTab(value)
    try {
      const url = new URL(window.location.href)
      url.searchParams.set('filter', value)
      window.history.pushState({}, '', url.toString())
    } catch {
      // ignore
    }
    fetchNotifications(value)
  }

  const getTypeColor = (category) => {
    const colors = {
      1: 'destructive',
      2: 'outline',
      3: 'success',
      4: 'default',
      5: 'secondary'
    }
    return colors[category] || 'secondary'
  }

  const categoryNumberToString = (num) => {
    const map = {
      1: 'Hệ thống',
      2: 'Sự kiện',
      3: 'Hóa đơn',
      4: 'Bảo trì',
      5: 'Khác'
    }
    return map[num] || 'unknown'
  }

  const handleMarkAsRead = async (item) => {
    await markAsRead(item.id, 1)
  }

  const handleMarkAsUnRead = async (item) => {
    await markAsRead(item.id, 0)
  }

  const [selectedNotification, setSelectedNotification] = useState(null)

  const NotificationList = ({ notifications }) => (
    <div className="space-y-4">
      {notifications.map((item) => (
        <Card
          key={item.id}
          onClick={() => setSelectedNotification(item)}
          className={`cursor-pointer py-3 transition-all ${
            !item.is_read
              ? 'border-l-4 border-blue-500 bg-blue-50 shadow-sm'
              : 'bg-white'
          }`}>
          <CardContent className="p-4">
            <div className="mb-2 flex items-center gap-2">
              {!item.is_read && (
                <span className="h-2 w-2 rounded-full bg-blue-500" />
              )}
              <h4
                className={`font-semibold ${
                  !item.is_read ? 'text-blue-700' : 'text-gray-800'
                }`}>
                {item.notification.title}
              </h4>
              <Badge
                className="float-right"
                variant={getTypeColor(item.notification.category)}>
                {categoryNumberToString(item.notification.category)}
              </Badge>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">
                {item.notification.content}
              </p>
              <p className="text-xs text-gray-400">
                {new Date(item.notification.created_at).toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  return (
    <>
      <div id="notification" className="content-section">
        <div className="mb-6">
          <h2 className="mb-2 text-2xl font-bold text-gray-800">
            Thông Báo Chung Cư
          </h2>
          <p className="text-gray-600">
            Chào mừng cư dân! Cập nhật thông tin mới nhất từ ban quản lý
          </p>
        </div>
        <div>
          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="grid hidden w-full grid-cols-6 md:grid">
              <TabsTrigger value="all" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                <span>Tất cả</span>
              </TabsTrigger>
              <TabsTrigger value="fee" className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                <span>Hóa đơn</span>
              </TabsTrigger>
              <TabsTrigger value="system" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span>Hệ thống</span>
              </TabsTrigger>
              <TabsTrigger value="event" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Sự kiện</span>
              </TabsTrigger>
              <TabsTrigger
                value="maintenance"
                className="flex items-center gap-2">
                <Wrench className="h-4 w-4" />
                <span>Bảo trì</span>
              </TabsTrigger>
              <TabsTrigger value="other" className="flex items-center gap-2">
                <MoreHorizontal className="h-4 w-4" />
                <span>Khác</span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <NotificationList notifications={notifications} />
            </TabsContent>
            <TabsContent value="fee">
              <NotificationList notifications={notifications} />
            </TabsContent>
            <TabsContent value="system">
              <NotificationList notifications={notifications} />
            </TabsContent>
            <TabsContent value="event">
              <NotificationList notifications={notifications} />
            </TabsContent>
            <TabsContent value="maintenance">
              <NotificationList notifications={notifications} />
            </TabsContent>
            <TabsContent value="other">
              <NotificationList notifications={notifications} />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {selectedNotification && (
        <NotificationDetailModal
          open={!!selectedNotification}
          setOpen={(val) => !val && setSelectedNotification(null)}
          notificationItem={selectedNotification}
          handleMarkAsUnRead={handleMarkAsUnRead}
          handleMarkAsRead={handleMarkAsRead}
        />
      )}
    </>
  )
}

export default Notification
