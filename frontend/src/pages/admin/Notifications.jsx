import { useState, useEffect, useMemo } from 'react'
import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData
} from '@tanstack/react-query'
import {
  getNotificationsApi,
  createNotificationApi,
  updateNotificationApi,
  deleteNotificationApi
} from '@/services/notification.api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Pencil,
  Trash2,
  Search,
  DollarSign,
  Settings,
  Calendar,
  MoreHorizontal,
  Wrench
} from 'lucide-react'
import { toast } from 'sonner'
import { format } from 'date-fns'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { usePagination } from '@/hooks/use-pagination'
import { PaginationControls } from '@/components/pagination-controls'
import { NotificationDialog } from '@/components/notifications/notification-dialog'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'

const CATEGORIES = {
  1: { label: 'Hệ thống', color: 'destructive', icon: Settings },
  2: { label: 'Sự kiện', color: 'default', icon: Calendar },
  3: { label: 'Hóa đơn', color: 'success', icon: DollarSign },
  4: { label: 'Bảo trì', color: 'warning', icon: Wrench },
  5: { label: 'Khác', color: 'secondary', icon: MoreHorizontal }
}

export const Notifications = () => {
  const queryClient = useQueryClient()
  const pagination = usePagination(1, 10)
  const [search, setSearch] = useState('')
  const [queryInput, setQueryInput] = useState('')
  const [activeTab, setActiveTab] = useState('all')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingNotification, setEditingNotification] = useState(null)
  const [deleteNotification, setDeleteNotification] = useState(null)

  const categoryMap = {
    system: 1,
    event: 2,
    fee: 3,
    maintenance: 4,
    other: 5
  }

  const filters = useMemo(
    () => ({
      page: pagination.page,
      limit: pagination.limit,
      query: search,
      category: activeTab === 'all' ? undefined : categoryMap[activeTab]
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pagination.page, pagination.limit, search, activeTab]
  )

  // Queries
  const { data: notificationsData, isLoading } = useQuery({
    queryKey: ['admin-notifications', filters],
    queryFn: () => getNotificationsApi(filters),
    placeholderData: keepPreviousData
  })

  const notifications = notificationsData?.items || []

  // Sync pagination
  useEffect(() => {
    if (notificationsData?.total !== undefined)
      pagination.setTotal(notificationsData.total)
  }, [notificationsData?.total, pagination])

  // Mutations
  const createMutation = useMutation({
    mutationFn: createNotificationApi,
    onSuccess: () => {
      toast.success('Tạo thông báo thành công')
      setIsDialogOpen(false)
      queryClient.invalidateQueries(['admin-notifications'])
    },
    onError: (err) => toast.error(err.message)
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateNotificationApi(id, data),
    onSuccess: () => {
      toast.success('Cập nhật thông báo thành công')
      setEditingNotification(null)
      queryClient.invalidateQueries(['admin-notifications'])
    },
    onError: (err) => toast.error(err.message)
  })

  const deleteMutation = useMutation({
    mutationFn: deleteNotificationApi,
    onSuccess: () => {
      toast.success('Xóa thông báo thành công')
      setDeleteNotification(null)
      queryClient.invalidateQueries(['admin-notifications'])
    },
    onError: (err) => toast.error(err.message)
  })

  const handleCreate = (data) => {
    createMutation.mutate(data)
  }

  const handleUpdate = (data) => {
    updateMutation.mutate({ id: editingNotification.id, data })
  }

  const handleSearch = () => {
    pagination.setPage(1)
    setSearch(queryInput)
  }

  const handleReset = () => {
    setQueryInput('')
    setSearch('')
    pagination.setPage(1)
  }

  return (
    <div className="animate-in fade-in space-y-6 duration-300">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="mb-2 text-2xl font-bold text-gray-800">
            Quản lý Thông báo
          </h2>
          <p className="text-gray-600">
            Tạo và quản lý thông báo gửi đến cư dân
          </p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)} variant="blue">
          <i className="fas fa-plus"></i>
          Tạo thông báo
        </Button>
      </div>

      <div className="rounded-xl bg-white p-4 shadow-sm">
        <div className="grid gap-4 md:grid-cols-10">
          <div className="relative md:col-span-3">
            <Input
              placeholder="Tìm kiếm thông báo..."
              value={queryInput}
              onChange={(e) => setQueryInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button
              onClick={handleSearch}
              className="absolute right-0.5 text-gray-500 hover:text-blue-500"
              variant="icon"
              size="icon">
              <Search className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="outline" onClick={handleReset}>
            Đặt lại
          </Button>
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={(val) => {
          setActiveTab(val)
          pagination.setPage(1)
        }}>
        <TabsList className="grid w-full grid-cols-3 md:grid-cols-6">
          <TabsTrigger value="all">Tất cả</TabsTrigger>
          <TabsTrigger value="fee">Hóa đơn</TabsTrigger>
          <TabsTrigger value="system">Hệ thống</TabsTrigger>
          <TabsTrigger value="event">Sự kiện</TabsTrigger>
          <TabsTrigger value="maintenance">Bảo trì</TabsTrigger>
          <TabsTrigger value="other">Khác</TabsTrigger>
        </TabsList>

        <div className="mt-4 space-y-4">
          {isLoading ? (
            <div className="py-8 text-center text-gray-500">Đang tải...</div>
          ) : notifications.length === 0 ? (
            <div className="py-8 text-center text-gray-500">
              Không có thông báo nào
            </div>
          ) : (
            notifications.map((item) => (
              <Card
                key={item.id}
                className="group py-2 transition-all hover:shadow-md">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-gray-900">
                          {item.title}
                        </h4>
                        <Badge
                          variant={
                            CATEGORIES[item.category]?.color || 'secondary'
                          }>
                          {CATEGORIES[item.category]?.label}
                        </Badge>
                      </div>
                      <p className="line-clamp-2 text-sm text-gray-600">
                        {item.content}
                      </p>
                      <p className="text-xs text-gray-400">
                        {format(
                          new Date(item?.created_at || Date.now()),
                          'dd/MM/yyyy HH:mm'
                        )}
                      </p>
                    </div>
                    <div className="flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="icon"
                              size="icon-sm"
                              onClick={() => setEditingNotification(item)}
                              className="text-blue-600 hover:bg-blue-50">
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Chỉnh sửa</p>
                          </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="icon"
                              size="icon-sm"
                              onClick={() => setDeleteNotification(item)}
                              className="text-red-600 hover:bg-red-50">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Xóa</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </Tabs>

      <PaginationControls pagination={pagination} />

      <NotificationDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={handleCreate}
      />

      {editingNotification && (
        <NotificationDialog
          open={!!editingNotification}
          onOpenChange={(open) => !open && setEditingNotification(null)}
          notification={editingNotification}
          onSubmit={handleUpdate}
        />
      )}

      <ConfirmDialog
        open={!!deleteNotification}
        onOpenChange={(open) => !open && setDeleteNotification(null)}
        title="Xóa thông báo"
        description={`Bạn có chắc chắn muốn xóa thông báo ${deleteNotification?.title} ?`}
        onConfirm={() => deleteMutation.mutate(deleteNotification.id)}
        isLoading={deleteMutation.isPending}
        variant="destructive"
      />
    </div>
  )
}
