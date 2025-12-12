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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { format } from 'date-fns'
import { io } from 'socket.io-client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export default function Maintenance() {
  const statusColorLabel = {
    0: {
      label: 'Đang chờ xử lý', // Pending
      class: 'border border-blue-400 text-blue-600 bg-blue-50'
    },
    3: {
      label: 'Đang xử lý', // In Progress
      class: 'border border-yellow-400 text-yellow-600 bg-yellow-50'
    },
    1: {
      label: 'Đã hoàn thành', // Completed
      class: 'border border-green-400 text-green-600 bg-green-50'
    },
    2: {
      label: 'Đã hủy', // Cancelled
      class: 'border border-red-600 bg-red-600 text-white'
    },

    default: {
      label: 'Không xác định', // Undefined
      class: 'border border-gray-400 text-gray-600 bg-gray-50'
    }
  }

  const { resident } = useResidentStore()

  const [workType, setWorkType] = useState([])
  const [sheetOpen, setSheetOpen] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState(null)

  const openRequest = (req) => {
    setSelectedRequest(req)
    setSheetOpen(true)
  }

  useEffect(() => {
    fetchWorkTypeData()
  }, [])
  const queryClient = useQueryClient()

  useEffect(() => {
    const socket = io('http://localhost:8080')

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

  const requests = requestsData?.data.requests

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
      <Button onClick={() => setIsOpenModal(true)}>Tạo phản ánh</Button>

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
          <div className="bg-card border-border relative col-span-1 overflow-hidden rounded-lg border shadow-sm transition-all hover:shadow-lg">
            {/* Nút Xóa */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button
                  onClick={(e) => {
                    e.stopPropagation() // không cho mở modal detail
                  }}
                  className="absolute right-2 bottom-2 cursor-pointer rounded bg-red-500 px-2 py-1 text-xs font-semibold text-white hover:bg-red-600">
                  Xóa
                </button>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Bạn chắc chắn muốn xóa?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Yêu cầu này sẽ bị xóa vĩnh viễn và không thể khôi phục.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel>Hủy</AlertDialogCancel>

                  <AlertDialogAction
                    onClick={() => handleDeleteRequest(item.id)}
                    className="bg-red-600 text-white hover:bg-red-700">
                    Xóa
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <div
              className="cursor-pointer p-4"
              onClick={() => {
                openRequest(item)
              }}>
              <div className="border-border flex items-center justify-between border-b pb-3">
                <span
                  className={` ${statusColorLabel[item.status].class} rounded-full border px-3 py-1 text-xs font-semibold`}>
                  {statusColorLabel[item.status].label ||
                    requestStatusMap[item.status]}
                </span>
                <span className="text-muted-foreground text-xs">
                  {item.created_at &&
                    format(new Date(item.created_at), 'HH:mm dd/MM/yyyy')}
                </span>
              </div>

              <div className="mt-3 flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="text-card-foreground mb-1 font-bold">
                    {item.title}
                  </h3>
                </div>
              </div>

              <p className="text-muted-foreground line-clamp-3 text-sm">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
