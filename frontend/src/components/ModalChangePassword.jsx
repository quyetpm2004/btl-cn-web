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
            <DialogDescription></DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            {/* Mật khẩu cũ */}
            <div className="grid gap-3">
              <Label required htmlFor="oldPassword">
                Mật khẩu cũ
              </Label>
              <div className="relative">
                <Input
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  type={showOld ? 'text' : 'password'}
                  id="oldPassword"
                  className="pr-10"
                />
                <Button
                  variant="icon"
                  type="button"
                  onClick={() => setShowOld(!showOld)}
                  className="absolute right-0 text-gray-500 hover:text-gray-700">
                  {showOld ? <EyeOff size={16} /> : <Eye size={16} />}
                </Button>
              </div>
            </div>

            {/* Mật khẩu mới */}
            <div className="grid gap-3">
              <Label required htmlFor="newPassword">
                Mật khẩu mới
              </Label>
              <div className="relative">
                <Input
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  type={showNew ? 'text' : 'password'}
                  id="newPassword"
                  className="pr-10"
                />
                <Button
                  variant="icon"
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-0 text-gray-500 hover:text-gray-700">
                  {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                </Button>
              </div>
            </div>

            {/* Xác nhận mật khẩu */}
            <div className="grid gap-3">
              <Label required htmlFor="confirmPassword">
                Xác nhận mật khẩu
              </Label>
              <div className="relative">
                <Input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type={showConfirm ? 'text' : 'password'}
                  id="confirmPassword"
                  className="pr-10"
                />
                <Button
                  variant="icon"
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-0 text-gray-500 hover:text-gray-700">
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </Button>
              </div>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button onClick={handleClosePassword} variant="outline">
                Hủy
              </Button>
            </DialogClose>
            <Button onClick={handleChangePassword} type="submit" variant="blue">
              Lưu
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
