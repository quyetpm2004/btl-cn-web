import { Input } from '@/components/ui/input'
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
    <>
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

      <div className="rounded-xl bg-white shadow-sm">
        <div className="border-b border-gray-200 p-6">
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
                className="absolute right-0.5 cursor-pointer text-gray-500 hover:text-blue-500">
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

        <div className="p-6">
          <div className="overflow-hidden rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>Cư dân</TableHead>
                  <TableHead>Căn hộ</TableHead>
                  <TableHead>Giới tính</TableHead>
                  <TableHead>Căn cước</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading && (!residents || residents.length === 0) && (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center text-gray-500">
                      Đang tải danh sách...
                    </TableCell>
                  </TableRow>
                )}

                {!isLoading && (!residents || residents.length === 0) && (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center text-gray-500">
                      Không có dữ liệu
                    </TableCell>
                  </TableRow>
                )}

                {residents.map((resident) => (
                  <TableRow key={resident?.id}>
                    <TableCell className="font-medium">
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
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-semibold ${resident?.status === 1 ? 'bg-green-100 text-green-800' : resident?.status === 2 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-800'}`}>
                        {resident?.status === 1
                          ? 'Đang ở'
                          : resident?.status === 2
                            ? 'Tạm vắng'
                            : 'Đã chuyển đi'}
                      </span>
                    </TableCell>
                    <TableCell className="w-40">
                      <div className="space-x-4">
                        <button
                          onClick={() => handleOpenDialog(resident, 'view')}
                          className="cursor-pointer font-bold text-blue-500 hover:text-blue-700">
                          Xem
                        </button>
                        <button
                          onClick={() => handleOpenDialog(resident, 'edit')}
                          className="cursor-pointer font-bold text-yellow-500 hover:text-yellow-700">
                          Sửa
                        </button>
                        <button
                          onClick={() => handleDeleteResident(resident)}
                          className="cursor-pointer font-bold text-red-500 hover:text-red-700">
                          Xóa
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

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
    </>
  )
}
