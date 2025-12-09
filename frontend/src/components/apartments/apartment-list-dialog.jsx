import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { PaginationControls } from '@/components/pagination-controls'
import { usePagination } from '@/hooks/use-pagination'
import { filterApartmentsApi } from '@/services/apartment.api'
import { useState, useMemo, useEffect } from 'react'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

export const ApartmentListDialog = ({ open, onOpenChange, onSelect }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [query, setQuery] = useState('')

  const pagination = usePagination(1, 5)

  const filters = useMemo(
    () => ({
      page: pagination.page,
      limit: pagination.limit,
      query: query
    }),
    [pagination.page, pagination.limit, query]
  )

  const { data, isLoading } = useQuery({
    queryKey: ['apartments', filters],
    queryFn: () => filterApartmentsApi(filters),
    enabled: open, // Only fetch when dialog is open
    placeholderData: keepPreviousData
  })

  const apartments = data?.items || []

  // Sync total items for pagination
  useEffect(() => {
    if (data?.total) {
      pagination.setTotal(data.total)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.total])

  const handleSearch = () => {
    pagination.setPage(1)
    setQuery(searchQuery)
  }

  const handleReset = () => {
    setSearchQuery('')
    setQuery('')
    pagination.setPage(1)
  }

  const getStatusLabel = (status) => {
    switch (String(status)) {
      case '1':
        return 'Đang ở'
      case '0':
        return 'Trống'
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="md:max-w-2xl lg:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Danh sách căn hộ</DialogTitle>
          <DialogDescription>
            Tìm kiếm và chọn căn hộ từ danh sách bên dưới
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search Bar */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Input
                className="flex-1"
                placeholder="Tìm kiếm theo mã căn hộ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <Button
                size="icon"
                variant="icon"
                onClick={handleSearch}
                className="absolute right-0.5 text-gray-500 hover:text-blue-500">
                <i className="fas fa-search"></i>
              </Button>
            </div>
            <Button variant="outline" onClick={handleReset}>
              Đặt lại
            </Button>
          </div>

          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã căn hộ</TableHead>
                  <TableHead>Tòa nhà</TableHead>
                  <TableHead>Tầng</TableHead>
                  <TableHead>Diện tích</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Chủ hộ</TableHead>
                  <TableHead>Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="py-4 text-center">
                      Đang tải...
                    </TableCell>
                  </TableRow>
                ) : apartments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="py-4 text-center">
                      Không có dữ liệu
                    </TableCell>
                  </TableRow>
                ) : (
                  apartments.map((apartment) => (
                    <TableRow key={apartment.id}>
                      <TableCell className="font-medium">
                        {apartment.apartment_code}
                      </TableCell>
                      <TableCell>{apartment.building}</TableCell>
                      <TableCell>{apartment.floor}</TableCell>
                      <TableCell>{apartment.area} m²</TableCell>
                      <TableCell>{getStatusLabel(apartment.status)}</TableCell>
                      <TableCell>
                        {apartment.residents?.[0]?.full_name || '—'}
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          onClick={() => {
                            onSelect(apartment)
                            onOpenChange(false)
                          }}>
                          Chọn
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <PaginationControls pagination={pagination} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
