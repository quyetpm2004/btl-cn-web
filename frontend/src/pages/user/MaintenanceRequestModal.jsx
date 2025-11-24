import { useState, useRef } from 'react'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@/components/ui/select'
import { X, Plus } from 'lucide-react'
import { useResidentStore } from '@/stores/useResidentStore'

export default function MaintenanceRequestModal({
  isOpenModal,
  setIsOpenModal,
  equipments,
  onSubmit
}) {
  const { resident } = useResidentStore()

  const [equipmentId, setEquipmentId] = useState('')
  const [priority, setPriority] = useState('2')
  const [description, setDescription] = useState('')
  const [images, setImages] = useState([])
  const fileInputRef = useRef(null)
  const MAX_IMAGES = 5

  const handleImageSelect = (e) => {
    const files = e.target.files
    if (!files) return

    const newImages = Array.from(files).slice(0, MAX_IMAGES - images.length)

    newImages.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (event) => {
        setImages((prev) => [
          ...prev,
          {
            id: Date.now() + Math.random(),
            file: file,
            preview: event.target.result
          }
        ])
      }
      reader.readAsDataURL(file)
    })

    // Reset input
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const removeImage = (id) => {
    setImages((prev) => prev.filter((img) => img.id !== id))
  }

  const handleSubmit = () => {
    const payload = {
      equipment_id: Number(equipmentId),
      resident_id: Number(resident?.id),
      priority: Number(priority),
      description,
      images: images.map((img) => img.file)
    }
    onSubmit?.(payload)
  }

  return (
    <Dialog open={isOpenModal} onOpenChange={() => setIsOpenModal(false)}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Tạo yêu cầu bảo trì thiết bị</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Thiết bị</Label>
            <Select onValueChange={setEquipmentId}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Chọn thiết bị" />
              </SelectTrigger>
              <SelectContent>
                {equipments.map((e) => (
                  <SelectItem key={e.id} value={String(e.id)}>
                    {e.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Mức ưu tiên</Label>
            <Select onValueChange={setPriority}>
              <SelectTrigger className="col-span-3">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem>Chọn mức độ ưu tiên</SelectItem>
                <SelectItem value="1">Thấp</SelectItem>
                <SelectItem value="2">Trung bình</SelectItem>
                <SelectItem value="3">Cao</SelectItem>
                <SelectItem value="4">Khẩn cấp</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-start gap-4">
            <Label className="pt-2 text-right">Mô tả</Label>
            <Textarea
              className="col-span-3"
              placeholder="Nhập mô tả chi tiết về lỗi hoặc yêu cầu bảo trì"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Image Upload Section */}
          <div className="grid grid-cols-4 items-start gap-4">
            <Label className="pt-2 text-right">
              Hình ảnh ({images.length}/{MAX_IMAGES})
            </Label>
            <div className="col-span-3">
              <div className="mb-3">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageSelect}
                  className="hidden"
                  disabled={images.length >= MAX_IMAGES}
                />
                <button
                  type="button"
                  onClick={() =>
                    fileInputRef.current && fileInputRef.current.click()
                  }
                  disabled={images.length >= MAX_IMAGES}
                  className="flex items-center gap-2 rounded border-2 border-dashed border-blue-300 bg-blue-50 px-4 py-3 text-sm text-blue-600 hover:bg-blue-100 disabled:border-gray-300 disabled:bg-gray-50 disabled:text-gray-400">
                  <Plus size={16} />
                  Thêm hình ảnh
                </button>
              </div>

              {/* Image Preview Gallery */}
              {images.length > 0 && (
                <div className="grid grid-cols-3 gap-2">
                  {images.map((img) => (
                    <div
                      key={img.id}
                      className="group relative aspect-square overflow-hidden rounded-lg bg-gray-200">
                      <img
                        src={img.preview}
                        alt="preview"
                        className="h-full w-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(img.id)}
                        className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                        <X size={24} className="text-white" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Hủy
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={handleSubmit}>Gửi yêu cầu</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
