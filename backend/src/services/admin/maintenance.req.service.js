import * as MaintenanceRequestRepo from '@/repositories/maintenanceRequest.repository'
import { AppError } from '../../utils/errors.js'
import { StatusCodes } from 'http-status-codes'
import path from 'path'
import fs from 'fs'

async function getAllPending(user) {
  return await MaintenanceRequestRepo.findAllPending(user)
}

async function getDetail(id) {
  return await MaintenanceRequestRepo.findById(id)
}

async function update(id, data, files) {
  const BASE_UPLOAD_FOLDER = path.join(
    process.cwd(),
    'public',
    'images',
    'request'
  )
  const { resident_id, description, priority, removed_images } = data
  const request = await MaintenanceRequestRepo.findById(id)
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

  await MaintenanceRequestRepo.updateRequest(id, updateData)
  return await MaintenanceRequestRepo.findById(id)
}

async function deleteRequest(id) {
  const deletedRows = await MaintenanceRequestRepo.deleteRequest(id)
  if (deletedRows === 0) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Maintenance request not found')
  }
}

async function assignRequest(id, technicianId) {
  const request = await MaintenanceRequestRepo.findById(id)
  if (!request) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Maintenance request not found')
  }
  // Status 1: Assigned/In Progress (depending on your logic, let's say 1 is Assigned)
  // Or maybe keep status 0 (Pending) but assigned_to is set.
  // Let's assume status 1 is "Processing" or "Assigned".
  // Based on migration: 0:pending | 1:done | 2:cancelled.
  // Wait, the migration says: 0:pending | 1:done | 2:cancelled.
  // It doesn't have an "Assigned" or "In Progress" status explicitly documented in comment,
  // but usually we need one. Let's assume we can use 3 for "In Progress" or just keep it 0 but assigned.
  // However, the user wants "Xử lý ngay" -> "Nhận công việc" (Accept).
  // Let's define:
  // 0: Pending (Chưa xử lý)
  // 1: Done (Đã hoàn thành)
  // 2: Cancelled (Đã hủy)
  // 3: Assigned/In Progress (Đang xử lý)

  await MaintenanceRequestRepo.updateRequest(id, {
    assigned_to: technicianId,
    status: 3 // Assigned
  })
  return await MaintenanceRequestRepo.findById(id)
}

async function updateStatus(id, status, userId = null) {
  const request = await MaintenanceRequestRepo.findById(id)
  if (!request) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Maintenance request not found')
  }

  const updateData = { status }
  // Nếu status = 0 (Pending/Hủy nhận việc), reset assigned_to về null
  if (status === 0) {
    updateData.assigned_to = null
  }
  // Nếu status = 3 (Nhận việc) và có userId, gán assigned_to = userId
  if (status === 3 && userId) {
    updateData.assigned_to = userId
  }

  await MaintenanceRequestRepo.updateRequest(id, updateData)
  return await MaintenanceRequestRepo.findById(id)
}

async function completeRequest(id, result) {
  const request = await MaintenanceRequestRepo.findById(id)
  if (!request) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Maintenance request not found')
  }
  await MaintenanceRequestRepo.updateRequest(id, {
    status: 1, // Done
    result: result,
    resolved_at: new Date()
  })
  return await MaintenanceRequestRepo.findById(id)
}

export {
  getAllPending,
  getDetail,
  update,
  deleteRequest,
  assignRequest,
  updateStatus,
  completeRequest
}
