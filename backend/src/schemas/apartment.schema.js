import { z } from 'zod'

const apartmentCode = z.string().min(1, 'apartment_code is required')
const building = z
  .string()
  .min(1)
  .max(1)
  .regex(/^[A-Z]$/, 'building must be a single uppercase letter')
const typeId = z.coerce
  .number()
  .int()
  .positive('type_id must be a positive integer')
const area = z.coerce
  .number()
  .min(40, 'area must be >= 40')
  .max(200, 'area must be <= 200')
const status = z.coerce
  .number()
  .int()
  .min(0)
  .max(1)
  .describe('0: vacant, 1: occupied')
const floor = z.coerce.number().int().min(1).max(20)
const ownerId = z.union([z.coerce.number().int().positive(), z.null()])

export const createApartmentSchema = z.strictObject({
  apartment_code: apartmentCode,
  building,
  type_id: typeId,
  area,
  status,
  floor,
  owner_id: ownerId.optional()
})

export const updateApartmentSchema = createApartmentSchema.partial()

export const apartmentIdParamSchema = z.strictObject({
  id: z.coerce.number().int().positive()
})
