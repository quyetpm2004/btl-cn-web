import { z } from 'zod'

const name = z.string().min(1, 'name is required')
const description = z.string()
const price = z.coerce.number().min(0, 'price must be a positive number')
const unit = z.string().min(1, 'unit is required')

export const createServiceSchema = z.strictObject({
  name,
  description,
  price,
  unit
})

export const updateServiceSchema = createServiceSchema.partial()

export const serviceIdParamSchema = z.strictObject({
  id: z.coerce.number().int().positive()
})
