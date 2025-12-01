import { useState, useEffect } from 'react'
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
import { ResidentListDialog } from '@/components/residents/resident-list-dialog'
import { ResidentsDialog } from '@/components/residents/residents-dialog'
import { createResidentApi } from '@/services/resident.api'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Label } from '../ui/label'
import { useForm } from '@tanstack/react-form'
import { z } from 'zod'

const apartmentSchema = z.object({
  apartment_code: z.string().min(1, 'Mã căn hộ là bắt buộc'),
  building: z
    .string()
    .min(1, 'Tòa nhà là bắt buộc')
    .max(1, 'Tòa nhà chỉ được 1 ký tự')
    .regex(/^[A-Z]$/, 'Tòa nhà phải là chữ cái in hoa (A-Z)'),
  type_id: z.string().min(1, 'Loại căn là bắt buộc'),
  area: z.coerce.number().min(1, 'Diện tích phải lớn hơn 0'),
  floor: z.coerce.number().min(1, 'Tầng phải lớn hơn 0'),
  status: z.string(),
  owner_id: z.union([z.string(), z.number(), z.null()]).optional(),
  owner_name: z.string().optional()
})

function FieldInfo({ field }) {
  return (
    <>
      {field.state.meta.isTouched && !field.state.meta.isValid ? (
        <p className="text-destructive text-xs">
          {field.state.meta.errors[0]?.message}
        </p>
      ) : null}
      {field.state.meta.isValidating ? 'Đang xác thực...' : null}
    </>
  )
}

export const ApartmentDialog = ({
  mode = 'view', // 'view', 'edit', 'create'
  apartment = null,
  typeFilter,
  open,
  onOpenChange,
  onSave
}) => {
  const queryClient = useQueryClient()
  const [residentListOpen, setResidentListOpen] = useState(false)
  const [createResidentOpen, setCreateResidentOpen] = useState(false)

  const form = useForm({
    defaultValues: {
      apartment_code: '',
      building: '',
      type_id: '',
      area: '',
      status: '0',
      floor: '',
      owner_id: '',
      owner_name: ''
    },
    validators: {
      onSubmit: apartmentSchema,
      onChange: ({ value }) => {
        const result = apartmentSchema.safeParse(value)
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
        type_id: value.type_id ? parseInt(value.type_id) : null,
        // area: value.area ? parseFloat(value.area) : null,
        // floor: value.floor ? parseInt(value.floor) : null,
        status: parseInt(value.status),
        owner_id: value.owner_id ? parseInt(value.owner_id) : null
      }
      // Xóa các trường hiển thị không cần gửi lên API
      delete payload.owner_name

      await onSave(payload)
    }
  })

  const handleSelectResident = (resident) => {
    form.setFieldValue('owner_id', resident.id)
    form.setFieldValue('owner_name', resident.full_name)
    form.setFieldValue('status', '1')
  }

  const handleClearOwner = () => {
    form.setFieldValue('owner_id', '')
    form.setFieldValue('owner_name', '')
  }

  useEffect(() => {
    if (open) {
      form.reset()
      if (apartment) {
        form.setFieldValue('apartment_code', apartment.apartment_code || '')
        form.setFieldValue('building', apartment.building || '')
        form.setFieldValue('type_id', String(apartment.type_id) || '')
        form.setFieldValue('area', apartment.area || '')
        form.setFieldValue('status', String(apartment.status) || '0')
        form.setFieldValue('floor', apartment.floor || '')
        form.setFieldValue('owner_id', apartment.owner_id || '')
        form.setFieldValue(
          'owner_name',
          apartment.residents?.[0]?.full_name || ''
        )
      } else {
        form.reset()
      }
    }
  }, [apartment, open, form])

  const isViewMode = mode === 'view'
  const isEditMode = mode === 'edit'

  const getTitle = () => {
    if (isViewMode) return 'Chi tiết căn hộ'
    if (isEditMode) return 'Sửa căn hộ'
    return 'Thêm căn hộ mới'
  }

  const getDescription = () => {
    if (isViewMode) return 'Xem thông tin chi tiết căn hộ'
    if (isEditMode) return 'Cập nhật thông tin căn hộ'
    return 'Tạo căn hộ mới'
  }

  const getButtonLabel = () => {
    if (isViewMode) return 'Đóng'
    if (isEditMode) return 'Cập nhật'
    return 'Thêm mới'
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{getTitle()}</DialogTitle>
            <DialogDescription>{getDescription()}</DialogDescription>
          </DialogHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              e.stopPropagation()
              form.handleSubmit()
            }}
            className="grid grid-cols-2 gap-4">
            <form.Field
              name="apartment_code"
              children={(field) => (
                <div className="space-y-2">
                  <Label required>Mã căn hộ</Label>
                  <Input
                    name="apartment_code"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="vd: A101"
                    disabled={isViewMode}
                    className="w-full"
                  />
                  <FieldInfo field={field} />
                </div>
              )}
            />

            <form.Field
              name="building"
              children={(field) => (
                <div className="space-y-2">
                  <Label required>Tòa nhà</Label>
                  <Input
                    name="building"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="vd: A, B, C ..."
                    disabled={isViewMode}
                    className="w-full"
                  />
                  <FieldInfo field={field} />
                </div>
              )}
            />

            <form.Field
              name="type_id"
              children={(field) => (
                <div className="space-y-2">
                  <Label required>Loại căn</Label>
                  <Select
                    value={field.state.value || ''}
                    onValueChange={field.handleChange}
                    disabled={isViewMode}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Chọn loại căn" />
                    </SelectTrigger>
                    <SelectContent>
                      {typeFilter?.map((t, idx) => (
                        <SelectItem key={t} value={String(idx + 1)}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FieldInfo field={field} />
                </div>
              )}
            />

            <form.Field
              name="area"
              children={(field) => (
                <div className="space-y-2">
                  <Label required>Diện tích (m²)</Label>
                  <Input
                    type="number"
                    name="area"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="vd: 50"
                    step="0.1"
                    min="0"
                    disabled={isViewMode}
                    className="w-full"
                  />
                  <FieldInfo field={field} />
                </div>
              )}
            />

            <form.Field
              name="floor"
              children={(field) => (
                <div className="space-y-2">
                  <Label required>Tầng</Label>
                  <Input
                    type="number"
                    name="floor"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    min="0"
                    placeholder="vd: 1"
                    disabled={isViewMode}
                    className="w-full"
                  />
                  <FieldInfo field={field} />
                </div>
              )}
            />

            <form.Field
              name="status"
              children={(field) => (
                <div className="space-y-2">
                  <Label required>Trạng thái</Label>
                  <Select
                    value={field.state.value || '0'}
                    onValueChange={(value) => {
                      field.handleChange(value)
                      if (value === '0') handleClearOwner()
                    }}
                    disabled={isViewMode}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Chọn trạng thái" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Trống</SelectItem>
                      <SelectItem value="1">Đang ở</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            />

            <div className="col-span-2 space-y-2">
              <Label>Chủ sở hữu</Label>
              <div className="flex gap-2">
                <form.Field
                  name="owner_name"
                  children={(field) => (
                    <Input
                      name="owner_name"
                      value={field.state.value}
                      readOnly
                      placeholder="Chưa có chủ sở hữu"
                      className="flex-1"
                      disabled={isViewMode}
                    />
                  )}
                />
                {!isViewMode && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setResidentListOpen(true)}>
                    Chọn
                  </Button>
                )}
              </div>
            </div>

            <DialogFooter className="col-span-2">
              {!isViewMode && (
                <DialogClose asChild>
                  <Button variant="outline">Hủy</Button>
                </DialogClose>
              )}
              {!isViewMode && (
                <form.Subscribe
                  selector={(state) => [state.canSubmit, state.isSubmitting]}
                  children={([canSubmit, isSubmitting]) => (
                    <Button
                      type="submit"
                      disabled={!canSubmit || isSubmitting}
                      variant="blue">
                      {isSubmitting ? 'Đang lưu...' : getButtonLabel()}
                    </Button>
                  )}
                />
              )}
              {isViewMode && (
                <DialogClose asChild>
                  <Button variant="gray">{getButtonLabel()}</Button>
                </DialogClose>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <ResidentListDialog
        open={residentListOpen}
        onOpenChange={setResidentListOpen}
        onSelect={handleSelectResident}
        onCreate={() => setCreateResidentOpen(true)}
      />

      <ResidentsDialog
        mode="create"
        open={createResidentOpen}
        onOpenChange={setCreateResidentOpen}
        onSave={async (data) => {
          try {
            const payload = {
              full_name: data.full_name,
              gender: data.gender ? parseInt(data.gender) : null,
              dob: data.dob,
              place_of_birth: data.place_of_birth,
              ethnicity: data.ethnicity,
              occupation: data.occupation,
              hometown: data.hometown,
              id_card: data.id_card,
              household_no: data.household_no,
              status: parseInt(data.status),
              registered_at: new Date().toISOString().split('T')[0]
            }
            await createResidentApi(payload)
            queryClient.invalidateQueries({ queryKey: ['residents'] })
            toast.success('Thêm cư dân thành công')
            setCreateResidentOpen(false)
          } catch (e) {
            console.error(e)
            toast.error('Thêm cư dân thất bại')
          }
        }}
      />
    </>
  )
}
