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
import { toast } from 'sonner'

export default function MaintenanceRequestModal({
  isOpenModal,
  setIsOpenModal,
  workType,
  onSubmit
}) {
  const { resident } = useResidentStore()

  const [workTypeId, setWorkTypeId] = useState('')
  const [title, setTitle] = useState('')
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
    if (title === '' || description === '') {
      toast.error('Bạn phải nhập đầy đủ thông tin')
      return
    }
    const payload = {
      work_type_id: Number(workTypeId),
      resident_id: Number(resident?.id),
      title,
      description,
      images: images.map((img) => img.file)
    }
    onSubmit?.(payload)
    setIsOpenModal(false)
  }

  return (
    <Dialog open={isOpenModal} onOpenChange={() => setIsOpenModal(false)}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Tạo phản ánh</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Tiêu đề</Label>
            <Input
              className="col-span-3"
              placeholder="Nhập tiêu đề phản ánh"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required></Input>
          </div>

          <div className="grid grid-cols-4 items-start gap-4">
            <Label className="pt-2 text-right">Nội dung</Label>
            <Textarea
              className="col-span-3"
              placeholder="Nhập mô tả chi tiết về phản ánh"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Loại công việc</Label>
            <Select onValueChange={setWorkTypeId}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Chọn công việc" />
              </SelectTrigger>
              <SelectContent>
                {workType.map((e) => (
                  <SelectItem key={e.id} value={String(e.id)}>
                    {e.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
          <Button onClick={handleSubmit}>Gửi yêu cầu</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
