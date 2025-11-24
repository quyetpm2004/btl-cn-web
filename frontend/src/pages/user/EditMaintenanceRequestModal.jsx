import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
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
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@/components/ui/select'
import { X, Plus, Eye } from 'lucide-react'
import { useResidentStore } from '@/stores/useResidentStore'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import LightboxModal from './LightboxModal'

const baseURL = import.meta.env.VITE_BASE_URL_BACKEND || 'http://localhost:8000'

// Edit modal for existing maintenance request
const EditMaintenanceRequestModal = ({
  isOpenModal,
  setIsOpenModal,
  equipments = [],
  initialData = null,
  onSubmit
}) => {
  const { resident } = useResidentStore()

  const [equipmentId, setEquipmentId] = useState('')
  const [priority, setPriority] = useState('2')
  const [description, setDescription] = useState('')

  // images state supports both existing images (from server) and new uploads
  // existingImages: { id?, url }
  const [existingImages, setExistingImages] = useState([])
  const [newImages, setNewImages] = useState([]) // { id, file, preview }
  const [removedImageUrls, setRemovedImageUrls] = useState([])
  const [lightboxImage, setLightboxImage] = useState(null) // for fullscreen preview

  const fileInputRef = useRef(null)
  const MAX_IMAGES = 5

  // populate from initialData when modal opens / initialData changes
  useEffect(() => {
    if (initialData) {
      setEquipmentId(String(initialData.equipment_id ?? ''))
      setPriority(String(initialData.priority ?? '2'))
      setDescription(initialData.description ?? '')

      let imgs = []

      if (typeof initialData?.images === 'string') {
        imgs = JSON.parse(initialData.images)
      } else if (Array.isArray(initialData?.images)) {
        imgs = initialData.images
      }
      setExistingImages(imgs)
      setNewImages([])
      setRemovedImageUrls([])
    } else {
      // reset
      setEquipmentId('')
      setPriority('2')
      setDescription('')
      setExistingImages([])
      setNewImages([])
      setRemovedImageUrls([])
    }
  }, [initialData, isOpenModal])

  const handleImageSelect = (e) => {
    const files = e.target.files
    if (!files) return

    const remaining = MAX_IMAGES - (existingImages.length + newImages.length)
    const newFiles = Array.from(files).slice(0, remaining)

    newFiles.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (event) => {
        setNewImages((prev) => [
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

    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const removeExistingImage = (url) => {
    setExistingImages((prev) => prev.filter((u) => u !== url))
    setRemovedImageUrls((prev) => [...prev, url])
  }

  const removeNewImage = (id) => {
    setNewImages((prev) => prev.filter((i) => i.id !== id))
  }

  const handleSubmit = () => {
    // Prepare payload. Backend expectations vary; we include
    // - equipment_id, resident_id, priority, description
    // - images: File[] (new uploads)
    // - removed_images: string[] (urls to remove)
    const payload = {
      id: initialData?.id,
      equipment_id: Number(equipmentId),
      resident_id: Number(initialData?.resident_id ?? resident?.id),
      priority: Number(priority),
      description,
      images: newImages.map((i) => i.file),
      removed_images: removedImageUrls
    }

    console.log('Submitting payload:', payload)

    onSubmit?.(payload)
  }

  return (
    <>
      <Dialog open={isOpenModal} onOpenChange={() => setIsOpenModal(false)}>
        <DialogContent className="max-w-lg" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>Chỉnh sửa yêu cầu bảo trì</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Thiết bị</Label>
              <Select value={equipmentId} onValueChange={setEquipmentId}>
                <SelectTrigger className="col-span-3">
                  <SelectValue />
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
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
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

            {/* Image management */}
            <div className="grid grid-cols-4 items-start gap-4">
              <Label className="pt-2 text-right">
                Hình ảnh ({existingImages.length + newImages.length}/
                {MAX_IMAGES})
              </Label>
              <div className="col-span-3">
                <div className="mb-3 flex gap-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageSelect}
                    className="hidden"
                    disabled={
                      existingImages.length + newImages.length >= MAX_IMAGES
                    }
                  />
                  <button
                    type="button"
                    onClick={() =>
                      fileInputRef.current && fileInputRef.current.click()
                    }
                    disabled={
                      existingImages.length + newImages.length >= MAX_IMAGES
                    }
                    className="flex items-center gap-2 rounded border-2 border-dashed border-blue-300 bg-blue-50 px-4 py-2 text-sm text-blue-600 hover:bg-blue-100 disabled:border-gray-300 disabled:bg-gray-50 disabled:text-gray-400">
                    <Plus size={14} /> Thêm
                  </button>
                </div>

                {/* Existing images */}
                {existingImages.length > 0 && (
                  <div className="mb-2 grid grid-cols-3 gap-2">
                    {existingImages.map((img, idx) => (
                      <div
                        key={idx}
                        className="group relative overflow-hidden rounded bg-gray-100">
                        <img
                          src={`${baseURL}/images/request/${img}`}
                          alt={`existing-${idx}`}
                          className="h-28 w-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                          <button
                            type="button"
                            onClick={() => setLightboxImage(img)}
                            className="rounded-full bg-white/20 p-1.5 hover:bg-white/40">
                            <Eye size={18} className="text-white" />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeExistingImage(img)}
                            className="rounded-full bg-white/20 p-1.5 hover:bg-white/40">
                            <X size={18} className="text-white" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* New image previews */}
                {newImages.length > 0 && (
                  <div className="grid grid-cols-3 gap-2">
                    {newImages.map((img) => (
                      <div
                        key={img.id}
                        className="group relative overflow-hidden rounded bg-gray-100">
                        <img
                          src={img.preview}
                          alt="new"
                          className="h-28 w-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                          <button
                            type="button"
                            onClick={() => setLightboxImage(img.preview)}
                            className="rounded-full bg-white/20 p-1.5 hover:bg-white/40">
                            <Eye size={18} className="text-white" />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeNewImage(img.id)}
                            className="rounded-full bg-white/20 p-1.5 hover:bg-white/40">
                            <X size={18} className="text-white" />
                          </button>
                        </div>
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
              <Button onClick={handleSubmit}>Lưu thay đổi</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <LightboxModal
        imageSrc={lightboxImage}
        onClose={() => setLightboxImage(null)}
      />
    </>
  )
}

export default EditMaintenanceRequestModal
