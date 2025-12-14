import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  DollarSign,
  Settings,
  Calendar,
  MoreHorizontal,
  Wrench
} from 'lucide-react'

const CATEGORIES = {
  1: { label: 'Hệ thống', color: 'destructive', icon: Settings },
  2: { label: 'Sự kiện', color: 'outline', icon: Calendar },
  3: { label: 'Hóa đơn', color: 'success', icon: DollarSign },
  4: { label: 'Bảo trì', color: 'default', icon: Wrench },
  5: { label: 'Khác', color: 'secondary', icon: MoreHorizontal }
}

export const NotificationDialog = ({
  open,
  onOpenChange,
  notification,
  onSubmit
}) => {
  const [formData, setFormData] = useState({
    title: notification?.title || '',
    content: notification?.content || '',
    category: notification?.category ? String(notification.category) : '5'
  })

  useEffect(() => {
    if (open) {
      setFormData({
        title: notification?.title || '',
        content: notification?.content || '',
        category: notification?.category ? String(notification.category) : '5'
      })
    }
  }, [open, notification])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {notification ? 'Chỉnh sửa thông báo' : 'Tạo thông báo mới'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Tiêu đề</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Danh mục</Label>
            <Select
              value={formData.category}
              onValueChange={(val) =>
                setFormData({ ...formData, category: val })
              }>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Chọn danh mục" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(CATEGORIES).map(([key, { label }]) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">Nội dung</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              required
              className="min-h-[100px]"
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Hủy</Button>
            </DialogClose>
            <Button type="submit" variant="blue">
              {notification ? 'Cập nhật' : 'Thêm mới'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
