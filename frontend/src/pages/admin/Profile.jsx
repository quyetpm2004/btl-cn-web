import { getProfileApi, updateProfileApi, getMeApi } from '@/services/api'
import { useEffect, useState, useRef } from 'react'
import { toast } from 'sonner'
import { ModalChangePassword } from '@/components/ModalChangePassword.jsx'
import { Button } from '@/components/ui/button'
import { PenLine } from 'lucide-react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuthStore } from '@/stores/useAuthStore'
import { Label } from '../../components/ui/label'
import { Input } from '../../components/ui/input'
import { DatePicker } from '../../components/date-picker'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { format } from 'date-fns'

export const Profile = () => {
  const queryClient = useQueryClient()
  const { setUser } = useAuthStore()
  const [formData, setFormData] = useState({})
  const [isEditing, setIsEditing] = useState(false)
  const [isOpenChangePassword, setIsOpenChangePassword] = useState(false)

  // Avatar upload state
  const [avatarFile, setAvatarFile] = useState(null)
  const [avatarPreview, setAvatarPreview] = useState(null)
  const fileInputRef = useRef(null)

  const { data: userInfo = {} } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const res = await getProfileApi()
      return res.data.data
    }
  })

  const updateProfileMutation = useMutation({
    mutationFn: async (data) => {
      return await updateProfileApi(data)
    },
    onSuccess: async () => {
      toast.success('Cập nhật thông tin thành công!')
      queryClient.invalidateQueries({ queryKey: ['profile'] })

      try {
        const meRes = await getMeApi()
        if (meRes.data && meRes.data.user) {
          setUser(meRes.data.user)
        }
      } catch (err) {
        console.error('Failed to refresh user session', err)
      }

      setIsEditing(false)
      setAvatarFile(null)
      setAvatarPreview(null)
    },
    onError: () => {
      toast.error('Cập nhật thông tin thất bại.')
    }
  })

  const handleEdit = () => {
    setFormData(userInfo)
    setIsEditing(true)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setAvatarFile(null)
    setAvatarPreview(null)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    if (avatarFile) {
      const form = new FormData()
      Object.keys(formData || {}).forEach((k) => {
        const v = formData[k]
        if (v !== undefined && v !== null) form.append(k, v)
      })
      form.append('avatar', avatarFile)
      updateProfileMutation.mutate(form)
    } else {
      updateProfileMutation.mutate(formData)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAvatarSelect = (e) => {
    const file = e.target.files && e.target.files[0]
    if (file) {
      setAvatarFile(file)
      const url = URL.createObjectURL(file)
      setAvatarPreview(url)
    }
  }

  const baseURL =
    import.meta.env.VITE_BASE_URL_BACKEND || 'http://localhost:8000'

  useEffect(() => {
    return () => {
      if (avatarPreview) URL.revokeObjectURL(avatarPreview)
    }
  }, [avatarPreview])

  return (
    <div className="animate-in fade-in duration-300">
      <div className="mb-6">
        <h2 className="mb-2 text-2xl font-bold text-gray-800">Hồ sơ cá nhân</h2>
        <p className="text-gray-600">Quản lý thông tin cá nhân</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* LEFT SIDE */}
        <div className="lg:col-span-2">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="mb-6 flex flex-col items-center space-y-4 md:flex-row md:items-start md:space-y-0 md:space-x-4">
              {/* Avatar */}
              <div className="relative">
                {avatarPreview || userInfo?.avatar_url ? (
                  <img
                    src={
                      avatarPreview ||
                      `${baseURL}/images/avatar/${userInfo?.avatar_url}`
                    }
                    alt="avatar"
                    className="aspect-square size-20 rounded-full"
                    onClick={() => {
                      if (isEditing && fileInputRef.current)
                        fileInputRef.current.click()
                    }}
                  />
                ) : (
                  <div className="flex size-20 items-center justify-center rounded-full bg-linear-to-r from-blue-500 to-purple-600 text-white">
                    <span className="text-2xl font-bold">
                      {userInfo?.full_name
                        ? userInfo.full_name
                            .split(' ')
                            .map((n) => n?.[0])
                            .slice(0, 2)
                            .join('')
                        : 'NV'}
                    </span>
                  </div>
                )}

                {isEditing && (
                  <button
                    type="button"
                    onClick={() =>
                      fileInputRef.current && fileInputRef.current.click()
                    }
                    className="absolute right-0 -bottom-2 rounded bg-white px-2 py-1 text-xs shadow">
                    Thay ảnh
                  </button>
                )}
              </div>

              <div className="text-center md:text-left">
                <h3 className="text-xl font-semibold">{userInfo?.full_name}</h3>
                <p className="text-gray-600">
                  {userInfo?.position} - {userInfo?.department}
                </p>
                <p className="text-sm text-gray-500">
                  Ngày vào làm:{' '}
                  {format(
                    new Date(userInfo?.start_date || Date.now()),
                    'dd/MM/yyyy'
                  )}
                </p>
              </div>

              <Button
                className="mt-4 md:mt-0 md:ml-auto"
                variant="blue"
                onClick={handleEdit}>
                <PenLine /> Chỉnh sửa
              </Button>
            </div>

            {/* View Mode */}
            {!isEditing && (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Info
                  label="Họ và tên"
                  value={userInfo?.full_name}
                  className="col-span-2"
                />
                <Info label="Email" value={userInfo?.email} />
                <Info label="Số điện thoại" value={userInfo?.phone} />
                <Info
                  label="Giới tính"
                  value={
                    userInfo.gender === 1
                      ? 'Nam'
                      : userInfo.gender === 2
                        ? 'Nữ'
                        : 'Khác'
                  }
                />
                <Info label="CCCD/CMND" value={userInfo.id_card} />
                <Info
                  label="Ngày sinh"
                  value={format(
                    new Date(userInfo?.dob || Date.now()),
                    'dd/MM/yyyy'
                  )}
                />
                <Info label="Chức vụ" value={userInfo?.position} />
                <Info label="Phòng ban" value={userInfo?.department} />
                <Info
                  label="Trạng thái"
                  value={
                    userInfo.status === 1 ? 'Đang làm việc' : 'Đã nghỉ việc'
                  }
                />
              </div>
            )}

            {/* Edit Mode */}
            {isEditing && (
              <form
                onSubmit={handleSave}
                className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarSelect}
                  className="hidden"
                  name="avatar"
                />
                <EditInput
                  label="Họ và tên"
                  name="full_name"
                  value={formData.full_name || ''}
                  onChange={handleChange}
                  className="col-span-2"
                />
                <EditInput
                  label="Email"
                  name="email"
                  value={formData.email || ''}
                  onChange={handleChange}
                />
                <EditInput
                  label="Số điện thoại"
                  name="phone"
                  value={formData.phone || ''}
                  onChange={handleChange}
                />

                <div className="space-y-2">
                  <Label htmlFor="gender">Giới tính</Label>
                  <Select
                    value={String(formData.gender)}
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        gender: Number(value)
                      })
                    }>
                    <SelectTrigger id="gender" name="gender" className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Nam</SelectItem>
                      <SelectItem value="2">Nữ</SelectItem>
                      <SelectItem value="3">Khác</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <EditInput
                  label="CCCD/CMND"
                  name="id_card"
                  value={formData.id_card || ''}
                  onChange={handleChange}
                />

                <div className="space-y-2">
                  <Label htmlFor="dob">Ngày sinh</Label>
                  <DatePicker
                    id="dob"
                    name="dob"
                    value={formData.dob || ''}
                    onChange={(date) =>
                      setFormData({
                        ...formData,
                        dob: date ? format(date, 'yyyy-MM-dd') : ''
                      })
                    }
                  />
                </div>

                <div className="pointer-events-none opacity-50">
                  <EditInput
                    label="Chức vụ"
                    name="position"
                    value={formData.position || ''}
                    onChange={() => {}}
                  />
                </div>
                <div className="pointer-events-none opacity-50">
                  <EditInput
                    label="Phòng ban"
                    name="department"
                    value={formData.department || ''}
                    onChange={() => {}}
                  />
                </div>
                <div className="pointer-events-none opacity-50">
                  <EditInput
                    label="Trạng thái"
                    name="status"
                    value={
                      formData.status === 1 ? 'Đang làm việc' : 'Đã nghỉ việc'
                    }
                    onChange={() => {}}
                  />
                </div>

                <div className="flex space-x-4 md:col-span-2">
                  <Button type="submit" variant="blue">
                    Lưu thay đổi
                  </Button>
                  <Button onClick={handleCancel} variant="outline">
                    Hủy
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">
          <AccountSettings
            changePassword={() => setIsOpenChangePassword(true)}
          />
        </div>
      </div>

      <ModalChangePassword
        isOpenChangePassword={isOpenChangePassword}
        handleClosePassword={() => setIsOpenChangePassword(false)}
      />
    </div>
  )
}

/* ---- Subcomponents ---- */
const Info = ({ label, value, className }) => (
  <div className={`rounded-lg bg-gray-50 p-3 ${className}`}>
    <label className="block text-sm text-gray-600">{label}</label>
    <p className="font-medium">{value || '---'}</p>
  </div>
)

const EditInput = ({ label, name, value, onChange, className }) => (
  <div className={`space-y-2 ${className}`}>
    <Label htmlFor={name}>{label}</Label>
    <Input name={name} id={name} value={value} onChange={onChange} />
  </div>
)

const AccountSettings = ({ changePassword }) => (
  <div className="rounded-xl bg-white p-4 shadow-sm">
    <h4 className="mb-4 font-semibold">Cài đặt tài khoản</h4>
    <div className="space-y-3">
      <SettingItem icon="fa-key" text="Đổi mật khẩu" onClick={changePassword} />
    </div>
  </div>
)

const SettingItem = ({ icon, text, onClick, badge, badgeColor }) => (
  <Button
    onClick={onClick}
    className="flex w-full justify-between transition-colors hover:bg-gray-50"
    variant="ghost">
    <div className="flex items-center space-x-3">
      <i className={`fas ${icon} text-gray-500`}></i>
      <span>{text}</span>
    </div>
    {badge ? (
      <div className="flex items-center space-x-2">
        <span
          className={`px-2 py-1 text-xs bg-${badgeColor}-100 text-${badgeColor}-700 rounded`}>
          {badge}
        </span>
        <i className="fas fa-chevron-right text-gray-400"></i>
      </div>
    ) : (
      <i className="fas fa-chevron-right text-gray-400"></i>
    )}
  </Button>
)
