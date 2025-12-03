import multer from 'multer'
import cloudinary from '../config/cloudinary.js'

// Cấu hình Multer để lưu file vào bộ nhớ tạm (RAM)
const storage = multer.memoryStorage()

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // Giới hạn file 5MB
  }
})

// Hàm helper để upload buffer lên Cloudinary
export const uploadToCloudinary = async (fileBuffer, folder = 'uploads') => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folder,
        resource_type: 'auto'
      },
      (error, result) => {
        if (error) {
          return reject(error)
        }
        resolve(result)
      }
    )
    uploadStream.end(fileBuffer)
  })
}

export default upload
