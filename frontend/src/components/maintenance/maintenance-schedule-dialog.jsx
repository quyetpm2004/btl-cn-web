import { useEffect } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useForm } from '@tanstack/react-form'
import { z } from 'zod'
import { useAuthStore } from '@/stores/useAuthStore'
import { useQuery } from '@tanstack/react-query'
import { getAssigneesApi } from '@/services/staff.api'
import { DateTimePicker } from '../date-time-picker'

const scheduleSchema = z
  .object({
    title: z.string().min(1, 'Tiêu đề là bắt buộc'),
    description: z.string().optional(),
    maintenance_object: z.string().min(1, 'Đối tượng bảo trì là bắt buộc'),
    location: z.string().min(1, 'Vị trí là bắt buộc'),
    start_at: z.string().min(1, 'Thời gian bắt đầu là bắt buộc'),
    end_at: z.string().min(1, 'Thời gian kết thúc là bắt buộc'),
    assigned_to: z.coerce.number().min(1, 'Người thực hiện là bắt buộc'),
    status: z.coerce.number().optional()
  })
  .refine(
    (data) => {
      if (!data.start_at || !data.end_at) return true
      return new Date(data.end_at) > new Date(data.start_at)
    },
    {
      message: 'Thời gian kết thúc phải sau thời gian bắt đầu',
      path: ['end_at']
    }
  )

function FieldInfo({ field }) {
  return (
    <>
      {field.state.meta.isTouched && !field.state.meta.isValid ? (
        <p className="text-destructive text-xs">
          {field.state.meta.errors[0]?.message}
        </p>
      ) : null}
    </>
  )
}

export const MaintenanceScheduleDialog = ({
  mode = 'view', // 'view', 'edit', 'create'
  schedule = null,
  open,
  onOpenChange,
  onSave
}) => {
  const { user } = useAuthStore()

  const { data: assigneesData } = useQuery({
    queryKey: ['assignees'],
    queryFn: getAssigneesApi,
    enabled: open
  })
  const assignees = assigneesData?.technicians || []

  const form = useForm({
    defaultValues: {
      title: '',
      description: '',
      maintenance_object: '',
      location: '',
      start_at: '',
      end_at: '',
      assigned_to: '',
      status: '0'
    },
    validators: {
      onSubmit: scheduleSchema,
      onChange: ({ value }) => {
        const result = scheduleSchema.safeParse(value)
        if (!result.success) {
          const errors = {}
          result.error.issues.forEach((issue) => {
            errors[issue.path[0]] = issue.message
          })
          return errors
        }
        return undefined
      }
    },
    onSubmit: async ({ value }) => {
      const payload = {
        ...value,
        assigned_to: parseInt(value.assigned_to),
        status: parseInt(value.status),
        created_by: user?.id || 1 // Fallback to 1 if no user
      }
      await onSave(payload)
    }
  })

  useEffect(() => {
    if (open) {
      form.reset()
      if (schedule) {
        form.setFieldValue('title', schedule.title || '')
        form.setFieldValue('description', schedule.description || '')
        form.setFieldValue(
          'maintenance_object',
          schedule.maintenance_object || ''
        )
        form.setFieldValue('location', schedule.location || '')

        form.setFieldValue('start_at', schedule.start_at || '')
        form.setFieldValue('end_at', schedule.end_at || '')

        form.setFieldValue('assigned_to', String(schedule.assigned_to) || '')
        form.setFieldValue('status', String(schedule.status) || '0')
      }
    }
  }, [schedule, open, form])

  const isViewMode = mode === 'view'
  const isEditMode = mode === 'edit'

  const getTitle = () => {
    if (isViewMode) return 'Chi tiết lịch bảo trì'
    if (isEditMode) return 'Sửa lịch bảo trì'
    return 'Thêm lịch bảo trì mới'
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{getTitle()}</DialogTitle>
          <DialogDescription>
            {isViewMode
              ? 'Xem thông tin chi tiết lịch bảo trì'
              : 'Nhập thông tin lịch bảo trì'}
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
          className="grid grid-cols-2 gap-4">
          <form.Field
            name="title"
            children={(field) => (
              <div className="col-span-2 space-y-2">
                <Label required>Tiêu đề</Label>
                <Input
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  disabled={isViewMode}
                  placeholder="vd: Bảo trì thang máy A"
                />
                <FieldInfo field={field} />
              </div>
            )}
          />

          <form.Field
            name="maintenance_object"
            children={(field) => (
              <div className="space-y-2">
                <Label required>Đối tượng bảo trì</Label>
                <Input
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  disabled={isViewMode}
                  placeholder="vd: Thang máy"
                />
                <FieldInfo field={field} />
              </div>
            )}
          />

          <form.Field
            name="location"
            children={(field) => (
              <div className="space-y-2">
                <Label required>Vị trí</Label>
                <Input
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  disabled={isViewMode}
                  placeholder="vd: Tòa A"
                />
                <FieldInfo field={field} />
              </div>
            )}
          />

          <form.Field
            name="start_at"
            children={(field) => (
              <div className="col-span-2 space-y-2">
                <Label required>Thời gian bắt đầu</Label>
                <DateTimePicker
                  value={field.state.value}
                  onChange={(value) => field.handleChange(value)}
                  disabled={isViewMode}
                />
                <FieldInfo field={field} />
              </div>
            )}
          />

          <form.Field
            name="end_at"
            children={(field) => (
              <div className="col-span-2 space-y-2">
                <Label required>Thời gian kết thúc</Label>
                <DateTimePicker
                  value={field.state.value}
                  onChange={(value) => field.handleChange(value)}
                  disabled={isViewMode}
                />
                <FieldInfo field={field} />
              </div>
            )}
          />

          <form.Field
            name="assigned_to"
            children={(field) => (
              <div className="col-span-2 space-y-2">
                <Label required>Người phụ trách</Label>
                <Select
                  value={field.state.value}
                  onValueChange={field.handleChange}
                  disabled={isViewMode}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Chọn nhân viên" />
                  </SelectTrigger>
                  <SelectContent>
                    {assignees.map((staff) => (
                      <SelectItem key={staff.id} value={String(staff.id)}>
                        {staff.full_name} ({staff.user?.email})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldInfo field={field} />
              </div>
            )}
          />

          <form.Field
            name="status"
            children={(field) => (
              <div className="space-y-2">
                <Label>Trạng thái</Label>
                <Select
                  value={field.state.value}
                  onValueChange={field.handleChange}
                  disabled={isViewMode || mode === 'create'}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Chọn trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Bảo trì</SelectItem>
                    <SelectItem value="1">Đã hoàn thành</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          />

          <form.Field
            name="description"
            children={(field) => (
              <div className="col-span-2 space-y-2">
                <Label>Mô tả chi tiết</Label>
                <Textarea
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  disabled={isViewMode}
                  placeholder="Mô tả công việc..."
                  className="min-h-[100px]"
                />
              </div>
            )}
          />

          <DialogFooter className="col-span-2">
            <DialogClose asChild>
              <Button variant="outline">Đóng</Button>
            </DialogClose>
            {!isViewMode && (
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                  <Button
                    type="submit"
                    disabled={!canSubmit || isSubmitting}
                    variant="blue">
                    {isSubmitting ? 'Đang lưu...' : 'Lưu'}
                  </Button>
                )}
              />
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
