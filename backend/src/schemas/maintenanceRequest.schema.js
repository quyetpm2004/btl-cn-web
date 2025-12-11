import { z } from 'zod'

const residentId = z.coerce
  .number()
  .int()
  .positive('resident_id must be a positive integer')
const apartmentId = z.union([z.coerce.number().int().positive(), z.null()])
const location = z.string().min(1, 'location is required')
const title = z.string().min(1, 'title is required')
const description = z.string()
const images = z.array(z.string().min(1))
const status = z.coerce
  .number()
  .int()
  .min(0)
  .max(3)
  .describe('0: pending, 1: done, 2: cancelled, 3: assigned/in progress')
const workTypeId = z.coerce
  .number()
  .int()
  .positive('work_type_id must be a positive integer')
const assignedTo = z.coerce
  .number()
  .int()
  .positive('assigned_to must be a positive integer')

export const createMaintenanceRequestSchema = z.strictObject({
  resident_id: residentId,
  apartment_id: apartmentId.optional(),
  location,
  title,
  description,
  images: images.optional(),
  status,
  work_type_id: workTypeId,
  assigned_to: assignedTo
})

export const updateMaintenanceRequestSchema =
  createMaintenanceRequestSchema.partial()

export const maintenanceRequestIdParamSchema = z.strictObject({
  id: z.coerce.number().int().positive()
})
