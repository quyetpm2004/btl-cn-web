import { useState, useEffect } from 'react'
import {
  createScheduleApi,
  updateScheduleApi,
  getAllPendingSchedulesApi,
  deleteScheduleApi
} from '@/services/schedule.api'
import {
  getAllPendingRequestsApi,
  assignRequestApi,
  updateRequestStatusApi,
  completeRequestApi
} from '@/services/request.api'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { MaintenanceScheduleDialog } from '@/components/maintenance/maintenance-schedule-dialog'
import { MaintenanceScheduleHistoryDialog } from '@/components/maintenance/maintenance-schedule-history-dialog'
import { MaintenanceRequestDialog } from '@/components/maintenance/maintenance-request-dialog'
import { MaintenanceRequestHistoryDialog } from '@/components/maintenance/maintenance-request-history-dialog'
import { ConfirmDialog } from '@/components/confirm-dialog.jsx'
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query'
import { format, formatDistanceToNow } from 'date-fns'
import { vi } from 'date-fns/locale'
import { useAuthStore } from '@/stores/useAuthStore'
import { io } from 'socket.io-client'
import { Badge } from '@/components/ui/badge'

export const AdminMaintenance = () => {
  const { user } = useAuthStore()
  const queryClient = useQueryClient()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [historyDialogOpen, setHistoryDialogOpen] = useState(false)
  const [reqHistoryDialogOpen, setReqHistoryDialogOpen] = useState(false)
  const [selectedSchedule, setSelectedSchedule] = useState(null)
  const [dialogMode, setDialogMode] = useState('view') // 'view', 'edit', 'create'
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    schedule: null
  })
  // Request Dialog State
  const [reqDialog, setReqDialog] = useState({
    open: false,
    mode: 'view', // 'view', 'assign', 'complete'
    request: null
  })

  // Socket.io connection
  useEffect(() => {
    const socket = io(
      import.meta.env.VITE_BASE_URL_BACKEND || 'http://localhost:8080'
    )

    socket.on('maintenance_request_updated', () => {
      queryClient.invalidateQueries({ queryKey: ['maintenanceRequests'] })
    })

    return () => {
      socket.disconnect()
    }
  }, [queryClient])

  // Schedule Query
  const {
    data: schedulesData,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['maintenanceSchedules'],
    queryFn: () => getAllPendingSchedulesApi(),
    placeholderData: keepPreviousData
  })

  const schedules = schedulesData?.schedules || []

  // Requests Query
  const { data: requestsData, isLoading: requestsLoading } = useQuery({
    queryKey: ['maintenanceRequests'],
    queryFn: getAllPendingRequestsApi
  })

  const requests = requestsData?.requests || []

  // Request Mutations
  const assignMutation = useMutation({
    mutationFn: ({ id, technicianId }) => assignRequestApi(id, technicianId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['maintenanceRequests'] })
      toast.success('Phân công thành công')
      setReqDialog((prev) => ({ ...prev, open: false }))
    },
    onError: () => toast.error('Phân công thất bại')
  })

  const statusMutation = useMutation({
    mutationFn: ({ id, status }) => updateRequestStatusApi(id, status),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['maintenanceRequests'] })
      if (variables.status === 3) {
        toast.success('Đã nhận công việc')
      } else if (variables.status === 0) {
        toast.info('Đã hủy nhận công việc')
      }
    },
    onError: () => toast.error('Cập nhật trạng thái thất bại')
  })

  const completeMutation = useMutation({
    mutationFn: ({ id, result }) => completeRequestApi(id, result),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['maintenanceRequests'] })
      toast.success('Đã hoàn thành công việc')
      setReqDialog((prev) => ({ ...prev, open: false }))
    },
    onError: () => toast.error('Cập nhật thất bại')
  })

  // Request Handlers
  const handleProcessRequest = (request) => {
    // Role 5: Technician
    if (user.role_id === 5) {
      // Accept job -> status 3
      statusMutation.mutate({ id: request.id, status: 3 })
    } else {
      // Admin/Manager -> Open Assign Dialog
      setReqDialog({ open: true, mode: 'assign', request })
    }
  }

  const handleCompleteRequest = (request) => {
    setReqDialog({ open: true, mode: 'complete', request })
  }

  const handleCancelRequest = (request) => {
    // Cancel job -> status 0 (back to pending)
    statusMutation.mutate({ id: request.id, status: 0 })
  }

  const handleViewRequest = (request) => {
    setReqDialog({ open: true, mode: 'view', request })
  }

  const handleEditRequest = (request) => {
    setReqDialog({ open: true, mode: 'assign', request })
  }

  // Schedule Mutations
  const createMutation = useMutation({
    mutationFn: createScheduleApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['maintenanceSchedules'] })
      toast.success('Thêm lịch bảo trì thành công')
      handleCloseDialog()
    },
    onError: (error) => {
      toast.error('Thêm lịch bảo trì thất bại')
      console.error(error)
    }
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateScheduleApi(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['maintenanceSchedules'] })
      toast.success('Cập nhật lịch bảo trì thành công')
      handleCloseDialog()
    },
    onError: (error) => {
      toast.error('Cập nhật lịch bảo trì thất bại')
      console.error(error)
    }
  })

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteScheduleApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['maintenanceSchedules'] })
      toast.success('Xóa lịch bảo trì thành công')
      setDeleteDialog((prev) => ({ ...prev, open: false, schedule: null }))
    },
    onError: (error) => {
      toast.error('Xóa lịch bảo trì thất bại')
      console.error(error)
    }
  })

  /** Dialog handlers */
  const handleOpenDialog = (schedule = null, mode = 'view') => {
    setSelectedSchedule(schedule)
    setDialogMode(mode)
    setDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setDialogOpen(false)
    setSelectedSchedule(null)
    setDialogMode('view')
  }

  const handleSaveSchedule = async (formData) => {
    if (dialogMode === 'create') {
      createMutation.mutate(formData)
    } else if (dialogMode === 'edit' && selectedSchedule?.id) {
      updateMutation.mutate({ id: selectedSchedule.id, data: formData })
    } else {
      handleCloseDialog()
    }
  }

  const handleDeleteSchedule = (schedule) => {
    setDeleteDialog({ open: true, schedule })
  }

  const handleConfirmDelete = () => {
    if (!deleteDialog.schedule) return
    deleteMutation.mutate(deleteDialog.schedule.id)
  }

  if (isError) return <div>Lỗi tải dữ liệu</div>

  return (
    <div className="animate-in fade-in duration-300">
      <div className="mb-6">
        <h2 className="mb-2 text-2xl font-bold text-gray-800">
          Bảo trì và phản ánh
        </h2>
        <p className="text-gray-600">
          Theo dõi bảo trì thiết bị và phản ánh sự cố
        </p>
      </div>

      <MaintenanceScheduleDialog
        mode={dialogMode}
        schedule={selectedSchedule}
        open={dialogOpen}
        onOpenChange={handleCloseDialog}
        onSave={handleSaveSchedule}
      />

      <MaintenanceScheduleHistoryDialog
        open={historyDialogOpen}
        onOpenChange={setHistoryDialogOpen}
        onViewDetail={(schedule) => handleOpenDialog(schedule, 'view')}
      />

      <MaintenanceRequestHistoryDialog
        open={reqHistoryDialogOpen}
        onOpenChange={setReqHistoryDialogOpen}
        onViewDetail={(request) => handleViewRequest(request)}
      />

      <MaintenanceRequestDialog
        open={reqDialog.open}
        onOpenChange={(open) => setReqDialog((prev) => ({ ...prev, open }))}
        mode={reqDialog.mode}
        request={reqDialog.request}
        onAssign={(id, techId) =>
          assignMutation.mutate({ id, technicianId: techId })
        }
        onComplete={(id, result) => completeMutation.mutate({ id, result })}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Left Column: Maintenance Schedules */}
        <div className="rounded-xl bg-white shadow-sm">
          <div className="border-b border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Lịch bảo trì</h3>
              <div className="flex gap-2">
                <Button
                  onClick={() => setHistoryDialogOpen(true)}
                  variant="outline"
                  className="border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700">
                  <i className="fas fa-history"></i>
                  Lịch sử
                </Button>

                {/* Admin, Manager hiện */}
                {user.role_id !== 5 && (
                  <Button
                    onClick={() => handleOpenDialog(null, 'create')}
                    variant="blue">
                    <i className="fas fa-plus"></i>
                    Thêm lịch
                  </Button>
                )}
              </div>
            </div>
          </div>
          <div className="py-6 pr-2 pl-6">
            {isLoading && (
              <div className="py-4 text-center text-gray-500">
                Đang tải danh sách...
              </div>
            )}
            {!isLoading && schedules.length === 0 && (
              <div className="py-4 text-center text-gray-500">
                Chưa có lịch bảo trì nào
              </div>
            )}
            <div className="flex snap-y flex-col gap-y-4 overflow-y-scroll pr-2 md:max-h-[474px]">
              {schedules.map((schedule) => (
                <div
                  key={schedule.id}
                  className="flex snap-start items-center gap-x-4 rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500">
                    <i className="fas fa-exclamation-triangle text-white"></i>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-yellow-700">
                      {schedule.title}
                    </p>
                    <p className="text-sm text-yellow-600">
                      {format(new Date(schedule.start_at), 'HH:mm dd/MM/yyyy ')}
                      - {format(new Date(schedule.end_at), 'HH:mm dd/MM/yyyy')}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {/* Admin, Manager hiện */}
                    {user.role_id !== 5 && (
                      <>
                        <Button
                          size="icon"
                          variant="icon"
                          onClick={() => handleDeleteSchedule(schedule)}
                          className="cursor-pointer text-yellow-600 hover:opacity-60"
                          title="Xóa">
                          <i className="fas fa-trash"></i>
                        </Button>
                        <Button
                          size="icon"
                          variant="icon"
                          onClick={() => handleOpenDialog(schedule, 'edit')}
                          className="cursor-pointer text-yellow-600 hover:opacity-60"
                          title="Sửa">
                          <i className="fas fa-edit"></i>
                        </Button>
                      </>
                    )}

                    <Button
                      size="icon"
                      variant="icon"
                      onClick={() => handleOpenDialog(schedule, 'view')}
                      className="cursor-pointer text-yellow-600 hover:opacity-60"
                      title="Xem chi tiết">
                      <i className="fas fa-arrow-right"></i>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Incident Reports */}
        <div className="rounded-xl bg-white shadow-sm">
          <div className="border-b border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <h3 className="h-9 text-lg font-semibold">Báo cáo sự cố</h3>
              <div className="flex gap-2">
                <Button
                  onClick={() => setReqHistoryDialogOpen(true)}
                  variant="outline"
                  className="border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700">
                  <i className="fas fa-history"></i>
                  Lịch sử
                </Button>
              </div>
            </div>
          </div>
          <div className="py-6 pr-2 pl-6">
            {requestsLoading && (
              <div className="py-4 text-center text-gray-500">
                Đang tải danh sách...
              </div>
            )}
            {!requestsLoading && requests.length === 0 && (
              <div className="py-4 text-center text-gray-500">
                Chưa có báo cáo nào
              </div>
            )}
            <div className="flex snap-y flex-col gap-y-4 overflow-y-scroll pr-2 md:max-h-[474px]">
              {requests.map((request) => (
                <div
                  key={request.id}
                  className={`snap-start rounded border-l-4 p-4 ${
                    request.status === 3
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-red-500 bg-red-50'
                  }`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <p
                        className={`font-medium ${
                          request.status === 3
                            ? 'text-blue-700'
                            : 'text-red-700'
                        }`}>
                        {request.title}
                      </p>
                      <p
                        className={`text-sm ${
                          request.status === 3
                            ? 'text-blue-600'
                            : 'text-red-600'
                        }`}>
                        Báo cáo bởi: {request.resident?.full_name || 'Ẩn danh'}
                      </p>
                      <p className="text-xs text-gray-500">
                        {request.created_at
                          ? formatDistanceToNow(new Date(request.created_at), {
                              addSuffix: true,
                              locale: vi
                            })
                          : 'Vừa xong'}
                      </p>
                    </div>
                    <Badge
                      className={`${
                        request.status === 3
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                      {request.status === 3 ? 'Đang xử lý' : 'Chờ xử lý'}
                    </Badge>
                  </div>
                  <div className="mt-3 flex gap-x-2">
                    {/* Status 0: Pending */}
                    {request.status === 0 && (
                      <Button
                        variant="red"
                        size="sm"
                        onClick={() => handleProcessRequest(request)}>
                        Xử lý ngay
                      </Button>
                    )}

                    {/* Status 3: In Progress (Technician only) */}
                    {request.status === 3 &&
                      user.role_id === 5 &&
                      request.assigned_to === user.id && (
                        <>
                          <Button
                            variant="default"
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleCompleteRequest(request)}>
                            Hoàn thành
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                            onClick={() => handleCancelRequest(request)}>
                            Hủy
                          </Button>
                        </>
                      )}

                    {/* Admin/Manager Edit Button */}
                    {(user.role_id === 1 || user.role_id === 3) &&
                      request.status !== 0 && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-yellow-200 text-yellow-600 hover:bg-yellow-50 hover:text-yellow-700"
                          onClick={() => handleEditRequest(request)}>
                          Sửa
                        </Button>
                      )}

                    <Button
                      variant="outline"
                      size="sm"
                      className={`${
                        request.status === 3
                          ? 'border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700'
                          : 'border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600'
                      }`}
                      onClick={() => handleViewRequest(request)}>
                      Chi tiết
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog({ ...deleteDialog, open })}
        title="Xác nhận xóa lịch bảo trì"
        description={`Bạn có chắc muốn xóa lịch bảo trì "${deleteDialog.schedule?.title}"?`}
        confirmText="Xóa"
        cancelText="Hủy"
        onConfirm={handleConfirmDelete}
        isLoading={deleteMutation.isPending}
        variant="destructive"
      />
    </div>
  )
}
