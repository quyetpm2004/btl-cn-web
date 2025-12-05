import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { updatePasswordApi } from '@/services/user.api.js'
import { useState } from 'react'
import { toast } from 'sonner'
import { Eye, EyeOff } from 'lucide-react'

export function ModalChangePassword({
  isOpenChangePassword,
  handleClosePassword
}) {
  const [showOld, setShowOld] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const handleChangePassword = async (e) => {
    e.preventDefault()
    // Handle password change logic here
    const res = await updatePasswordApi({
      oldPassword,
      newPassword,
      confirmPassword
    })
    if (res.data) {
      toast.success('Mật khẩu đã được thay đổi!')
      handleClosePassword()
    } else {
      toast.error(res.error || 'Đã có lỗi xảy ra!')
    }
  }
  return (
    <Dialog open={isOpenChangePassword} onOpenChange={handleClosePassword}>
      <form>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Đổi mật khẩu</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4">
            {/* Mật khẩu cũ */}
            <div className="grid gap-3">
              <Label>Mật khẩu cũ</Label>
              <div className="relative">
                <Input
                  type={showOld ? 'text' : 'password'}
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowOld(!showOld)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500">
                  {showOld ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Mật khẩu mới */}
            <div className="grid gap-3">
              <Label>Mật khẩu mới</Label>
              <div className="relative">
                <Input
                  type={showNew ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500">
                  {showNew ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Xác nhận mật khẩu */}
            <div className="grid gap-3">
              <Label>Xác nhận mật khẩu</Label>
              <div className="relative">
                <Input
                  type={showConfirm ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500">
                  {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button onClick={handleClosePassword} variant="outline">
                Hủy
              </Button>
            </DialogClose>
            <Button
              onClick={handleChangePassword}
              type="submit"
              variant="success">
              Lưu
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
