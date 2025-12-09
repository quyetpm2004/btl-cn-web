import { getProfileApi, updateProfileApi } from '@/services/api'
import React, { useEffect, useState, useRef } from 'react'
import { toast } from 'sonner'
import { ModalChangePassword } from '@/components/ModalChangePassword'
import { useResidentStore } from '@/stores/useResidentStore'
import { Button } from '@/components/ui/button'
import { PenLine } from 'lucide-react'

const ProfileSection = () => {
  const { resident, refreshResident } = useResidentStore()
  const fullName = resident?.fullName ?? ''
  const apartmentCode = resident?.apartments?.[0]?.apartmentCode ?? ''
  const relationship = resident?.apartments?.[0]?.relationship ?? ''
  const startDate = resident?.apartments?.[0]?.startDate ?? ''

  const [isEditing, setIsEditing] = useState(false)

  const [residentInfo, setResidentInfo] = useState({})

  const [isOpenChangePassword, setIsOpenChangePassword] = useState(false)
  const handleClosePassword = () => setIsOpenChangePassword(false)

  // Avatar upload state
  const [avatarFile, setAvatarFile] = useState(null)
  const [avatarPreview, setAvatarPreview] = useState(null)
  const fileInputRef = useRef(null)
  const fetchResidentInfo = async () => {
    const res = await getProfileApi()
    if (res.data) {
      setResidentInfo(res.data.data)
    }
  }

  useEffect(() => {
    fetchResidentInfo()
  }, [])

  const handleEdit = () => setIsEditing(true)
  const handleCancel = () => {
    fetchResidentInfo()
    setIsEditing(false)
  }
  const handleSave = async (e) => {
    e.preventDefault()
    let res
    // If a new avatar has been selected, send as FormData
    if (avatarFile) {
      const form = new FormData()
      // Append primitive fields from residentInfo
      Object.keys(residentInfo || {}).forEach((k) => {
        const v = residentInfo[k]
        if (v !== undefined && v !== null) form.append(k, v)
      })
      form.append('avatar', avatarFile)
      res = await updateProfileApi(form)
    } else {
      res = await updateProfileApi(residentInfo)
    }
    if (res.data) {
      toast.success('Cập nhật thông tin thành công!')
    } else {
      toast.error('Cập nhật thông tin thất bại. Vui lòng thử lại.')
    }
    refreshResident()

    fetchResidentInfo()

    // Reset preview/file state
    setAvatarFile(null)
    setAvatarPreview(null)

    setIsEditing(false)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setResidentInfo((prev) => ({ ...prev, [name]: value }))
  }

  const changePassword = () => {
    setIsOpenChangePassword(true)
  }

  // Handle avatar selection + preview
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

  // Cleanup preview URL when component unmounts or avatar changes
  useEffect(() => {
    return () => {
      if (avatarPreview) URL.revokeObjectURL(avatarPreview)
    }
  }, [avatarPreview])

  return (
    <>
      <div id="profile" className="content-section">
        <div className="mb-6">
          <h2 className="mb-2 text-2xl font-bold text-gray-800">
            Hồ sơ cá nhân
          </h2>
          <p className="text-gray-600">Quản lý thông tin cá nhân và gia đình</p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* LEFT SIDE */}
          <div className="lg:col-span-2">
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <div className="mb-6 flex flex-col items-center space-y-4 md:flex-row md:items-start md:space-y-0 md:space-x-4">
                {/* Avatar: image with upload in edit mode */}
                <div className="relative">
                  {avatarPreview || residentInfo?.avatar_url ? (
                    <img
                      src={
                        avatarPreview ||
                        `${baseURL}/images/avatar/${residentInfo?.avatar_url}`
                      }
                      alt="avatar"
                      className="h-20 w-20 rounded-full object-cover"
                      onClick={() => {
                        if (isEditing && fileInputRef.current)
                          fileInputRef.current.click()
                      }}
                    />
                  ) : (
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                      <span className="text-2xl font-bold">
                        {resident?.fullName
                          ? resident.fullName
                              .split(' ')
                              .map((n) => n?.[0])
                              .slice(0, 2)
                              .join('')
                          : 'NV'}
                      </span>
                    </div>
                  )}

                  {/* Hidden file input for avatar upload */}
                  {isEditing && (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          fileInputRef.current && fileInputRef.current.click()
                        }
                        className="absolute right-0 -bottom-2 rounded bg-white px-2 py-1 text-xs shadow">
                        Thay ảnh
                      </button>
                    </>
                  )}
                </div>

                {/* Thông tin văn bản - Căn giữa trên di động */}
                <div className="text-center md:text-left">
                  <h3 className="text-xl font-semibold">{fullName}</h3>
                  <p className="text-gray-600">
                    {relationship} - Căn hộ {apartmentCode}
                  </p>
                  <p className="text-sm text-gray-500">
                    Thành viên từ: {startDate}
                  </p>
                </div>

                {/* Nút "Chỉnh sửa" - Tách biệt và căn chỉnh trên di động */}
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
                  <Info label="Họ và tên" value={residentInfo.full_name} />
                  <Info label="Email" value={residentInfo.email} />
                  <Info label="Số điện thoại" value={residentInfo.phone} />
                  <Info
                    label="Giới tính"
                    value={residentInfo.gender === 1 ? 'Nam' : 'Nữ'}
                  />
                  <Info label="CCCD/CMND" value={residentInfo.id_card} />
                  <Info label="Ngày sinh" value={residentInfo.dob} />
                  <Info label="Quê quán" value={residentInfo.hometown} />
                  <Info label="Dân tộc" value={residentInfo.ethnicity} />
                  <Info label="Nghề nghiệp" value={residentInfo.occupation} />
                  <Info label="Sổ hộ khẩu" value={residentInfo.household_no} />
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
                    value={residentInfo.full_name}
                    onChange={handleChange}
                  />
                  <EditInput
                    label="Email"
                    name="email"
                    type="email"
                    value={residentInfo.email}
                    onChange={handleChange}
                  />
                  <EditInput
                    label="Số điện thoại"
                    name="phone"
                    value={residentInfo.phone}
                    onChange={handleChange}
                  />
                  <div>
                    <label className="mb-1 block text-sm text-gray-600">
                      Giới tính
                    </label>
                    <select
                      name="gender"
                      value={residentInfo.gender}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500">
                      <option value={1}>Nam</option>
                      <option value={2}>Nữ</option>
                      <option value={3}>Khác</option>
                    </select>
                  </div>
                  <EditInput
                    label="CCCD/CMND"
                    name="id_card"
                    value={residentInfo.id_card}
                    onChange={handleChange}
                  />
                  <EditInput
                    label="Ngày sinh"
                    name="dob"
                    type="date"
                    value={residentInfo.dob}
                    onChange={handleChange}
                  />
                  <EditInput
                    label="Quê quán"
                    name="hometown"
                    value={residentInfo.hometown}
                    onChange={handleChange}
                  />
                  <EditInput
                    label="Dân tộc"
                    name="ethnicity"
                    value={residentInfo.ethnicity}
                    onChange={handleChange}
                  />
                  <EditInput
                    label="Nghề nghiệp"
                    name="occupation"
                    value={residentInfo.occupation}
                    onChange={handleChange}
                  />
                  <EditInput
                    label="Sổ hộ khẩu"
                    name="household_no"
                    value={residentInfo.household_no}
                    onChange={handleChange}
                  />

                  {/* Buttons */}
                  <div className="flex space-x-4 md:col-span-2">
                    <Button type="submit" variant="success">
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
            {/* Family Members */}
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h4 className="font-semibold text-gray-800">
                  Thành viên gia đình
                </h4>
              </div>
              <div className="space-y-3">
                <FamilyMemberCard
                  name="Trần Thị Bình"
                  relationship="Vợ"
                  phone="0987654321"
                  dob="20/05/1988"
                  initials="TB"
                  color="bg-blue-500"
                />
                <FamilyMemberCard
                  name="Nguyễn Minh Khang"
                  relationship="Con trai"
                  age="15 tuổi"
                  dob="10/12/2008"
                  initials="NK"
                  color="bg-green-500"
                />
              </div>
            </div>
            <AccountSettings changePassword={changePassword} />
          </div>
        </div>
      </div>
      <ModalChangePassword
        isOpenChangePassword={isOpenChangePassword}
        handleClosePassword={handleClosePassword}
      />
    </>
  )
}

/* ---- Subcomponents ---- */
const Info = ({ label, value }) => (
  <div className="rounded-lg bg-gray-50 p-3">
    <label className="block text-sm text-gray-600">{label}</label>
    <p className="font-medium">{value}</p>
  </div>
)

const EditInput = ({ label, name, value, onChange, type = 'text' }) => (
  <div>
    <label className="mb-1 block text-sm text-gray-600">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
)

const FamilyMemberCard = ({
  name,
  relationship,
  phone,
  age,
  dob,
  initials,
  color
}) => (
  <div className="flex items-center justify-between rounded-lg bg-gray-100 p-4">
    <div className="flex items-center space-x-3">
      <div
        className={`${color} flex h-10 w-10 items-center justify-center rounded-full`}>
        <span className="text-sm font-medium text-white">{initials}</span>
      </div>
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-sm text-gray-600">
          {relationship} {phone ? `- ${phone}` : ''} {age ? `- ${age}` : ''}
        </p>
        <p className="text-xs text-gray-500">Ngày sinh: {dob}</p>
      </div>
    </div>
  </div>
)

const AccountSettings = ({ changePassword }) => (
  <div className="rounded-xl bg-white p-6 shadow-sm">
    <h4 className="mb-4 font-semibold">Cài đặt tài khoản</h4>
    <div className="space-y-3">
      <SettingItem icon="fa-key" text="Đổi mật khẩu" onClick={changePassword} />
    </div>
  </div>
)

const SettingItem = ({ icon, text, onClick, badge, badgeColor }) => (
  <button
    onClick={onClick}
    className="flex w-full cursor-pointer items-center justify-between rounded-lg p-3 text-left transition-colors hover:bg-gray-50">
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
  </button>
)

export default ProfileSection
