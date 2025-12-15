import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import MaintenanceRequestModal from './MaintenanceRequestModal'
import {
  createMaintenanceRequestApi,
  deleteMaintenanceRequestApi,
  getAllWorkType,
  getMaintenanceRequestsApi
} from '@/services/api'
import { useResidentStore } from '@/stores/useResidentStore'
import { toast } from 'sonner'
import LightboxModal from './LightboxModal'
import ModalDetailRequest from './ModalDetailRequest'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import { io } from 'socket.io-client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Trash2 } from 'lucide-react'

export default function Maintenance() {
  const statusColorLabel = {
    0: {
      label: 'Đang chờ xử lý', // Pending
      variant: 'secondary'
    },
    1: {
      label: 'Đã hoàn thành', // Completed
      variant: 'success'
    },
    2: {
      label: 'Đã hủy', // Cancelled
      variant: 'destructive'
    },
    3: {
      label: 'Đang xử lý', // In Progress
      variant: 'warning'
    }
  }

  const { resident } = useResidentStore()

  const [workType, setWorkType] = useState([])
  const [sheetOpen, setSheetOpen] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [deleteRequest, setDeleteRequest] = useState(null)

  const openRequest = (req) => {
    setSelectedRequest(req)
    setSheetOpen(true)
  }

  useEffect(() => {
    fetchWorkTypeData()
  }, [])
  const queryClient = useQueryClient()

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

  const {
    data: requestsData,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['maintenanceRequests'],
    queryFn: () => getMaintenanceRequestsApi(resident.id)
  })

  const requests = requestsData?.data?.requests || []

  const [isOpenModal, setIsOpenModal] = useState(false)

  const fetchWorkTypeData = async () => {
    try {
      const res = await getAllWorkType()
      setWorkType(res.data.workType)
    } catch (error) {
      console.error('Error fetching maintenance data:', error)
    }
  }

  const createRequestMutation = useMutation({
    mutationFn: (data) => createMaintenanceRequestApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['maintenanceRequests'] })
      toast.success('Tạo yêu cầu bảo trì thành công')
    },
    onError: () => {
      toast.error('Tạo yêu cầu bảo trì thất bại')
    }
  })

  const handleCreateNewRequest = (data) => {
    createRequestMutation.mutate(data)
  }

  const deleteRequestMutation = useMutation({
    mutationFn: (id) => deleteMaintenanceRequestApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['maintenanceRequests'] })
      toast.success('Xóa yêu cầu thành công!')
      setDeleteRequest(null)
    },
    onError: () => {
      toast.error('Không thể xóa yêu cầu!')
    }
  })

  const handleDeleteRequest = (id) => {
    deleteRequestMutation.mutate(id)
  }

  const [lightboxImage, setLightboxImage] = useState(null) // for fullscreen preview

  // Convert status number → label
  const requestStatusMap = {
    0: 'Đang chờ xử lý',
    1: 'Đã hoàn thành',
    2: 'Đã hủy',
    3: 'Đang xử lý'
  }

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error loading</div>

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="mb-6">
        <h2 className="mb-2 text-2xl font-bold text-gray-800">Phản ánh</h2>
        <p className="text-gray-600">
          Nơi giúp bạn giải quyết được những vấn đề khó khăn gặp phải
        </p>
      </div>
      <Button variant="blue" onClick={() => setIsOpenModal(true)}>
        Tạo phản ánh
      </Button>

      {/* Modal Create */}
      <MaintenanceRequestModal
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        workType={workType}
        onSubmit={handleCreateNewRequest}
      />

      {/* Modal Detail */}
      <ModalDetailRequest
        sheetOpen={sheetOpen}
        setSheetOpen={setSheetOpen}
        selectedRequest={selectedRequest}
        setLightboxImage={setLightboxImage}
      />

      {/* Modal View Scale Image */}
      <LightboxModal
        imageSrc={lightboxImage}
        onClose={() => setLightboxImage(null)}
      />

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {requests.map((item) => (
          <div
            key={item.id}
            className="group relative col-span-1 overflow-hidden rounded-lg border bg-white shadow-sm transition-all hover:shadow-lg">
            <div
              className="cursor-pointer p-4"
              onClick={() => {
                openRequest(item)
              }}>
              <div className="flex items-center justify-between border-b pb-3">
                <Badge
                  variant={
                    statusColorLabel[item.status]?.variant || 'secondary'
                  }>
                  {statusColorLabel[item.status]?.label ||
                    requestStatusMap[item.status]}
                </Badge>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">
                    {item.created_at &&
                      format(new Date(item.created_at), 'HH:mm dd/MM/yyyy')}
                  </span>
                  <Button
                    variant="icon"
                    size="icon-sm"
                    className="text-red-600 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-red-50"
                    onClick={(e) => {
                      e.stopPropagation()
                      setDeleteRequest(item)
                    }}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="mt-3 space-y-1">
                <h3 className="mb-1 font-bold text-gray-900">{item.title}</h3>
                <p className="line-clamp-3 text-sm text-gray-500">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ConfirmDialog
        open={!!deleteRequest}
        onOpenChange={(open) => !open && setDeleteRequest(null)}
        title="Bạn chắc chắn muốn xóa?"
        description={`Bạn có chắc muốn xóa yêu cầu ${deleteRequest?.title}?`}
        onConfirm={() => handleDeleteRequest(deleteRequest.id)}
        isLoading={deleteRequestMutation.isPending}
        variant="destructive"
      />
    </div>
  )
}
