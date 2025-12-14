import { useState } from 'react'
import { Edit, Trash2, CheckCircle, Clock, Lock, FileText } from 'lucide-react'
import {
  keepPreviousData,
  useQuery,
  useMutation,
  useQueryClient
} from '@tanstack/react-query'
import {
  getAllActiveServicesApi,
  createServiceApi,
  updateServiceApi,
  deleteServiceApi
} from '@/services/service.api'
import {
  getAllCollectionPeriodsApi,
  createCollectionPeriodApi,
  updateCollectionPeriodApi,
  closeCollectionPeriodApi,
  deleteCollectionPeriodApi
} from '@/services/collectionPeriod.api'
import { generateInvoicesApi } from '@/services/invoice.api'
import { toast } from 'sonner'
import { ServiceDialog } from '@/components/fees/service-dialog'
import { PeriodDialog } from '@/components/fees/period-dialog'
import { Button } from '@/components/ui/button'
import { ConfirmDialog } from '@/components/confirm-dialog'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { format } from 'date-fns'
import { Badge } from '../../../components/ui/badge'
import { useAuthStore } from '../../../stores/useAuthStore'

const types = {
  1: 'Hàng tháng',
  2: 'Hàng quý',
  3: 'Hàng năm'
}

export const Services = () => {
  const user = useAuthStore((s) => s.user)
  const queryClient = useQueryClient()

  const [activeTab, setActiveTab] = useState('services')
  const [confirmDialog, setConfirmDialog] = useState({
    type: null,
    open: false,
    data: null
  })

  // Service State
  const [showServiceModal, setShowServiceModal] = useState(false)
  const [selectedService, setSelectedService] = useState(null)
  const [serviceMode, setServiceMode] = useState('create')

  // Period State (Mock for now as API is missing)
  const [showPeriodModal, setShowPeriodModal] = useState(false)
  const [selectedPeriod, setSelectedPeriod] = useState(null)
  const [periodMode, setPeriodMode] = useState('create')

  // --- Queries ---
  const {
    data: serviceData,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['services'],
    queryFn: () => getAllActiveServicesApi(),
    placeholderData: keepPreviousData
  })

  const services = serviceData?.services || []

  const { data: periodData, isLoading: isPeriodLoading } = useQuery({
    queryKey: ['periods'],
    queryFn: () => getAllCollectionPeriodsApi(),
    placeholderData: keepPreviousData
  })

  const periods = periodData?.collectionPeriods || []

  // --- Mutations Services ---
  const createServiceMutation = useMutation({
    mutationFn: createServiceApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] })
      toast.success('Thêm dịch vụ thành công')
      setShowServiceModal(false)
    },
    onError: (error) => {
      toast.error('Thêm dịch vụ thất bại')
      console.error(error)
    }
  })

  const updateServiceMutation = useMutation({
    mutationFn: ({ id, data }) => updateServiceApi(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] })
      toast.success('Cập nhật dịch vụ thành công')
      setShowServiceModal(false)
    },
    onError: (error) => {
      toast.error('Cập nhật dịch vụ thất bại')
      console.error(error)
    }
  })

  const deleteServiceMutation = useMutation({
    mutationFn: deleteServiceApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] })
      toast.success('Xóa dịch vụ thành công')
      setConfirmDialog({ type: null, open: false, data: null })
    },
    onError: (error) => {
      toast.error('Xóa dịch vụ thất bại')
      console.error(error)
    }
  })

  // --- Mutations Periods ---
  const createPeriodMutation = useMutation({
    mutationFn: createCollectionPeriodApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['periods'] })
      toast.success('Thêm đợt thu phí thành công')
      setShowPeriodModal(false)
    },
    onError: (error) => {
      toast.error('Thêm đợt thu phí thất bại')
      console.error(error)
    }
  })

  const updatePeriodMutation = useMutation({
    mutationFn: ({ id, data }) => updateCollectionPeriodApi(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['periods'] })
      toast.success('Cập nhật đợt thu phí thành công')
      setShowPeriodModal(false)
    },
    onError: (error) => {
      toast.error('Cập nhật đợt thu phí thất bại')
      console.error(error)
    }
  })

  const deletePeriodMutation = useMutation({
    mutationFn: deleteCollectionPeriodApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['periods'] })
      toast.success('Xóa đợt thu phí thành công')
      setConfirmDialog({ type: null, open: false, data: null })
    },
    onError: (error) => {
      toast.error('Xóa đợt thu phí thất bại')
      console.error(error)
    }
  })

  const closePeriodMutation = useMutation({
    mutationFn: closeCollectionPeriodApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['periods'] })
      toast.success('Đóng đợt thu phí thành công')
      setShowPeriodModal(false)
      setConfirmDialog({ type: null, open: false, data: null })
    },
    onError: (error) => {
      toast.error('Đóng đợt thu phí thất bại')
      console.error(error)
    }
  })

  const generateInvoicesMutation = useMutation({
    mutationFn: generateInvoicesApi,
    onSuccess: () => {
      toast.success('Đã tạo hóa đơn thành công')
      setConfirmDialog({ type: null, open: false, data: null })
    },
    onError: (error) => {
      toast.error(
        'Tạo hóa đơn thất bại: ' +
          (error.response?.data?.message || error.message)
      )
    }
  })

  // --- Handlers Services ---
  const handleCreateService = (data) => {
    createServiceMutation.mutate(data)
  }

  const handleUpdateService = (data) => {
    if (selectedService) {
      updateServiceMutation.mutate({ id: selectedService.id, data })
    }
  }

  const handleDeleteService = (service) => {
    setConfirmDialog({ type: 'delete_service', open: true, data: service })
  }

  const openCreateServiceModal = () => {
    setSelectedService(null)
    setServiceMode('create')
    setShowServiceModal(true)
  }

  const openEditServiceModal = (service) => {
    setSelectedService(service)
    setServiceMode('edit')
    setShowServiceModal(true)
  }

  // --- Handlers Periods ---
  const handleCreatePeriod = (data) => {
    createPeriodMutation.mutate(data)
  }

  const handleUpdatePeriod = (data) => {
    if (selectedPeriod) {
      updatePeriodMutation.mutate({ id: selectedPeriod.id, data })
    }
  }

  const handleDeletePeriod = (period) => {
    setConfirmDialog({ type: 'delete_period', open: true, data: period })
  }

  const handleClosePeriod = (period) => {
    setConfirmDialog({ type: 'close_period', open: true, data: period })
  }

  const handleGenerateInvoices = (period) => {
    setConfirmDialog({ type: 'generate_invoices', open: true, data: period })
  }

  const openCreatePeriodModal = () => {
    setSelectedPeriod(null)
    setPeriodMode('create')
    setShowPeriodModal(true)
  }

  const openEditPeriodModal = (period) => {
    setSelectedPeriod(period)
    setPeriodMode('edit')
    setShowPeriodModal(true)
  }

  if (isError) return <div>Lỗi tải dữ liệu</div>

  return (
    <div className="animate-in fade-in duration-300">
      <div className="mb-6">
        <h2 className="mb-2 text-2xl font-bold text-gray-800">
          Dịch vụ & Đợt thu
        </h2>
        <p className="text-gray-600">
          Quản lý danh mục dịch vụ và các đợt thu phí
        </p>
      </div>
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('services')}
            className={`cursor-pointer border-b-2 px-1 py-4 text-sm font-medium ${
              activeTab === 'services'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            }`}>
            Dịch vụ
          </button>
          <button
            onClick={() => setActiveTab('periods')}
            className={`cursor-pointer border-b-2 px-1 py-4 text-sm font-medium ${
              activeTab === 'periods'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            }`}>
            Đợt thu phí
          </button>
        </nav>
      </div>
      {/* Content */}
      <div className="mt-6">
        {activeTab === 'services' ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between rounded-xl bg-white p-4 shadow-sm">
              <div>
                <h3 className="text-lg font-bold text-gray-800">
                  Danh sách dịch vụ
                </h3>
                <p className="text-sm text-gray-500">
                  Quản lý các dịch vụ cung cấp cho cư dân
                </p>
              </div>
              <Button onClick={openCreateServiceModal} variant="blue">
                <i className="fas fa-plus"></i>
                Thêm dịch vụ
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {isLoading && (!services || services.length === 0) && (
                <div className="col-span-full text-center text-gray-500">
                  Đang tải danh sách...
                </div>
              )}

              {!isLoading && (!services || services.length === 0) && (
                <div className="col-span-full text-center text-gray-500">
                  Không có dữ liệu
                </div>
              )}

              {services.map((service) => (
                <div
                  key={service.id}
                  className="group relative rounded-xl bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="icon"
                            size="icon-sm"
                            onClick={() => openEditServiceModal(service)}
                            className="text-blue-600 hover:bg-blue-50">
                            <Edit className="h-4 w-4" />
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
                            onClick={() => handleDeleteService(service)}
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

                  <div className="mb-4">
                    <h3 className="font-bold text-gray-900">{service.name}</h3>
                    <p className="mt-1 line-clamp-2 text-xs text-gray-500">
                      {service.description}
                    </p>
                  </div>

                  <div className="flex items-end justify-between border-t border-gray-100 pt-4">
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase">
                        Đơn giá
                      </p>
                      <p className="text-lg font-bold text-gray-900">
                        {service.price.toLocaleString('vi-VN')}{' '}
                        <span className="text-sm font-normal text-gray-500">
                          / {service.unit}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between rounded-xl bg-white p-4 shadow-sm">
              <div>
                <h3 className="text-lg font-bold text-gray-800">Đợt thu phí</h3>
                <p className="text-sm text-gray-500">
                  Quản lý các kỳ chốt sổ và phát hành hóa đơn
                </p>
              </div>
              <Button onClick={openCreatePeriodModal} variant="blue">
                <i className="fas fa-plus"></i>
                Mở đợt thu mới
              </Button>
            </div>

            <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="py-4 pl-6 font-medium text-gray-500">
                      Tên đợt
                    </TableHead>
                    <TableHead className="py-4 font-medium text-gray-500">
                      Loại
                    </TableHead>
                    <TableHead className="py-4 font-medium text-gray-500">
                      Thời gian
                    </TableHead>
                    <TableHead className="py-4 font-medium text-gray-500">
                      Trạng thái
                    </TableHead>
                    <TableHead className="py-4 pr-6 text-right font-medium text-gray-500">
                      Thao tác
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isPeriodLoading && (!periods || periods.length === 0) && (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-center text-gray-500">
                        Đang tải danh sách...
                      </TableCell>
                    </TableRow>
                  )}

                  {!isPeriodLoading && (!periods || periods.length === 0) && (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-center text-gray-500">
                        Không có dữ liệu
                      </TableCell>
                    </TableRow>
                  )}

                  {periods.map((period) => (
                    <TableRow key={period?.id} className="group h-14">
                      <TableCell className="pl-6 font-medium">
                        {period?.name}
                      </TableCell>
                      <TableCell>{types[period?.type]}</TableCell>
                      <TableCell>
                        {period?.start_date
                          ? format(new Date(period.start_date), 'dd/MM/yyyy')
                          : ''}{' '}
                        -{' '}
                        {period?.end_date
                          ? format(new Date(period.end_date), 'dd/MM/yyyy')
                          : ''}
                      </TableCell>
                      <TableCell>
                        {period?.status ? (
                          <Badge className="bg-green-100 text-green-700">
                            <CheckCircle /> Đang mở
                          </Badge>
                        ) : (
                          <Badge className="bg-gray-100 text-gray-600">
                            <Clock /> Đã đóng
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="pr-6">
                        <div className="flex justify-end gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="icon"
                                  size="icon-sm"
                                  onClick={() => handleGenerateInvoices(period)}
                                  className="text-purple-600 hover:bg-purple-50"
                                  disabled={!period.status}>
                                  <FileText className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Tạo hóa đơn</p>
                              </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="icon"
                                  size="icon-sm"
                                  onClick={() => handleClosePeriod(period)}
                                  className="text-gray-600 hover:bg-gray-100">
                                  <Lock className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Đóng đợt thu</p>
                              </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="icon"
                                  size="icon-sm"
                                  onClick={() => openEditPeriodModal(period)}
                                  className="text-blue-600 hover:bg-blue-50">
                                  <Edit className="h-4 w-4" />
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
                                  onClick={() => handleDeletePeriod(period)}
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
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </div>
      <ServiceDialog
        open={showServiceModal}
        onOpenChange={setShowServiceModal}
        mode={serviceMode}
        service={selectedService}
        onSave={
          serviceMode === 'create' ? handleCreateService : handleUpdateService
        }
      />
      <PeriodDialog
        open={showPeriodModal}
        onOpenChange={setShowPeriodModal}
        mode={periodMode}
        period={selectedPeriod}
        onSave={
          periodMode === 'create' ? handleCreatePeriod : handleUpdatePeriod
        }
      />
      <ConfirmDialog
        open={confirmDialog.open}
        onOpenChange={(open) => setConfirmDialog((prev) => ({ ...prev, open }))}
        title={
          confirmDialog.type === 'delete_service'
            ? 'Xác nhận xóa dịch vụ'
            : confirmDialog.type === 'delete_period'
              ? 'Xác nhận xóa đợt thu phí'
              : confirmDialog.type === 'close_period'
                ? 'Xác nhận đóng đợt thu phí'
                : 'Xác nhận tạo hóa đơn'
        }
        description={
          confirmDialog.type === 'delete_service'
            ? `Bạn có chắc chắn muốn xóa dịch vụ ${confirmDialog.data?.name}?`
            : confirmDialog.type === 'delete_period'
              ? `Bạn có chắc chắn muốn xóa đợt thu phí ${confirmDialog.data?.name}?`
              : confirmDialog.type === 'close_period'
                ? `Bạn có chắc chắn muốn đóng đợt thu phí ${confirmDialog.data?.name}?`
                : `Bạn có chắc chắn muốn tạo hóa đơn cho đợt thu ${confirmDialog.data?.name}?`
        }
        onConfirm={() => {
          if (confirmDialog.type === 'delete_service') {
            deleteServiceMutation.mutate(confirmDialog.data.id)
          } else if (confirmDialog.type === 'delete_period') {
            deletePeriodMutation.mutate(confirmDialog.data.id)
          } else if (confirmDialog.type === 'close_period') {
            closePeriodMutation.mutate(confirmDialog.data.id)
          } else if (confirmDialog.type === 'generate_invoices') {
            generateInvoicesMutation.mutate({
              periodId: confirmDialog.data.id,
              userId: user.id
            })
          }
        }}
        isLoading={
          confirmDialog.type === 'delete_service'
            ? deleteServiceMutation.isPending
            : confirmDialog.type === 'delete_period'
              ? deletePeriodMutation.isPending
              : confirmDialog.type === 'close_period'
                ? closePeriodMutation.isPending
                : generateInvoicesMutation.isPending
        }
        color={confirmDialog.type === 'delete_period' ? 'destructive' : 'blue'}
      />
    </div>
  )
}
