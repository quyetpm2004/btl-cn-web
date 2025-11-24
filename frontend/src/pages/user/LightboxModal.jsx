import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

const LightboxModal = ({ imageSrc, onClose }) => {
  const baseURL =
    import.meta.env.VITE_BASE_URL_BACKEND || 'http://localhost:8000'

  return (
    <Dialog open={!!imageSrc} onOpenChange={onClose}>
      <VisuallyHidden>
        <DialogTitle>Chi tiết ảnh</DialogTitle>
      </VisuallyHidden>
      <DialogContent
        aria-describedby={undefined}
        className="flex max-h-[80vh] max-w-[80vw] items-center justify-center border-none bg-black/80 p-0 shadow-none">
        <img
          src={`${baseURL}/images/request/${imageSrc}`}
          alt="preview"
          className="max-h-[75vh] max-w-[75vw] rounded object-contain"
        />
      </DialogContent>
    </Dialog>
  )
}

export default LightboxModal
