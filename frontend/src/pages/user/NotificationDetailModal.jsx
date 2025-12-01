import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
  DialogTrigger
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export const NotificationDetailModal = ({
  notificationItem,
  open,
  setOpen,
  handleMarkAsUnRead,
  handleMarkAsRead
}) => {
  const [isRead, setIsRead] = useState(notificationItem.is_read)

  const handleMarkUnread = async () => {
    await handleMarkAsUnRead(notificationItem)
    setIsRead(false)
  }

  const handleMarkRead = async () => {
    await handleMarkAsRead(notificationItem)
    setIsRead(true)
  }

  const { notification } = notificationItem

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{notification.title}</DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            {new Date(notification.created_at).toLocaleString()}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-4 text-gray-700">
          <p>{notification.content}</p>
        </div>
        <DialogFooter className="mt-6 flex justify-between">
          {!isRead && (
            <Button variant="success" onClick={handleMarkRead}>
              Đánh dấu đã đọc
            </Button>
          )}
          {isRead && (
            <Button variant="outline" onClick={handleMarkUnread}>
              Đánh dấu chưa đọc
            </Button>
          )}
          <Button variant="default" onClick={() => setOpen(false)}>
            Đóng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
