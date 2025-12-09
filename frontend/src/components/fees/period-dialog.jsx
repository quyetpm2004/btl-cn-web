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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { useForm } from '@tanstack/react-form'
import { z } from 'zod'
import { format } from 'date-fns'
import { DatePicker } from '../date-picker'

const periodSchema = z.object({
  name: z.string().min(1, 'Tên đợt thu là bắt buộc'),
  type: z.coerce.number().int().min(1, 'Loại đợt thu là bắt buộc'),
  start_date: z.coerce
    .date()
    .min(new Date('2000-01-01'), 'Ngày bắt đầu là bắt buộc'),
  end_date: z.coerce
    .date()
    .min(new Date('2000-01-01'), 'Ngày kết thúc là bắt buộc'),
  status: z.coerce.boolean()
})

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

export const PeriodDialog = ({
  mode = 'create', // 'create', 'edit'
  period = null,
  open,
  onOpenChange,
  onSave
}) => {
  const form = useForm({
    defaultValues: {
      name: '',
      type: '',
      start_date: '',
      end_date: '',
      status: 'true'
    },
    validators: {
      onSubmit: periodSchema,
      onChange: ({ value }) => {
        const result = periodSchema.safeParse(value)
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
        type: parseInt(value.type),
        status: value.status === 'true' ? true : false
      }
      await onSave(payload)
      onOpenChange(false)
    }
  })

  useEffect(() => {
    if (open) {
      form.reset()
      if (mode === 'edit' && period) {
        form.setFieldValue('name', period.name || '')
        form.setFieldValue('type', period.type || 'monthly')
        form.setFieldValue('start_date', period.start_date || '')
        form.setFieldValue('end_date', period.end_date || '')
        form.setFieldValue('status', period.status ?? true)
      }
    }
  }, [period, mode, open, form])

  const isEditMode = mode === 'edit'
  const title = isEditMode ? 'Cập nhật đợt thu' : 'Tạo đợt thu mới'
  const description = isEditMode
    ? 'Chỉnh sửa thông tin đợt thu phí'
    : 'Tạo mới một đợt thu phí trong hệ thống'
  const buttonLabel = isEditMode ? 'Cập nhật' : 'Tạo mới'

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
          className="space-y-4">
          <form.Field
            name="name"
            children={(field) => (
              <div className="space-y-2">
                <Label required>Tên đợt thu</Label>
                <Input
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Ví dụ: Thu phí tháng 10/2023"
                />
                <FieldInfo field={field} />
              </div>
            )}
          />

          <form.Field
            name="type"
            children={(field) => (
              <div className="space-y-2">
                <Label>Loại đợt thu</Label>
                <Select
                  value={String(field.state.value)}
                  onValueChange={field.handleChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Chọn loại đợt thu" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Hàng tháng</SelectItem>
                    <SelectItem value="2">Hàng quý</SelectItem>
                    <SelectItem value="3">Hàng năm</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <form.Field
              name="start_date"
              children={(field) => (
                <div className="space-y-2">
                  <Label required htmlFor="start_date">
                    Ngày bắt đầu
                  </Label>
                  <DatePicker
                    id="start_date"
                    name="start_date"
                    value={
                      field.state.value ? new Date(field.state.value) : null
                    }
                    onChange={(date) =>
                      field.handleChange(date ? format(date, 'yyyy-MM-dd') : '')
                    }
                  />
                  <FieldInfo field={field} />
                </div>
              )}
            />

            <form.Field
              name="end_date"
              children={(field) => (
                <div className="space-y-2">
                  <Label required htmlFor="end_date">
                    Ngày kết thúc
                  </Label>
                  <DatePicker
                    id="end_date"
                    name="end_date"
                    value={
                      field.state.value ? new Date(field.state.value) : null
                    }
                    onChange={(date) =>
                      field.handleChange(date ? format(date, 'yyyy-MM-dd') : '')
                    }
                  />
                  <FieldInfo field={field} />
                </div>
              )}
            />

            <form.Field
              name="status"
              children={(field) => (
                <div className="space-y-2" hidden={!isEditMode}>
                  <Label>Trạng thái</Label>
                  <Select
                    value={String(field.state.value)}
                    onValueChange={field.handleChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Chọn trạng thái" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Đang hoạt động</SelectItem>
                      <SelectItem value="false">Đã đóng</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Hủy
              </Button>
            </DialogClose>
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button
                  type="submit"
                  disabled={!canSubmit || isSubmitting}
                  variant="blue">
                  {isSubmitting ? 'Đang lưu...' : buttonLabel}
                </Button>
              )}
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
