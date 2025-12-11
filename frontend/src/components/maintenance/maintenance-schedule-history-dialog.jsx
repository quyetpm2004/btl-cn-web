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
import { getSchedulesApi } from '@/services/schedule.api'
import { format } from 'date-fns'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { usePagination } from '@/hooks/use-pagination'
import { PaginationControls } from '@/components/pagination-controls'

export const MaintenanceScheduleHistoryDialog = ({
  open,
  onOpenChange,
  onViewDetail
}) => {
  const pagination = usePagination(1, 5)

  const { data, isLoading } = useQuery({
    queryKey: ['allMaintenanceSchedules', pagination.page],
    queryFn: () =>
      getSchedulesApi({ page: pagination.page, limit: pagination.limit }),
    enabled: open,
    keepPreviousData: true
  })

  useEffect(() => {
    if (data?.total) {
      pagination.setTotal(data.total)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.total])

  const schedules = data?.items || []

  const getStatusBadge = (status) => {
    switch (status) {
      case 0:
        return (
          <Badge
            variant="outline"
            className="border-yellow-200 bg-yellow-50 text-yellow-700">
            Đã lên lịch
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
      default:
        return <Badge variant="outline">Không xác định</Badge>
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[80vh] flex-col md:max-w-fit">
        <DialogHeader>
          <DialogTitle>Lịch sử bảo trì</DialogTitle>
          <DialogDescription>
            Danh sách toàn bộ các lịch bảo trì đã tạo
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 min-h-0 flex-1 overflow-auto">
          {isLoading ? (
            <div className="py-8 text-center text-gray-500">
              Đang tải dữ liệu...
            </div>
          ) : schedules.length === 0 ? (
            <div className="py-8 text-center text-gray-500">
              Chưa có dữ liệu
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tiêu đề</TableHead>
                    <TableHead>Đối tượng</TableHead>
                    <TableHead>Vị trí</TableHead>
                    <TableHead>Thời gian</TableHead>
                    <TableHead>Người phụ trách</TableHead>
                    <TableHead className="text-center">Trạng thái</TableHead>
                    <TableHead>Hành động</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {schedules.map((schedule) => (
                    <TableRow key={schedule.id}>
                      <TableCell className="truncate font-medium md:max-w-48">
                        {schedule.title}
                      </TableCell>
                      <TableCell className="truncate md:max-w-30">
                        {schedule.maintenance_object}
                      </TableCell>
                      <TableCell className="truncate md:max-w-30">
                        {schedule.location}
                      </TableCell>
                      <TableCell className="text-sm text-gray-500">
                        {format(
                          new Date(schedule.start_at),
                          'HH:mm dd/MM/yyyy'
                        )}
                        <br />
                        {format(new Date(schedule.end_at), 'HH:mm dd/MM/yyyy')}
                      </TableCell>
                      <TableCell>
                        {schedule.assignee?.full_name || '---'}
                      </TableCell>
                      <TableCell className="text-center">
                        {getStatusBadge(schedule.status)}
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant="ghost"
                          onClick={() => onViewDetail(schedule)}>
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
