import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { format } from 'date-fns'
import { DatePicker } from '../date-picker'
import { Label } from '../ui/label'
import { ApartmentListDialog } from '@/components/apartments/apartment-list-dialog'
import { useForm } from '@tanstack/react-form'
import { z } from 'zod'
import { toast } from 'sonner'

const GENDER_OPTIONS = [
  { value: '1', label: 'Nam' },
  { value: '2', label: 'Nữ' },
  { value: '3', label: 'Khác' }
]

const STATUS_OPTIONS = [
  { value: '1', label: 'Đang ở' },
  { value: '2', label: 'Tạm vắng' },
  { value: '3', label: 'Đã chuyển đi' }
]

const residentSchema = z.object({
  full_name: z.string().min(1, 'Họ tên là bắt buộc'),
  phone: z.string().min(1, 'Số điện thoại là bắt buộc'),
  gender: z.string(),
  dob: z.string().min(1, 'Ngày sinh là bắt buộc'),
  place_of_birth: z.string().min(1, 'Nơi sinh là bắt buộc'),
  ethnicity: z.string().min(1, 'Dân tộc là bắt buộc'),
  occupation: z.string().min(1, 'Nghề nghiệp là bắt buộc'),
  hometown: z.string().min(1, 'Quê quán là bắt buộc'),
  id_card: z.string().min(1, 'CCCD là bắt buộc'),
  household_no: z.string().min(1, 'Số hộ khẩu là bắt buộc'),
  status: z.string(),
  apartment_id: z.union([z.string(), z.number()]),
  apartment_name: z.string().min(1, 'Căn hộ là bắt buộc')
})

function FieldInfo({ field }) {
  return (
    <>
      {field.state.meta.isTouched && !field.state.meta.isValid ? (
        <p className="text-destructive text-xs">
          {field.state.meta.errors
            .map((err) => (err?.message ? err.message : err))
            .join(', ')}
        </p>
      ) : null}
      {field.state.meta.isValidating ? 'Đang xác thực...' : null}
    </>
  )
}

export const ResidentsDialog = ({
  mode = 'view', // 'view', 'edit', 'create'
  resident = null,
  open,
  onOpenChange,
  onSave
}) => {
  const [apartmentListOpen, setApartmentListOpen] = useState(false)

  const form = useForm({
    defaultValues: {
      full_name: '',
      phone: '',
      gender: '1',
      dob: '',
      place_of_birth: '',
      ethnicity: '',
      occupation: '',
      hometown: '',
      id_card: '',
      household_no: '',
      status: '1',
      apartment_id: '',
      apartment_name: ''
    },
    validators: {
      onSubmit: residentSchema,
      onChange: ({ value }) => {
        const result = residentSchema.safeParse(value)
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
    onSubmit: async ({ value, formApi }) => {
      try {
        const payload = {
          ...value,
          gender: value.gender ? parseInt(value.gender) : null,
          status: parseInt(value.status),
          apartment_id: value.apartment_id ? parseInt(value.apartment_id) : null
        }
        // Xóa các trường hiển thị không cần gửi lên API
        delete payload.apartment_name

        await onSave(payload)
        onOpenChange(false)
      } catch (error) {
        console.error(error)
        if (error.details && Array.isArray(error.details)) {
          error.details.forEach((detail) => {
            formApi.setFieldMeta(detail.path, (prev) => ({
              ...prev,
              isTouched: true,
              isValid: false,
              errors: [detail.message],
              errorMap: {
                onSubmit: detail.message
              }
            }))
          })
          toast.error('Vui lòng kiểm tra lại thông tin', {
            id: 'resident-save-error'
          })
        } else {
          toast.error(error.error || 'Có lỗi xảy ra', {
            id: 'resident-save-error'
          })
        }
      }
    }
  })

  useEffect(() => {
    if (open) {
      form.reset()
      if (resident) {
        form.setFieldValue('full_name', resident.full_name || '')
        form.setFieldValue('phone', resident.phone || '')
        form.setFieldValue('gender', String(resident.gender || '1'))
        form.setFieldValue('dob', resident.dob || '')
        form.setFieldValue('place_of_birth', resident.place_of_birth || '')
        form.setFieldValue('ethnicity', resident.ethnicity || '')
        form.setFieldValue('occupation', resident.occupation || '')
        form.setFieldValue('hometown', resident.hometown || '')
        form.setFieldValue('id_card', resident.id_card || '')
        form.setFieldValue('household_no', resident.household_no || '')
        form.setFieldValue('status', String(resident.status || '1'))
        form.setFieldValue('apartment_id', resident.apartments?.[0]?.id || '')
        form.setFieldValue(
          'apartment_name',
          resident.apartments?.[0]?.apartment_code || ''
        )
      } else {
        form.reset()
      }
    }
  }, [resident, open, form])

  const handleSelectApartment = (apartment) => {
    form.setFieldValue('apartment_id', apartment.id)
    form.setFieldValue('apartment_name', apartment.apartment_code)
    form.setFieldValue('status', '1')
  }

  const isViewMode = mode === 'view'
  const isEditMode = mode === 'edit'

  const getTitle = () => {
    if (isViewMode) return 'Chi tiết cư dân'
    if (isEditMode) return 'Sửa thông tin cư dân'
    return 'Thêm cư dân mới'
  }

  const getDescription = () => {
    if (isViewMode) return 'Xem thông tin chi tiết cư dân'
    if (isEditMode) return 'Cập nhật thông tin cư dân'
    return 'Tạo hồ sơ cư dân mới'
  }

  const getButtonLabel = () => {
    if (isViewMode) return 'Đóng'
    if (isEditMode) return 'Cập nhật'
    return 'Thêm mới'
  }

  return (
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
          className="grid gap-4">
          <form.Field
            name="full_name"
            children={(field) => (
              <div className="grid grid-cols-1 gap-2">
                <Label required htmlFor="full_name">
                  Họ tên
                </Label>
                <Input
                  id="full_name"
                  name="full_name"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Nhập họ tên"
                  disabled={isViewMode}
                />
                <FieldInfo field={field} />
              </div>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <form.Field
              name="gender"
              children={(field) => (
                <div className="space-y-2">
                  <Label required htmlFor="gender">
                    Giới tính
                  </Label>
                  <Select
                    value={field.state.value}
                    onValueChange={field.handleChange}
                    disabled={isViewMode}>
                    <SelectTrigger id="gender" className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {GENDER_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FieldInfo field={field} />
                </div>
              )}
            />

            <form.Field
              name="dob"
              children={(field) => (
                <div className="space-y-2">
                  <Label required htmlFor="dob">
                    Ngày sinh
                  </Label>
                  <DatePicker
                    id="dob"
                    name="dob"
                    value={
                      field.state.value ? new Date(field.state.value) : null
                    }
                    onChange={(date) =>
                      field.handleChange(date ? format(date, 'yyyy-MM-dd') : '')
                    }
                    disabled={isViewMode}
                  />
                  <FieldInfo field={field} />
                </div>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <form.Field
              name="place_of_birth"
              children={(field) => (
                <div className="space-y-2">
                  <Label required htmlFor="place_of_birth">
                    Nơi sinh
                  </Label>
                  <Input
                    id="place_of_birth"
                    name="place_of_birth"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Nhập nơi sinh"
                    disabled={isViewMode}
                  />
                  <FieldInfo field={field} />
                </div>
              )}
            />

            <form.Field
              name="ethnicity"
              children={(field) => (
                <div className="space-y-2">
                  <Label required htmlFor="ethnicity">
                    Dân tộc
                  </Label>
                  <Input
                    id="ethnicity"
                    name="ethnicity"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Nhập dân tộc"
                    disabled={isViewMode}
                  />
                  <FieldInfo field={field} />
                </div>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <form.Field
              name="occupation"
              children={(field) => (
                <div className="space-y-2">
                  <Label required htmlFor="occupation">
                    Nghề nghiệp
                  </Label>
                  <Input
                    id="occupation"
                    name="occupation"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Nhập nghề nghiệp"
                    disabled={isViewMode}
                  />
                  <FieldInfo field={field} />
                </div>
              )}
            />

            <form.Field
              name="hometown"
              children={(field) => (
                <div className="space-y-2">
                  <Label required htmlFor="hometown">
                    Quê quán
                  </Label>
                  <Input
                    id="hometown"
                    name="hometown"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Nhập quê quán"
                    disabled={isViewMode}
                  />
                  <FieldInfo field={field} />
                </div>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <form.Field
              name="id_card"
              children={(field) => (
                <div className="space-y-2">
                  <Label required htmlFor="id_card">
                    Căn cước công dân
                  </Label>
                  <Input
                    id="id_card"
                    name="id_card"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Nhập số CCCD"
                    disabled={isViewMode}
                  />
                  <FieldInfo field={field} />
                </div>
              )}
            />

            <form.Field
              name="phone"
              children={(field) => (
                <div className="space-y-2">
                  <Label required htmlFor="phone">
                    Số điện thoại
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Nhập số điện thoại"
                    disabled={isViewMode}
                    autoComplete="tel"
                  />
                  <FieldInfo field={field} />
                </div>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <form.Field
              name="household_no"
              children={(field) => (
                <div className="space-y-2">
                  <Label required htmlFor="household_no">
                    Mã hộ dân
                  </Label>
                  <Input
                    id="household_no"
                    name="household_no"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Nhập mã hộ dân"
                    disabled={isViewMode}
                  />
                  <FieldInfo field={field} />
                </div>
              )}
            />

            <form.Field
              name="status"
              children={(field) => (
                <div className="space-y-2">
                  <Label htmlFor="status">Trạng thái</Label>
                  <Select
                    value={field.state.value}
                    onValueChange={field.handleChange}
                    disabled={!isEditMode}>
                    <SelectTrigger id="status" className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUS_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            />
          </div>

          <div className="grid grid-cols-1 gap-2">
            <Label required htmlFor="apartment">
              Căn hộ
            </Label>

            <form.Field
              name="apartment_name"
              children={(field) => (
                <>
                  <div className="flex gap-2">
                    <Input
                      id="apartment"
                      value={field.state.value}
                      readOnly
                      placeholder="Chưa chọn căn hộ"
                      disabled={isViewMode}
                    />
                    {!isViewMode && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setApartmentListOpen(true)}>
                        Chọn
                      </Button>
                    )}
                  </div>
                  <FieldInfo field={field} />
                </>
              )}
            />
          </div>

          <DialogFooter>
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
                    disabled={isSubmitting || !canSubmit}
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
        <ApartmentListDialog
          open={apartmentListOpen}
          onOpenChange={setApartmentListOpen}
          onSelect={handleSelectApartment}
        />
      </DialogContent>
    </Dialog>
  )
}
