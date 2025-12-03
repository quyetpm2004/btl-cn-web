import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useQuery } from '@tanstack/react-query'
import { getAssigneesApi } from '@/services/staff.api'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { useAuthStore } from '../../stores/useAuthStore'

export const MaintenanceRequestDialog = ({
  open,
  onOpenChange,
  mode, // 'view', 'assign', 'complete'
  request,
  onAssign,
  onComplete
}) => {
  const { user } = useAuthStore()
  const [technicianId, setTechnicianId] = useState('')
  const [result, setResult] = useState('')

  // Reset state when dialog opens/closes or request changes
  useEffect(() => {
    if (open) {
      if (request?.assigned_to) {
        setTechnicianId(String(request.assigned_to))
      } else {
        setTechnicianId('')
      }
      setResult('')
    }
  }, [open, request, mode])

  // Fetch technicians only if in assign mode
  const { data: techniciansData } = useQuery({
    queryKey: ['technicians'],
    queryFn: getAssigneesApi,
    enabled: open && mode === 'assign'
  })

  const technicians = techniciansData?.technicians || []

  const handleSubmit = () => {
    if (mode === 'assign') {
      onAssign(request.id, technicianId)
    } else if (mode === 'complete') {
      onComplete(request.id, result)
    }
  }

  if (!request) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === 'assign'
              ? 'Phân công xử lý'
              : mode === 'complete'
                ? 'Hoàn thành công việc'
                : 'Chi tiết báo cáo'}
          </DialogTitle>
          <DialogDescription>
            {request.title} - {request.location}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label>Người báo cáo:</Label>
            <span className="col-span-3 text-sm">
              {request.resident?.full_name || 'Ẩn danh'}
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label>Thời gian:</Label>
            <span className="col-span-3 text-sm">
              {request.created_at &&
                format(new Date(request.created_at), 'HH:mm dd/MM/yyyy', {
                  locale: vi
                })}
            </span>
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label>Mô tả:</Label>
            <span className="col-span-3 text-sm text-gray-600">
              {request.description}
            </span>
          </div>

          {user.role_id !== 5 && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="technician" className="text-right">
                Kỹ thuật viên
              </Label>
              <div className="col-span-3">
                <Select
                  value={technicianId}
                  onValueChange={setTechnicianId}
                  disabled={mode !== 'assign'}>
                  <SelectTrigger id="technician" className="w-full">
                    <SelectValue placeholder="Chọn kỹ thuật viên" />
                  </SelectTrigger>
                  <SelectContent>
                    {technicians.map((tech) => (
                      <SelectItem key={tech.id} value={String(tech.id)}>
                        {tech.full_name} ({tech.user?.email})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Complete Mode */}
          {mode === 'complete' && (
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="result" className="text-right">
                Kết quả
              </Label>
              <Textarea
                id="result"
                value={result}
                onChange={(e) => setResult(e.target.value)}
                placeholder="Mô tả kết quả xử lý..."
                className="col-span-3"
              />
            </div>
          )}

          {/* View Mode - Show result if done */}
          {mode === 'view' && request.status === 1 && (
            <div className="grid grid-cols-4 items-start gap-4">
              <Label className="text-right font-bold">Kết quả:</Label>
              <span className="col-span-3 text-sm text-green-700">
                {request.result}
              </span>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Đóng
          </Button>
          {mode !== 'view' && (
            <Button
              onClick={handleSubmit}
              disabled={
                (mode === 'assign' && !technicianId) ||
                (mode === 'complete' && !result)
              }>
              Xác nhận
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
