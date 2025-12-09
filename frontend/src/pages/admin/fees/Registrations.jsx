import { useState, useEffect } from 'react'
import { User, Edit } from 'lucide-react'
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
import { PaginationControls } from '@/components/pagination-controls'
import { usePagination } from '@/hooks/use-pagination'
import { Input } from '@/components/ui/input'
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query'
import {
  getApartmentsWithServicesApi,
  updateApartmentServicesApi
} from '@/services/apartment.api'
import { getAllActiveServicesApi } from '@/services/service.api'
import { toast } from 'sonner'
import { ServiceRegistrationModal } from '@/components/fees/service-registration-dialog'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'

export const Registrations = () => {
  const queryClient = useQueryClient()
  const [editingApartment, setEditingApartment] = useState(null)
  const [queryInput, setQueryInput] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const pagination = usePagination(1, 10)

  // --- QUERIES ---
  const { data: apartmentsData, isLoading: isLoadingApartments } = useQuery({
    queryKey: [
      'apartments-services',
      pagination.page,
      pagination.limit,
      searchQuery
    ],
    queryFn: () =>
      getApartmentsWithServicesApi({
        page: pagination.page,
        limit: pagination.limit,
        query: searchQuery
      }),
    placeholderData: keepPreviousData
  })

  const { data: servicesData } = useQuery({
    queryKey: ['active-services'],
    queryFn: getAllActiveServicesApi
  })

  const apartments = apartmentsData?.items || []
  const services = servicesData?.services || []
  const isLoading = isLoadingApartments

  // Sync total items to pagination
  useEffect(() => {
    if (apartmentsData?.total !== undefined) {
      pagination.setTotal(apartmentsData.total)
    }
  }, [apartmentsData?.total, pagination])

  // --- MUTATIONS ---
  const updateServicesMutation = useMutation({
    mutationFn: ({ apartmentId, newRegistrations }) =>
      updateApartmentServicesApi(apartmentId, newRegistrations),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['apartments-services'] })
      toast.success('Cập nhật dịch vụ thành công')
      setEditingApartment(null)
    },
    onError: (error) => {
      console.error('Failed to update services:', error)
      toast.error('Cập nhật dịch vụ thất bại')
    }
  })

  const handleSaveApartmentServices = (apartmentId, newRegistrations) => {
    updateServicesMutation.mutate({ apartmentId, newRegistrations })
  }

  // --- HANDLERS ---
  const handleSearch = () => {
    pagination.setPage(1)
    setSearchQuery(queryInput)
  }

  const handleReset = () => {
    setQueryInput('')
    setSearchQuery('')
    pagination.setPage(1)
  }

  return (
    <>
      <div className="mb-6">
        <h2 className="mb-2 text-2xl font-bold text-gray-800">
          Đăng ký dịch vụ
        </h2>
        <p className="text-gray-600">
          Quản lý các dịch vụ đã đăng ký của từng hộ
        </p>
      </div>

      <div className="mb-6 rounded-xl bg-white p-4 shadow-sm">
        <div className="grid gap-4 md:grid-cols-10">
          <div className="relative md:col-span-3">
            <Input
              name="search"
              type="text"
              placeholder="Tìm kiếm mã căn hộ..."
              value={queryInput}
              onChange={(e) => setQueryInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button
              onClick={handleSearch}
              className="absolute right-0.5 text-gray-500 hover:text-blue-500"
              variant="icon"
              size="icon">
              <i className="fas fa-search"></i>
            </Button>
          </div>
          <Button
            onClick={handleReset}
            variant="outline"
            className="col-start-10">
            Đặt lại
          </Button>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow className="hover:bg-transparent">
              <TableHead className="py-4 pl-6 font-medium text-gray-500">
                Căn hộ
              </TableHead>
              <TableHead className="py-4 font-medium text-gray-500">
                Chủ hộ
              </TableHead>
              <TableHead className="py-4 font-medium text-gray-500">
                Dịch vụ đang dùng
              </TableHead>
              <TableHead className="py-4 pr-6 text-right font-medium text-gray-500">
                Thao tác
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-gray-500">
                  Đang tải dữ liệu...
                </TableCell>
              </TableRow>
            )}

            {!isLoading && apartments.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-gray-500">
                  Không có dữ liệu
                </TableCell>
              </TableRow>
            )}

            {apartments.map((apt) => (
              <TableRow key={apt.id} className="group h-14">
                <TableCell className="pl-6 font-bold text-gray-900 md:w-30">
                  {apt.apartment_code}
                </TableCell>
                <TableCell className="md:w-50">
                  <div className="font-medium text-gray-900">
                    {apt.residents?.[0]?.full_name || '---'}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <User className="h-3 w-3" />{' '}
                    {apt.residents?.[0]?.phone || '---'}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-2">
                    {apt.serviceRegistrations?.map((reg, idx) => {
                      const service = reg.service
                      if (!service) return null
                      return (
                        <Badge
                          key={idx}
                          variant="outline"
                          className="border-blue-100 bg-blue-50 font-normal text-blue-700">
                          {service.name}
                        </Badge>
                      )
                    })}
                  </div>
                </TableCell>
                <TableCell className="pr-6 text-right opacity-0 transition-opacity group-hover:opacity-100 md:max-w-30">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="icon"
                          size="icon-sm"
                          onClick={() => setEditingApartment(apt)}
                          className="text-blue-600 hover:bg-blue-50">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Chỉnh sửa</p>
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

      {editingApartment && (
        <ServiceRegistrationModal
          apartment={editingApartment}
          allServices={services}
          onClose={() => setEditingApartment(null)}
          onSave={handleSaveApartmentServices}
        />
      )}
    </>
  )
}
