import {
  findById,
  findPendingByResidentId,
  createMaintenanceRequest,
  updateRequest,
  deleteRequest
} from '../../repositories/maintenanceRequest.repository'
import path from 'path'
import fs from 'fs'
const handleCreateMaintenanceRequest = async (
  work_type_id,
  resident_id,
  description,
  title,
  images
) => {
  const request = await createMaintenanceRequest({
    work_type_id,
    resident_id,
    description,
    title,
    images
  })

  return request
}

const handleGetPendingRequest = async (residentId) => {
  return await findPendingByResidentId(residentId)
}

const handleGetRequestDetail = async (id) => {
  return await findById(id)
}

const handleUpdateRequest = async (id, data, files) => {
  const BASE_UPLOAD_FOLDER = path.join(
    process.cwd(),
    'public',
    'images',
    'request'
  )
  const { equipment_id, resident_id, description, priority, removed_images } =
    data
  const request = await findById(id)
  if (!request) return null

  let currentImages = JSON.parse(request.images) || []
  const imagesToDelete = Array.isArray(removed_images)
    ? removed_images
    : JSON.parse(removed_images || '[]')

  imagesToDelete.forEach((imageUrl) => {
    const filePath = path.join(BASE_UPLOAD_FOLDER, imageUrl)

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath) // Xóa file
      console.log(`Deleted file: ${filePath}`)
    }
  })

  // b. Cập nhật mảng ảnh trong DB (Loại bỏ các ảnh đã xóa)
  const updatedImagesAfterRemoval = currentImages.filter(
    (url) => !imagesToDelete.includes(url)
  )

  let newImageUrls = []
  if (files && files.length > 0) {
    newImageUrls = files.map((file) => {
      return file.filename
    })
  }

  const finalFilenames = [...updatedImagesAfterRemoval, ...newImageUrls]

  const updateData = {
    // equipment_id,
    resident_id,
    description,
    priority,
    images: finalFilenames // Cập nhật bằng mảng TÊN TỆP
  }

  await updateRequest(id, updateData)
  return await findById(id)
}

const handleDeleteRequest = async (id) => {
  const request = await findById(id)
  if (!request) return null

  await deleteRequest(id)
  return true
}

export {
  handleCreateMaintenanceRequest,
  handleGetPendingRequest,
  handleGetRequestDetail,
  handleUpdateRequest,
  handleDeleteRequest
}
