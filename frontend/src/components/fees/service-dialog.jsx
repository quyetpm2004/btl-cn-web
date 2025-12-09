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
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useForm } from '@tanstack/react-form'
import { z } from 'zod'

const serviceSchema = z.object({
  name: z.string().min(1, 'Tên dịch vụ là bắt buộc'),
  price: z.coerce.number().min(1, 'Đơn giá là bắt buộc'),
  unit: z.string().min(1, 'Đơn vị tính là bắt buộc'),
  description: z.string()
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

export const ServiceDialog = ({
  mode = 'create', // 'create', 'edit'
  service = null,
  open,
  onOpenChange,
  onSave
}) => {
  const form = useForm({
    defaultValues: {
      name: '',
      price: '',
      unit: '',
      description: ''
    },
    validators: {
      onSubmit: serviceSchema,
      onChange: ({ value }) => {
        const result = serviceSchema.safeParse(value)
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
      const payload = { ...value, price: parseInt(value.price) }
      await onSave(payload)
      onOpenChange(false)
    }
  })

  useEffect(() => {
    if (open) {
      form.reset()
      if (service) {
        form.setFieldValue('name', service.name || '')
        form.setFieldValue('price', service.price || '')
        form.setFieldValue('unit', service.unit || '')
        form.setFieldValue('description', service.description || '')
      }
    }
  }, [service, open, form])

  const isEditMode = mode === 'edit'
  const title = isEditMode ? 'Cập nhật dịch vụ' : 'Thêm dịch vụ mới'
  const description = isEditMode
    ? 'Chỉnh sửa thông tin dịch vụ'
    : 'Tạo mới một dịch vụ trong hệ thống'
  const buttonLabel = isEditMode ? 'Cập nhật' : 'Thêm mới'

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
                <Label required htmlFor="name">
                  Tên dịch vụ
                </Label>
                <Input
                  id="name"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Ví dụ: Phí Gym"
                />
                <FieldInfo field={field} />
              </div>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <form.Field
              name="price"
              children={(field) => (
                <div className="space-y-2">
                  <Label required htmlFor="price">
                    Đơn giá (VND)
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    min="0"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldInfo field={field} />
                </div>
              )}
            />

            <form.Field
              name="unit"
              children={(field) => (
                <div className="space-y-2">
                  <Label required htmlFor="unit">
                    Đơn vị tính
                  </Label>
                  <Input
                    id="unit"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="tháng, m3..."
                  />
                  <FieldInfo field={field} />
                </div>
              )}
            />
          </div>

          <form.Field
            name="description"
            children={(field) => (
              <div className="space-y-2">
                <Label htmlFor="description">Mô tả</Label>
                <Textarea
                  id="description"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  rows={2}
                />
              </div>
            )}
          />

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
