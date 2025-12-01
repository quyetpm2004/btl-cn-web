import { useEffect, useState, useMemo } from 'react'
import {
  filterApartmentsApi,
  getBuildingsApartmentApi,
  getTypesApartmentApi,
  createApartmentApi,
  updateApartmentApi
} from '@/services/apartment.api.js'
import { toast } from 'sonner'
import { usePagination } from '@/hooks/use-pagination'
import { PaginationControls } from '@/components/pagination-controls'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select.jsx'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ApartmentDialog } from '@/components/apartments/apartments-dialog'
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query'

export const Apartments = () => {
  const queryClient = useQueryClient()
  const [queryInput, setQueryInput] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedApartment, setSelectedApartment] = useState(null)
  const [dialogMode, setDialogMode] = useState('view') // 'view', 'edit', 'create'

  const pagination = usePagination(1, 9)
  const [building, setBuilding] = useState('')
  const [status, setStatus] = useState('')
  const [typeId, setTypeId] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const filters = useMemo(
    () => ({
      page: pagination.page,
      limit: pagination.limit,
      building,
      status,
      type_id: typeId,
      query: searchQuery
    }),
    [pagination.page, pagination.limit, building, status, typeId, searchQuery]
  )

  // Queries for options
  const { data: buildingsData } = useQuery({
    queryKey: ['buildings'],
    queryFn: getBuildingsApartmentApi,
    staleTime: 5 * 60 * 1000
  })

  const { data: typesData } = useQuery({
    queryKey: ['apartmentTypes'],
    queryFn: getTypesApartmentApi,
    staleTime: 5 * 60 * 1000
  })

  const buildingFilter = buildingsData?.buildings || []
  const typeFilter = typesData?.types || []

  // Main Query
  const {
    data: apartmentsData,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['apartments', filters],
    queryFn: () => filterApartmentsApi(filters),
    placeholderData: keepPreviousData
  })

  const apartments = apartmentsData?.items || []

  // Sync total items to pagination
  useEffect(() => {
    if (apartmentsData?.total !== undefined) {
      pagination.setTotal(apartmentsData.total)
    }
  }, [apartmentsData?.total, pagination])

  // Mutations
  const createMutation = useMutation({
    mutationFn: createApartmentApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['apartments'] })
      toast.success('Thêm căn hộ thành công', {
        id: 'apartment-save-success'
      })
      handleCloseDialog()
      pagination.setPage(1)
    },
    onError: (error) => {
      toast.error('Lưu căn hộ thất bại', { id: 'apartment-save-error' })
      console.error(error)
    }
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateApartmentApi(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['apartments'] })
      toast.success('Cập nhật căn hộ thành công', {
        id: 'apartment-save-success'
      })
      handleCloseDialog()
    },
    onError: (error) => {
      toast.error('Lưu căn hộ thất bại', { id: 'apartment-save-error' })
      console.error(error)
    }
  })

  /** Handle filter change */
  const handleFilterChange = (filterKey) => (e) => {
    const value = e.target.value
    pagination.setPage(1)

    switch (filterKey) {
      case 'building':
        setBuilding(value)
        break
      case 'status':
        setStatus(value)
        break
      case 'type_id':
        setTypeId(value)
        break
      default:
        break
    }
  }

  const handleQueryChange = (e) => {
    const value = e.target.value
    setQueryInput(value)
  }

  const handleSearch = () => {
    pagination.setPage(1)
    setSearchQuery(queryInput)
  }

  const handleReset = () => {
    setQueryInput('')
    setSearchQuery('')
    setBuilding('')
    setStatus('')
    setTypeId('')
  }

  /** Dialog handlers */
  const handleOpenDialog = (apartment = null, mode = 'view') => {
    setSelectedApartment(apartment)
    setDialogMode(mode)
    setDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setDialogOpen(false)
    setSelectedApartment(null)
    setDialogMode('view')
  }

  const handleSaveApartment = async (formData) => {
    if (dialogMode === 'create') {
      createMutation.mutate(formData)
    } else if (dialogMode === 'edit' && selectedApartment?.id) {
      updateMutation.mutate({ id: selectedApartment.id, data: formData })
    } else {
      handleCloseDialog()
    }
  }

  if (isError) return <div>Lỗi tải dữ liệu</div>

  return (
    <>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="mb-2 text-2xl font-bold text-gray-800">
            Quản lý Căn hộ
          </h2>
          <p className="text-gray-600">Quản lý thông tin căn hộ</p>
        </div>
        <Button variant="blue" onClick={() => handleOpenDialog(null, 'create')}>
          <i className="fas fa-plus mr-2"></i>
          Thêm căn hộ
        </Button>

        <ApartmentDialog
          mode={dialogMode}
          apartment={selectedApartment}
          typeFilter={typeFilter}
          open={dialogOpen}
          onOpenChange={handleCloseDialog}
          onSave={handleSaveApartment}
        />
      </div>

      <div className="rounded-xl bg-white shadow-sm">
        {/* Filters */}
        <div className="border-b border-gray-200 p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-10">
            <div className="relative md:col-span-3">
              <Input
                name="search"
                type="text"
                placeholder="Tìm kiếm căn hộ / chủ hộ..."
                value={queryInput}
                onChange={handleQueryChange}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <Button
                onClick={handleSearch}
                className="absolute right-0.5 cursor-pointer text-gray-500 hover:text-blue-500"
                variant="icon"
                size="icon">
                <i className="fas fa-search"></i>
              </Button>
            </div>

            <div className="md:col-span-2">
              <Select
                value={building || '-1'}
                onValueChange={(value) =>
                  handleFilterChange('building')({
                    target: { value: value === '-1' ? '' : value }
                  })
                }>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Tất cả tòa" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="-1">Tất cả tòa</SelectItem>
                  {buildingFilter.map((b) => (
                    <SelectItem key={b} value={b}>
                      {b}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="md:col-span-2">
              <Select
                value={status || '-1'}
                onValueChange={(value) =>
                  handleFilterChange('status')({
                    target: { value: value === '-1' ? '' : value }
                  })
                }>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Tất cả trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="-1">Tất cả trạng thái</SelectItem>
                  <SelectItem value="1">Đang ở</SelectItem>
                  <SelectItem value="0">Trống</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="md:col-span-2">
              <Select
                value={String(typeId) || '-1'}
                onValueChange={(value) =>
                  handleFilterChange('type_id')({
                    target: { value: value === '-1' ? '' : value }
                  })
                }>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Tất cả loại" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="-1">Tất cả loại</SelectItem>
                  {typeFilter.map((t, idx) => (
                    <SelectItem key={t} value={String(idx + 1)}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleReset} variant="outline">
              Đặt lại
            </Button>
          </div>
        </div>

        {/* Apartments List */}
        <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">
          {isLoading && (!apartments || apartments.length === 0) && (
            <div className="col-span-full text-center text-gray-500">
              Đang tải danh sách...
            </div>
          )}

          {!isLoading && (!apartments || apartments.length === 0) && (
            <div className="col-span-full text-center text-gray-500">
              Không có dữ liệu
            </div>
          )}

          {apartments.map((apt) => (
            <div
              key={apt?.id}
              className="rounded-lg border border-gray-200 p-4 transition-shadow hover:shadow-md">
              <div className="mb-3 flex items-start justify-between">
                <h3 className="text-lg font-semibold">
                  {apt?.apartment_code || '—'}
                </h3>
                <span
                  className={`rounded-full px-2 py-1 text-xs font-semibold ${apt?.status ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-700'}`}>
                  {apt?.status ? 'Đang ở' : 'Trống'}
                </span>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <p>
                  <i className="fas fa-ruler-combined mr-2"></i>
                  {apt?.area ? `${apt.area}m²` : '—'}
                </p>{' '}
                <p>
                  <i className="fas fa-building mr-2"></i>
                  {apt?.type?.name ? `${apt.type.name}` : '—'}
                </p>
                <p>
                  <i className="fas fa-user mr-2"></i>
                  {/* {apt?.owner?.full_name || '—'} */}
                  {apt?.residents?.[0]?.full_name || '—'}
                </p>
                <p>
                  <i className="fas fa-calendar mr-2"></i>
                  {/* {apt?.owner
                    ? new Date(apt?.owner?.registered_at).toLocaleDateString()
                    : '—'} */}
                  {apt?.residents?.[0]
                    ? new Date(
                        apt?.residents[0]?.registered_at
                      ).toLocaleDateString()
                    : '—'}
                </p>
              </div>

              <div className="mt-4 flex gap-x-2">
                <Button
                  onClick={() => handleOpenDialog(apt, 'view')}
                  variant="blue"
                  className="flex-1">
                  Xem chi tiết
                </Button>
                <Button
                  onClick={() => handleOpenDialog(apt, 'edit')}
                  variant="outline">
                  <i className="fas fa-edit"></i>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <PaginationControls pagination={pagination} />
      </div>
    </>
  )
}
