import { getProfileApi, updateProfileApi } from '@/services/user.api.js'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { ModalChangePassword } from './ModalChangePassword.jsx'
import { useResidentStore } from '@/stores/useResidentStore'

const ProfileSection = () => {
  const { resident } = useResidentStore()
  const { fullName, apartments } = resident
  const { apartmentCode, relationship, startDate } = apartments[0]
  const [isEditing, setIsEditing] = useState(false)

  const [residentInfo, setResidentInfo] = useState({})

  const [isOpenChangePassword, setIsOpenChangePassword] = useState(false)
  const handleClosePassword = () => setIsOpenChangePassword(false)

  const fetchResidentInfo = async () => {
    const res = await getProfileApi()
    if (res.data) {
      console.log('Resident Info:', res.data.data)
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
    // console.log('Saved data:', residentInfo)
    const res = await updateProfileApi(residentInfo)
    if (res.data) {
      toast.success('Cập nhật thông tin thành công!')
    } else {
      toast.error('Cập nhật thông tin thất bại. Vui lòng thử lại.')
    }
    setIsEditing(false)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setResidentInfo((prev) => ({ ...prev, [name]: value }))
  }

  const viewCardHistory = (id) => alert(`Xem lịch sử thẻ ${id}`)
  const lockCard = (id) => alert(`Khóa thẻ ${id}`)
  const changePassword = () => {
    setIsOpenChangePassword(true)
  }

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
              <div className="mb-6 flex items-center space-x-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
                  <span className="text-2xl font-bold text-white">NV</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{fullName}</h3>
                  <p className="text-gray-600">
                    {relationship} - Căn hộ {apartmentCode}
                  </p>
                  <p className="text-sm text-gray-500">
                    Thành viên từ: {startDate}
                  </p>
                </div>
                <button
                  onClick={handleEdit}
                  className="ml-auto cursor-pointer rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600">
                  <i className="fas fa-edit mr-2"></i>Chỉnh sửa
                </button>
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
                    <button
                      type="submit"
                      className="cursor-pointer rounded-lg bg-green-500 px-6 py-2 text-white hover:bg-green-600">
                      <i className="fas fa-save mr-2"></i>Lưu thay đổi
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="cursor-pointer rounded-lg bg-gray-500 px-6 py-2 text-white hover:bg-gray-600">
                      <i className="fas fa-times mr-2"></i>Hủy
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-6">
            {/* Access Cards */}
            <AccessCard
              type="Thẻ chính"
              id="#A1205001"
              color="green"
              issued="15/03/2020"
              expiry="Vô thời hạn"
              lastUsed="13/12/2024 08:30"
              onHistory={viewCardHistory}
              onLock={lockCard}
            />
            <AccessCard
              type="Thẻ phụ"
              id="#A1205002"
              color="blue"
              issued="20/06/2023"
              expiry="Vô thời hạn"
              lastUsed="12/12/2024 18:45"
              onHistory={viewCardHistory}
              onLock={lockCard}
            />

            {/* Account Settings */}
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

const AccessCard = ({
  type,
  id,
  color,
  issued,
  expiry,
  lastUsed,
  onHistory,
  onLock
}) => (
  <div className={`border-2 p-4 border-${color}-200 bg-${color}-50 rounded-lg`}>
    <div className="mb-2 flex items-center justify-between">
      <div>
        <p className={`font-medium text-${color}-700`}>{type}</p>
        <p className={`text-sm text-${color}-600`}>ID: {id}</p>
      </div>
      <span
        className={`rounded-full px-2 py-1 text-xs font-semibold bg-${color}-100 text-${color}-800`}>
        Hoạt động
      </span>
    </div>
    <div className={`text-xs text-${color}-600 mb-3`}>
      <p>Cấp: {issued}</p>
      <p>Hạn: {expiry}</p>
      <p>Lần cuối sử dụng: {lastUsed}</p>
    </div>
    <div className="flex space-x-2">
      <button
        className={`text-xs bg-${color}-500 hover:bg-${color}-600 rounded px-2 py-1 text-white`}
        onClick={() => onHistory(id)}>
        Lịch sử
      </button>
      <button
        className="rounded bg-red-500 px-2 py-1 text-xs text-white hover:bg-red-600"
        onClick={() => onLock(id)}>
        Khóa thẻ
      </button>
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
