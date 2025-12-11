import express from 'express'
import upload, { uploadToCloudinary } from '@/middlewares/upload.js'

const router = express.Router()

router.post('/', upload.single('image'), async (req, res) => {
  const result = await uploadToCloudinary(req.file.buffer, 'test-folder')
  res.json({ url: result.secure_url })
})

export default router
