import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { updatePasswordApi } from '@/services/user.api.js'
import { useState } from 'react'
import { toast } from 'sonner'

export function ModalChangePassword({
  isOpenChangePassword,
  handleClosePassword
}) {
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
    console.log(res)
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
            <div className="grid gap-3">
              <Label htmlFor="name-1">Mật khẩu cũ</Label>
              <Input
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                type="password"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="name-1">Mật khẩu mới</Label>
              <Input
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                type="password"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="name-1">Xác nhận mât khẩu</Label>
              <Input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button onClick={handleClosePassword} variant="outline">
                Hủy
              </Button>
            </DialogClose>
            <Button onClick={handleChangePassword} type="submit">
              Lưu
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
