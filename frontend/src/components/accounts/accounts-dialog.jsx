import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogDescription,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { ResidentListDialog } from '@/components/residents/resident-list-dialog'
import { ResidentsDialog } from '@/components/residents/residents-dialog'
import { createAccountApi, updateAccountApi } from '@/services/account.api'
import { createResidentApi } from '@/services/resident.api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { DatePicker } from '@/components/date-picker'
import { format } from 'date-fns'
import { Eye, EyeOff } from 'lucide-react'

const roles = {
  1: 'Quản trị viên',
  2: 'Cư dân',
  3: 'Quản lý',
  4: 'Kế toán',
  5: 'Kỹ thuật viên'
}

export const AccountDialog = ({
  open,
  onOpenChange,
  account,
  mode = 'create'
}) => {
  const queryClient = useQueryClient()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role_id: '2',
    status: '1',
    resident_id: null,
    staff_data: {
      full_name: '',
      phone: '',
      gender: '1',
      dob: '',
      id_card: '',
      position: '',
      department: ''
    }
  })
  const [selectedResident, setSelectedResident] = useState(null)
  const [isResidentDialogOpen, setIsResidentDialogOpen] = useState(false)
  const [isCreateResidentDialogOpen, setIsCreateResidentDialogOpen] =
    useState(false)
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    if (account && mode !== 'create') {
      setFormData({
        username: account.username,
        email: account.email || '',
        password: '', // Don't show password
        role_id: String(account.role_id),
        status: String(account.status),
        resident_id: account.resident?.id || null,
        staff_data: account.staff
          ? {
              full_name: account.staff.full_name,
              phone: account.staff.phone,
              gender: String(account.staff.gender),
              dob: account.staff.dob,
              id_card: account.staff.id_card,
              position: account.staff.position,
              department: account.staff.department
            }
          : {
              full_name: '',
              phone: '',
              gender: '1',
              dob: '',
              id_card: '',
              position: '',
              department: ''
            }
      })
      setSelectedResident(account.resident || null)
    } else {
      setFormData({
        email: '',
        username: '',
        password: '',
        role_id: '2',
        status: '1',
        resident_id: null,
        staff_data: {
          full_name: '',
          phone: '',
          gender: '1',
          dob: '',
          id_card: '',
          position: '',
          department: ''
        }
      })
      setSelectedResident(null)
    }
  }, [account, mode, open])

  const createMutation = useMutation({
    mutationFn: createAccountApi,
    onSuccess: () => {
      toast.success('Tạo tài khoản thành công')
      queryClient.invalidateQueries(['accounts'])
      onOpenChange(false)
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Lỗi khi tạo tài khoản')
    }
  })

  const updateMutation = useMutation({
    mutationFn: (data) => updateAccountApi(account.id, data),
    onSuccess: () => {
      toast.success('Cập nhật tài khoản thành công')
      queryClient.invalidateQueries(['accounts'])
      onOpenChange(false)
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Lỗi khi cập nhật tài khoản')
    }
  })

  const createResidentMutation = useMutation({
    mutationFn: createResidentApi,
    onSuccess: (data) => {
      toast.success('Tạo cư dân thành công')
      // Select the newly created resident
      // API returns { resident: ... }
      const newResident = data.resident
      handleResidentSelect(newResident)
      setIsCreateResidentDialogOpen(false)
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Lỗi khi tạo cư dân')
    }
  })

  const handleSubmit = () => {
    if (mode === 'create') {
      if (!formData.username || !formData.password) {
        toast.error('Vui lòng nhập tên đăng nhập và mật khẩu')
        return
      }
      if (formData.role_id === '2' && !formData.resident_id) {
        toast.error('Vui lòng chọn cư dân')
        return
      }
      createMutation.mutate(formData)
    } else {
      updateMutation.mutate({
        email: formData.email,
        status: formData.status,
        password: formData.password || undefined, // Only send if changed
        role_id: formData.role_id,
        resident_id:
          formData.role_id === '2' ? formData.resident_id : undefined,
        staff_data: formData.role_id !== '2' ? formData.staff_data : undefined
      })
    }
  }

  const handleResidentSelect = (resident) => {
    setSelectedResident(resident)
    setFormData((prev) => ({ ...prev, resident_id: resident.id }))
    setIsResidentDialogOpen(false)
  }

  const isView = mode === 'view'
  const isEdit = mode === 'edit'
  const isCreate = mode === 'create'

  const getTitle = () => {
    if (isView) return 'Chi tiết tài khoản'
    if (isEdit) return 'Sửa tài khoản'
    return 'Tạo tài khoản'
  }

  const getDescription = () => {
    if (isView) return 'Xem thông tin chi tiết của tài khoản'
    if (isEdit) return 'Chỉnh sửa thông tin tài khoản'
    return 'Nhập thông tin để tạo tài khoản mới'
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{getTitle()}</DialogTitle>
            <DialogDescription>{getDescription()}</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Tên đăng nhập</Label>
                <Input
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  disabled={!isCreate}
                  placeholder="Nhập tên đăng nhập"
                />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  disabled={isView}
                  placeholder="Nhập email"
                />
              </div>
            </div>
            <div className={`space-y-2 ${isView ? 'hidden' : ''}`}>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  disabled={isView}
                  placeholder={
                    isEdit ? 'Để trống nếu không đổi' : 'Nhập mật khẩu'
                  }
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Vai trò</Label>
                <Select
                  value={formData.role_id}
                  onValueChange={(value) =>
                    setFormData({ ...formData, role_id: value })
                  }
                  disabled={isView}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(roles).map(([key, label]) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Trạng thái</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) =>
                    setFormData({ ...formData, status: value })
                  }
                  disabled={isView || isCreate}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Hoạt động</SelectItem>
                    <SelectItem value="0">Bị khóa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {formData.role_id === '2' ? (
              <div className="space-y-2">
                <div className="relative flex items-center py-2">
                  <div className="grow border-t border-gray-300"></div>
                  <span className="mx-4 shrink-0 text-sm font-medium">
                    Thông tin cư dân
                  </span>
                  <div className="grow border-t border-gray-300"></div>
                </div>
                {selectedResident ? (
                  <div className="grid gap-2">
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label>Họ tên:</Label>
                      <span className="text-sm">
                        {selectedResident?.full_name}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label>Căn cước:</Label>
                      <span className="text-sm">
                        {selectedResident?.id_card || '—'}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label>Số điện thoại:</Label>
                      <span className="text-sm">
                        {selectedResident?.phone || '—'}
                      </span>
                    </div>

                    {!isView && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsResidentDialogOpen(true)}>
                        Chọn lại
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-center border border-dashed p-4">
                    {!isView ? (
                      <Button onClick={() => setIsResidentDialogOpen(true)}>
                        Chọn cư dân
                      </Button>
                    ) : (
                      <div className="text-gray-500">
                        Không có thông tin cư dân
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4 rounded-md">
                <div className="relative flex items-center py-2">
                  <div className="grow border-t border-gray-300"></div>
                  <span className="mx-4 shrink-0 text-sm font-medium">
                    Thông tin nhân viên
                  </span>
                  <div className="grow border-t border-gray-300"></div>
                </div>
                <div className="space-y-2">
                  <Label>Họ tên</Label>
                  <Input
                    value={formData.staff_data.full_name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        staff_data: {
                          ...formData.staff_data,
                          full_name: e.target.value
                        }
                      })
                    }
                    disabled={isView}
                    placeholder="Nhập họ tên nhân viên"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Giới tính</Label>
                    <Select
                      value={formData.staff_data.gender}
                      onValueChange={(value) =>
                        setFormData({
                          ...formData,
                          staff_data: { ...formData.staff_data, gender: value }
                        })
                      }
                      disabled={isView}>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Nam</SelectItem>
                        <SelectItem value="2">Nữ</SelectItem>
                        <SelectItem value="3">Khác</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Ngày sinh</Label>
                    <DatePicker
                      id="dob"
                      name="dob"
                      value={formData.staff_data.dob}
                      onChange={(date) =>
                        setFormData({
                          ...formData,
                          staff_data: {
                            ...formData.staff_data,
                            dob: date ? format(date, 'yyyy-MM-dd') : ''
                          }
                        })
                      }
                      disabled={isView}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Số điện thoại</Label>
                    <Input
                      value={formData.staff_data.phone}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          staff_data: {
                            ...formData.staff_data,
                            phone: e.target.value
                          }
                        })
                      }
                      disabled={isView}
                      placeholder="Nhập số điện thoại"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Căn cước công dân</Label>
                    <Input
                      value={formData.staff_data.id_card}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          staff_data: {
                            ...formData.staff_data,
                            id_card: e.target.value
                          }
                        })
                      }
                      disabled={isView}
                      placeholder="Nhập số CCCD"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Phòng ban</Label>
                    <Input
                      value={formData.staff_data.department}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          staff_data: {
                            ...formData.staff_data,
                            department: e.target.value
                          }
                        })
                      }
                      disabled={isView}
                      placeholder="Nhập phòng ban"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Chức vụ</Label>
                    <Input
                      value={formData.staff_data.position}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          staff_data: {
                            ...formData.staff_data,
                            position: e.target.value
                          }
                        })
                      }
                      disabled={isView}
                      placeholder="Nhập chức vụ"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Đóng
            </Button>
            {!isView && (
              <Button
                onClick={handleSubmit}
                disabled={createMutation.isPending || updateMutation.isPending}>
                {isCreate ? 'Tạo mới' : 'Lưu thay đổi'}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ResidentListDialog
        title="Danh sách cư dân chưa có tài khoản"
        open={isResidentDialogOpen}
        onOpenChange={setIsResidentDialogOpen}
        onSelect={handleResidentSelect}
        onCreate={() => {
          setIsResidentDialogOpen(false)
          setIsCreateResidentDialogOpen(true)
        }}
        filters={{ user_id: 'null' }}
      />

      <ResidentsDialog
        mode="create"
        open={isCreateResidentDialogOpen}
        onOpenChange={setIsCreateResidentDialogOpen}
        onSave={(data) => {
          const payload = {
            ...data,
            registered_at: new Date().toISOString().split('T')[0]
          }
          createResidentMutation.mutate(payload)
        }}
      />
    </>
  )
}
