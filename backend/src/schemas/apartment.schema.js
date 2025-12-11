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
  .min(25, 'area must be >= 25')
  .max(200, 'area must be <= 200')
const status = z.coerce
  .number()
  .int()
  .min(0)
  .max(1)
  .describe('0: vacant, 1: occupied')
const floor = z.coerce.number().int().positive('floor must be positive')
const ownerId = z.union([z.coerce.number().int().positive(), z.null()])
const isLiving = z.union([z.boolean(), z.string()]).transform((val) => {
  if (typeof val === 'boolean') return val
  if (typeof val === 'string') {
    if (val.toLowerCase() === 'true' || val === '1') return true
    if (val.toLowerCase() === 'false' || val === '0') return false
  }
  return Boolean(val)
})

export const createApartmentSchema = z.strictObject({
  apartment_code: apartmentCode,
  building,
  type_id: typeId,
  area,
  status,
  floor,
  owner_id: ownerId.optional(),
  is_living: isLiving.optional()
})

export const updateApartmentSchema = createApartmentSchema.partial()

export const apartmentIdParamSchema = z.strictObject({
  id: z.coerce.number().int().positive()
})
