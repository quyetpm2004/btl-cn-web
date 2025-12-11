import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Eye } from 'lucide-react'

const ModalDetailRequest = ({
  sheetOpen,
  setSheetOpen,
  selectedRequest,
  setLightboxImage
}) => {
  const baseURL =
    import.meta.env.VITE_BASE_URL_BACKEND || 'http://localhost:8000'
  const statusColorLabel = {
    0: {
      label: 'Đang chờ xử lý', // Pending
      class: 'border border-blue-400 text-blue-600 bg-blue-50'
    },
    1: {
      label: 'Đang xử lý', // In Progress
      class: 'border border-yellow-400 text-yellow-600 bg-yellow-50'
    },
    2: {
      label: 'Đã hoàn thành', // Completed/Success
      class: 'border border-green-400 text-green-600 bg-green-50'
    },
    3: {
      label: 'Đã hủy', // Cancelled/Failed
      class: 'border border-red-600 bg-red-600 text-white'
    },

    default: {
      label: 'Không xác định', // Undefined
      class: 'border border-gray-400 text-gray-600 bg-gray-50'
    }
  }

  // Convert status number → label
  const requestStatusMap = {
    0: 'Đang chờ xử lý',
    1: 'Đang xử lý',
    2: 'Đã hoàn thành',
    3: 'Đã hủy'
  }

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Chi tiết phản ánh</SheetTitle>
        </SheetHeader>

        <div className="space-y-4 p-4">
          <div>
            <p className="text-sm text-gray-500">Tiêu đề</p>
            <p className="font-medium">{selectedRequest?.title}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Thời gian</p>
            <p className="font-medium">
              {new Date(selectedRequest?.createdAt).toLocaleString('vi-VN', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                timeZone: 'Asia/Ho_Chi_Minh'
              })}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Nội dung</p>
            <p className="font-medium">{selectedRequest?.description}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Loại công việc</p>
            <p className="font-medium">
              {selectedRequest?.work_type?.name || ''}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Trạng thái</p>
            <p className="mt-2 font-medium">
              <span
                className={` ${statusColorLabel[selectedRequest?.status]?.class} status-pending rounded-full border px-3 py-1 text-xs font-semibold`}>
                {statusColorLabel[selectedRequest?.status]?.label ||
                  requestStatusMap[selectedRequest?.status]}
              </span>
            </p>
          </div>

          {selectedRequest?.result ? (
            <>
              <div>
                <p className="text-sm text-gray-500">Kết quả xử lý</p>
                <p className="font-medium">{selectedRequest?.result || '—'}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Hoàn thành lúc</p>
                <p className="font-medium">
                  {new Date(selectedRequest?.resolved_at).toLocaleString(
                    'vi-VN',
                    {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                      timeZone: 'Asia/Ho_Chi_Minh'
                    }
                  )}
                </p>
              </div>
            </>
          ) : null}

          <div>
            <p className="text-sm text-gray-500">Hình ảnh</p>

            <div className="mt-2">
              {(() => {
                let imgs = []

                if (typeof selectedRequest?.images === 'string') {
                  imgs = JSON.parse(selectedRequest.images)
                } else if (Array.isArray(selectedRequest?.images)) {
                  imgs = selectedRequest.images
                }

                if (!imgs || imgs.length === 0) {
                  return (
                    <p className="text-sm text-gray-500">Không có hình ảnh</p>
                  )
                }

                return (
                  <div className="grid grid-cols-2 gap-2">
                    {imgs.map((img, idx) => {
                      const src = `${baseURL}/images/request/${img}`
                      return (
                        <div
                          key={idx}
                          className="group relative overflow-hidden rounded bg-gray-100">
                          <img
                            src={src}
                            alt={`img-${idx}`}
                            className="h-40 w-full object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                            <button
                              type="button"
                              onClick={() => setLightboxImage(img)}
                              className="rounded-full bg-white/20 p-1.5 hover:bg-white/40">
                              <Eye size={18} className="text-white" />
                            </button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )
              })()}
            </div>
          </div>
        </div>

        <SheetFooter>
          <div className="flex justify-end">
            <Button variant="outline" onClick={() => setSheetOpen(false)}>
              Đóng
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default ModalDetailRequest
