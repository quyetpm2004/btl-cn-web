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
import { filterResidentsApi } from '@/services/resident.api'
import { useState, useMemo, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'

export const ResidentListDialog = ({
  title,
  open,
  onOpenChange,
  onSelect,
  onCreate,
  filters: extraFilters = {}
}) => {
  const [searchIdCard, setSearchIdCard] = useState('')
  const [queryIdCard, setQueryIdCard] = useState('')
  const [searchName, setSearchName] = useState('')
  const [queryName, setQueryName] = useState('')

  const pagination = usePagination(1, 5)

  const filters = useMemo(
    () => ({
      page: pagination.page,
      limit: pagination.limit,
      id_card: queryIdCard,
      full_name: queryName,
      ...extraFilters
    }),
    [pagination.page, pagination.limit, queryIdCard, queryName, extraFilters]
  )

  const { data, isLoading } = useQuery({
    queryKey: ['residents', filters],
    queryFn: () => filterResidentsApi(filters),
    enabled: open, // Only fetch when dialog is open
    keepPreviousData: true
  })

  const residents = data?.items || []

  // Sync total items for pagination
  useEffect(() => {
    if (data?.total) {
      pagination.setTotal(data.total)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.total])

  const handleSearch = () => {
    pagination.setPage(1)
    setQueryIdCard(searchIdCard)
    setQueryName(searchName)
  }

  const handleReset = () => {
    setSearchIdCard('')
    setQueryIdCard('')
    setSearchName('')
    setQueryName('')
    pagination.setPage(1)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="md:max-w-2xl lg:max-w-3xl">
        <DialogHeader>
          <DialogTitle>{title || 'Danh sách cư dân'}</DialogTitle>
          <DialogDescription>
            Tìm kiếm và chọn cư dân từ danh sách bên dưới
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search Bar */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Input
                className="flex-1"
                placeholder="Tìm kiếm theo tên..."
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
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
            <div className="relative flex-1">
              <Input
                placeholder="Tìm kiếm theo CCCD..."
                value={searchIdCard}
                onChange={(e) => setSearchIdCard(e.target.value)}
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
            <Button onClick={onCreate} variant="blue">
              <i className="fas fa-plus mr-2"></i>
              Thêm cư dân
            </Button>
          </div>

          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Họ tên</TableHead>
                  <TableHead>CCCD</TableHead>
                  <TableHead>SĐT</TableHead>
                  <TableHead>Giới tính</TableHead>
                  <TableHead>Ngày sinh</TableHead>
                  <TableHead>Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="py-4 text-center">
                      Đang tải...
                    </TableCell>
                  </TableRow>
                ) : residents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="py-4 text-center">
                      Không có dữ liệu
                    </TableCell>
                  </TableRow>
                ) : (
                  residents.map((resident) => (
                    <TableRow key={resident.id}>
                      <TableCell className="font-medium">
                        {resident.full_name}
                      </TableCell>
                      <TableCell>{resident.id_card}</TableCell>
                      <TableCell>{resident.phone || '—'}</TableCell>
                      <TableCell>
                        {resident.gender === 1
                          ? 'Nam'
                          : resident.gender === 2
                            ? 'Nữ'
                            : 'Khác'}
                      </TableCell>
                      <TableCell>
                        {format(new Date(resident.dob), 'dd/MM/yyyy')}
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          onClick={() => {
                            onSelect(resident)
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
