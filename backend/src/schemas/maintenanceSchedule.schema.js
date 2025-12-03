import { z } from 'zod'

const title = z.string().min(1, 'title is required')
const description = z.string()
const maintenanceObject = z.string().min(1, 'maintenance_object is required')
const location = z.string().min(1, 'location is required')
const startAt = z.string().refine((val) => !isNaN(Date.parse(val)), {
  message: 'start_at must be a valid datetime string'
})
const endAt = z.string().refine((val) => !isNaN(Date.parse(val)), {
  message: 'end_at must be a valid datetime string'
})
const assignedTo = z.coerce
  .number()
  .int()
  .positive('assigned_to must be a positive integer')
const status = z.coerce.number()
const userId = z.coerce
  .number()
  .int()
  .positive('created_by must be a positive integer')

export const createMaintenanceScheduleSchema = z.strictObject({
  title,
  description,
  maintenance_object: maintenanceObject,
  location,
  start_at: startAt,
  end_at: endAt,
  assigned_to: assignedTo,
  status,
  created_by: userId
})

export const updateMaintenanceScheduleSchema =
  createMaintenanceScheduleSchema.partial()

export const maintenanceScheduleIdParamSchema = z.strictObject({
  id: z.coerce.number().int().positive()
})
