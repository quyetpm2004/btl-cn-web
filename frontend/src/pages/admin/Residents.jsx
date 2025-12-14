import { Input } from '@/components/ui/input'
import { Edit, Trash2, Eye } from 'lucide-react'
import {
  filterResidentsApi,
  createResidentApi,
  updateResidentApi,
  deleteResidentApi
} from '@/services/resident.api.js'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select.jsx'
import { PaginationControls } from '@/components/pagination-controls.jsx'
import { ResidentsDialog } from '@/components/residents/residents-dialog.jsx'
import { ConfirmDialog } from '@/components/confirm-dialog.jsx'
import { usePagination } from '@/hooks/use-pagination'
import { useEffect, useState, useMemo } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query'
import { Badge } from '@/components/ui/badge'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'

export const Residents = () => {
  const queryClient = useQueryClient()
  const [queryInput, setQueryInput] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogMode, setDialogMode] = useState('view') // 'view', 'edit', 'create'
  const [selectedResident, setSelectedResident] = useState(null)
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    resident: null
  })

  const pagination = usePagination(1, 10)

  const filters = useMemo(
    () => ({
      page: pagination.page,
      limit: pagination.limit,
      full_name: searchQuery,
      status: statusFilter
    }),
    [pagination.page, pagination.limit, searchQuery, statusFilter]
  )

  // Query residents
  const {
    data: residentsData,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['residents', filters],
    queryFn: () => filterResidentsApi(filters),
    placeholderData: keepPreviousData
  })

  const residents = residentsData?.items || []

  // Sync total items to pagination
  useEffect(() => {
    if (residentsData?.total !== undefined) {
      pagination.setTotal(residentsData.total)
    }
  }, [residentsData?.total, pagination])

  // Mutations
  const createMutation = useMutation({
    mutationFn: createResidentApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['residents'] })
      toast.success('Thêm cư dân thành công', { id: 'resident-save-success' })
      handleCloseDialog()
      pagination.setPage(1)
    },
    onError: (error) => {
      toast.error('Thêm cư dân thất bại', { id: 'resident-save-error' })
      console.error(error)
    }
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateResidentApi(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['residents'] })
      toast.success('Cập nhật thông tin cư dân thành công', {
        id: 'resident-save-success'
      })
      handleCloseDialog()
    },
    onError: (error) => {
      toast.error('Cập nhật thất bại', { id: 'resident-save-error' })
      console.error(error)
    }
  })

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteResidentApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['residents'] })
      toast.success('Xóa cư dân thành công')
      setDeleteDialog((prev) => ({ ...prev, open: false, resident: null }))
      pagination.setPage(1)
    },
    onError: (error) => {
      toast.error('Lỗi khi xóa cư dân')
      console.error(error)
    }
  })

  const handleSearch = () => {
    pagination.setPage(1)
    setSearchQuery(queryInput)
  }

  const handleStatusChange = (value) => {
    pagination.setPage(1)
    setStatusFilter(value)
  }

  const handleReset = () => {
    setQueryInput('')
    setSearchQuery('')
    setStatusFilter('')
  }

  const handleOpenDialog = (resident = null, mode = 'view') => {
    setSelectedResident(resident)
    setDialogMode(mode)
    setDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setDialogOpen(false)
    setSelectedResident(null)
    setDialogMode('view')
  }

  const handleSaveResident = async (formData) => {
    if (dialogMode === 'create') {
      const payload = {
        ...formData,
        registered_at: new Date().toISOString().split('T')[0]
      }
      return createMutation.mutateAsync(payload)
    } else if (dialogMode === 'edit' && selectedResident?.id) {
      return updateMutation.mutateAsync({
        id: selectedResident.id,
        data: formData
      })
    } else {
      handleCloseDialog()
    }
  }

  const handleDeleteResident = (resident) => {
    setDeleteDialog({ open: true, resident })
  }

  const handleConfirmDelete = () => {
    if (!deleteDialog.resident) return
    deleteMutation.mutate(deleteDialog.resident.id)
  }

  if (isError) return <div>Lỗi tải dữ liệu</div>

  return (
    <div className="animate-in fade-in duration-300">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="mb-2 text-2xl font-bold text-gray-800">
            Quản lý Cư dân
          </h2>
          <p className="text-gray-600">Quản lý thông tin và hồ sơ cư dân</p>
        </div>
        <Button onClick={() => handleOpenDialog(null, 'create')} variant="blue">
          <i className="fas fa-plus"></i>
          Thêm cư dân
        </Button>
      </div>

      <div className="mb-6 rounded-xl bg-white p-4 shadow-sm">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-10">
          <div className="relative md:col-span-3">
            <Input
              name="search"
              type="text"
              placeholder="Tìm kiếm cư dân..."
              value={queryInput}
              onChange={(e) => setQueryInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button
              variant="icon"
              onClick={handleSearch}
              size="icon"
              className="absolute right-0.5 text-gray-500 hover:text-blue-500">
              <i className="fas fa-search"></i>
            </Button>
          </div>

          <div className="md:col-span-2 md:col-start-8">
            <Select
              value={statusFilter || '-1'}
              onValueChange={(value) =>
                handleStatusChange(value === '-1' ? '' : value)
              }>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Tất cả trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="-1">Tất cả trạng thái</SelectItem>
                <SelectItem value="1">Đang ở</SelectItem>
                <SelectItem value="2">Tạm vắng</SelectItem>
                <SelectItem value="3">Đã chuyển đi</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleReset} variant="outline">
            Đặt lại
          </Button>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow className="hover:bg-transparent">
              <TableHead className="py-4 pl-6 font-medium text-gray-500">
                Cư dân
              </TableHead>
              <TableHead className="py-4 font-medium text-gray-500">
                Căn hộ
              </TableHead>
              <TableHead className="py-4 font-medium text-gray-500">
                Giới tính
              </TableHead>
              <TableHead className="py-4 font-medium text-gray-500">
                Căn cước
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
            {isLoading && (!residents || residents.length === 0) && (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-gray-500">
                  Đang tải danh sách...
                </TableCell>
              </TableRow>
            )}

            {!isLoading && (!residents || residents.length === 0) && (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-gray-500">
                  Không có dữ liệu
                </TableCell>
              </TableRow>
            )}

            {residents.map((resident) => (
              <TableRow key={resident?.id} className="group h-14">
                <TableCell className="pl-6 font-medium">
                  {resident?.full_name}
                </TableCell>
                <TableCell>
                  {resident?.apartments?.length > 0
                    ? resident.apartments
                        .map((apt) => apt.apartment_code)
                        .join(', ')
                    : '—'}
                </TableCell>
                <TableCell>
                  {resident?.gender === 1
                    ? 'Nam'
                    : resident?.gender === 2
                      ? 'Nữ'
                      : 'Khác'}
                </TableCell>
                <TableCell>{resident?.id_card || '—'}</TableCell>
                <TableCell className="w-44">
                  <Badge
                    className={`${resident?.status === 1 ? 'bg-green-100 text-green-800' : resident?.status === 2 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-800'}`}>
                    {resident?.status === 1
                      ? 'Đang ở'
                      : resident?.status === 2
                        ? 'Tạm vắng'
                        : 'Đã chuyển đi'}
                  </Badge>
                </TableCell>
                <TableCell className="w-40 space-x-2 pr-6 text-right opacity-0 transition-opacity group-hover:opacity-100">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="icon"
                          size="icon-sm"
                          onClick={() => handleOpenDialog(resident, 'view')}
                          className="text-gray-600 hover:bg-gray-100">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Xem chi tiết</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="icon"
                          size="icon-sm"
                          onClick={() => handleOpenDialog(resident, 'edit')}
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
                          onClick={() => handleDeleteResident(resident)}
                          className="text-red-600 hover:bg-red-50">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Xóa</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <PaginationControls pagination={pagination} />
      </div>

      <ResidentsDialog
        mode={dialogMode}
        open={dialogOpen}
        onOpenChange={handleCloseDialog}
        resident={selectedResident}
        onSave={handleSaveResident}
      />

      <ConfirmDialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog({ ...deleteDialog, open })}
        title="Xác nhận xóa cư dân"
        description={`Bạn có chắc muốn xóa cư dân ${deleteDialog.resident?.full_name}?`}
        confirmText="Xóa"
        cancelText="Hủy"
        onConfirm={handleConfirmDelete}
        isLoading={deleteMutation.isPending}
        variant="destructive"
      />
    </div>
  )
}
