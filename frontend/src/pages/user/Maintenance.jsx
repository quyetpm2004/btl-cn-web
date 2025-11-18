import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter
} from '@/components/ui/sheet'
import MaintenanceRequestModal from './MaintenanceRequestModal'
import {
  createMaintenanceRequestApi,
  getAllEquipmentApi,
  getMaintenanceRequestsApi
} from '@/services/api'
import { useResidentStore } from '@/stores/useResidentStore'
import { toast } from 'sonner'
import { PencilLine, Trash2 } from 'lucide-react'
import EditMaintenanceRequestModal from './EditMaintenanceRequestModal'

export default function Maintenance() {
  // Convert priority number → label
  const priorityMap = {
    1: {
      label: 'Thấp',
      class: 'border border-green-400 text-green-600 bg-green-50'
    },
    2: {
      label: 'Trung bình',
      class: 'border border-yellow-400 text-yellow-600 bg-yellow-50'
    },
    3: {
      label: 'Cao',
      class: 'border border-red-400 text-red-600 bg-red-50'
    },
    4: {
      label: 'Khẩn cấp',
      class: 'border border-red-600 bg-red-600 text-white'
    }
  }

  // Convert status number → label
  const requestStatusMap = {
    0: 'Đang chờ xử lý',
    1: 'Đang xử lý',
    2: 'Đã hoàn thành',
    3: 'Đã hủy'
  }

  const scheduleStatusMap = {
    0: 'Đã lên lịch',
    1: 'Đã hoàn thành'
  }

  const { resident } = useResidentStore()

  const [maintenanceRequests, setMaintenanceRequests] = useState([])
  const [maintenanceSchedules, setMaintenanceSchedules] = useState([])
  const [equipments, setEquipments] = useState([])
  const [sheetOpen, setSheetOpen] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState(null)

  const openRequest = (req) => {
    console.log('Opening request:', req)
    setSelectedRequest(req)
    setSheetOpen(true)
  }

  const fetchData = async () => {
    try {
      const residentId = resident?.id
      const res = await getMaintenanceRequestsApi(residentId)
      setMaintenanceRequests(res.data.requests)
    } catch (error) {
      console.error('Error fetching maintenance data:', error)
    }
  }

  useEffect(() => {
    fetchData()
    fetchEquipmentData()
  }, [])

  const [isOpenModal, setIsOpenModal] = useState(false)

  const fetchEquipmentData = async () => {
    try {
      const res = await getAllEquipmentApi()
      setEquipments(res.data.equipments)
    } catch (error) {
      console.error('Error fetching maintenance data:', error)
    }
  }

  const handleCreateNewRequest = async (data) => {
    console.log('Creating new maintenance request with data:', data)
    const res = await createMaintenanceRequestApi(data)
    if (res.data) {
      fetchData()
      toast.success('Tạo yêu cầu bảo trì thành công')
    } else {
      toast.error('Tạo yêu cầu bảo trì thất bại')
    }
  }

  const baseURL =
    import.meta.env.VITE_BASE_URL_BACKEND || 'http://localhost:8000'

  const [isOpenEditModal, setIsOpenEditModal] = useState(false)
  const [editInitialData, setEditInitialData] = useState(null)

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="mb-6">
        <h2 className="mb-2 text-2xl font-bold text-gray-800">
          Bảo trì thiết bị
        </h2>
        <p className="text-gray-600">
          Nơi giúp bạn giải quyết được những vấn đề khó khăn gặp phải
        </p>
      </div>
      <Card className="border shadow-none">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold">
            Yêu cầu bảo trì thiết bị
          </CardTitle>
          <Button onClick={() => setIsOpenModal(true)}>Tạo yêu cầu</Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Thiết bị</TableHead>
                <TableHead>Mô tả</TableHead>
                <TableHead>Ưu tiên</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Ngày gửi</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {maintenanceRequests.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={9}
                    className="py-4 text-center text-gray-500">
                    Chưa có yêu cầu nào
                  </TableCell>
                </TableRow>
              )}

              {maintenanceRequests.map((req) => (
                <TableRow
                  key={req.id}
                  className="cursor-pointer hover:bg-gray-50">
                  <TableCell
                    onClick={() => openRequest(req)}
                    className="font-medium">
                    {equipments.find(
                      (equipment) => equipment.id === req.equipment_id
                    )?.name || '—'}
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {req.description}
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant="outline"
                      className={priorityMap[req.priority].class}>
                      {priorityMap[req.priority].label}
                    </Badge>
                  </TableCell>

                  <TableCell>{requestStatusMap[req.status]}</TableCell>
                  <TableCell>
                    {new Date(req.createdAt).toLocaleString('vi-VN', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit'
                    })}
                  </TableCell>
                  <TableCell className="flex items-center gap-2">
                    <PencilLine
                      size={20}
                      onClick={() => {
                        setEditInitialData(req)
                        setIsOpenEditModal(true)
                      }}
                    />{' '}
                    <Trash2 size={20} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="border shadow-none">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Danh sách hoàn thành
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Thiết bị</TableHead>
                <TableHead>Bắt đầu</TableHead>
                <TableHead>Kết thúc</TableHead>
                <TableHead>Nhân viên</TableHead>
                <TableHead>Ghi chú</TableHead>
                <TableHead>Trạng thái</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {maintenanceSchedules.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="py-4 text-center text-gray-500">
                    Chưa có lịch bảo trì
                  </TableCell>
                </TableRow>
              )}

              {maintenanceSchedules.map((sch) => (
                <TableRow key={sch.id}>
                  <TableCell>{sch.id}</TableCell>
                  <TableCell>{sch.equipment_name}</TableCell>
                  <TableCell>{sch.start_at}</TableCell>
                  <TableCell>{sch.end_at}</TableCell>
                  <TableCell>{sch.staff_name}</TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {sch.description}
                  </TableCell>

                  <TableCell>
                    <Badge variant="outline">
                      {scheduleStatusMap[sch.status]}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <MaintenanceRequestModal
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        equipments={equipments}
        onSubmit={handleCreateNewRequest}
      />

      {/* Request Details Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Yêu cầu bảo trì</SheetTitle>
            <SheetDescription>
              {selectedRequest
                ? equipments.find((e) => e.id === selectedRequest.equipment_id)
                    ?.name
                : ''}
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-4 p-4">
            <div>
              <p className="text-sm text-gray-600">Mô tả</p>
              <p className="font-medium">{selectedRequest?.description}</p>
            </div>

            <div>
              <p className="text-sm text-gray-600">Ưu tiên</p>
              <p className="font-medium">
                {selectedRequest
                  ? priorityMap[selectedRequest.priority]?.label
                  : '—'}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-600">Trạng thái</p>
              <p className="font-medium">
                {selectedRequest
                  ? requestStatusMap[selectedRequest.status]
                  : '—'}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-600">Hình ảnh</p>
              <div className="mt-2">
                {(() => {
                  let imgs = []

                  if (typeof selectedRequest?.images === 'string') {
                    imgs = JSON.parse(selectedRequest.images)
                  } else if (Array.isArray(selectedRequest?.images)) {
                    imgs = selectedRequest.images
                  }

                  if (!imgs || imgs.length === 0) {
                    return (
                      <p className="text-sm text-gray-500">Không có hình ảnh</p>
                    )
                  }

                  return (
                    <div className="grid grid-cols-2 gap-2">
                      {imgs.map((img, idx) => {
                        const src = `${baseURL}/images/avatar/${img}`
                        return (
                          <div
                            key={idx}
                            className="overflow-hidden rounded bg-gray-100">
                            <img
                              src={src}
                              alt={`img-${idx}`}
                              className="h-40 w-full object-cover"
                            />
                          </div>
                        )
                      })}
                    </div>
                  )
                })()}
              </div>
            </div>
          </div>

          <SheetFooter>
            <div className="flex justify-end">
              <Button variant="outline" onClick={() => setSheetOpen(false)}>
                Đóng
              </Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <EditMaintenanceRequestModal
        isOpenModal={isOpenEditModal}
        initialData={editInitialData}
        setIsOpenModal={setIsOpenEditModal}
        equipments={equipments}
        onSubmit={() => {}}
      />
    </div>
  )
}
