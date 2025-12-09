import { useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { useQuery } from '@tanstack/react-query'
import { getAllRequestsApi } from '@/services/request.api'
import { format } from 'date-fns'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { usePagination } from '@/hooks/use-pagination'
import { PaginationControls } from '@/components/pagination-controls'

export const MaintenanceRequestHistoryDialog = ({
  open,
  onOpenChange,
  onViewDetail
}) => {
  const pagination = usePagination(1, 5)

  const { data, isLoading } = useQuery({
    queryKey: ['allMaintenanceRequests', pagination.page],
    queryFn: () =>
      getAllRequestsApi({ page: pagination.page, limit: pagination.limit }),
    enabled: open,
    keepPreviousData: true
  })

  useEffect(() => {
    if (data?.total) {
      pagination.setTotal(data.total)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.total])

  const requests = data?.items || []

  const getStatusBadge = (status) => {
    switch (status) {
      case 0:
        return (
          <Badge
            variant="outline"
            className="border-red-200 bg-red-50 text-red-700">
            Chờ xử lý
          </Badge>
        )
      case 1:
        return (
          <Badge
            variant="outline"
            className="border-green-200 bg-green-50 text-green-700">
            Đã hoàn thành
          </Badge>
        )
      case 2:
        return (
          <Badge
            variant="outline"
            className="border-gray-200 bg-gray-50 text-gray-700">
            Đã hủy
          </Badge>
        )
      case 3:
        return (
          <Badge
            variant="outline"
            className="border-blue-200 bg-blue-50 text-blue-700">
            Đang xử lý
          </Badge>
        )
      default:
        return <Badge variant="outline">Không xác định</Badge>
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[80vh] flex-col md:max-w-fit">
        <DialogHeader>
          <DialogTitle>Lịch sử báo cáo sự cố</DialogTitle>
          <DialogDescription>
            Danh sách toàn bộ các báo cáo sự cố
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 min-h-0 flex-1 overflow-auto">
          {isLoading ? (
            <div className="py-8 text-center text-gray-500">
              Đang tải dữ liệu...
            </div>
          ) : requests.length === 0 ? (
            <div className="py-8 text-center text-gray-500">
              Chưa có dữ liệu
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tiêu đề</TableHead>
                    <TableHead>Người báo cáo</TableHead>
                    <TableHead>Vị trí</TableHead>
                    <TableHead>Thời gian</TableHead>
                    <TableHead>Người xử lý</TableHead>
                    <TableHead className="text-center">Trạng thái</TableHead>
                    <TableHead>Hành động</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="truncate font-medium md:max-w-48">
                        {request.title}
                      </TableCell>
                      <TableCell className="truncate md:max-w-30">
                        {request.resident?.full_name || 'Ẩn danh'}
                      </TableCell>
                      <TableCell className="truncate md:max-w-30">
                        {request.location ||
                          'Căn hộ ' + request.apartment?.apartment_code}
                      </TableCell>
                      <TableCell className="text-sm text-gray-500">
                        {request.created_at &&
                          format(
                            new Date(request.created_at),
                            'HH:mm dd/MM/yyyy'
                          )}
                      </TableCell>
                      <TableCell>
                        {request.assignee?.full_name || '---'}
                      </TableCell>
                      <TableCell className="text-center">
                        {getStatusBadge(request.status)}
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant="ghost"
                          onClick={() => onViewDetail(request)}>
                          Xem
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <PaginationControls pagination={pagination} />
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
