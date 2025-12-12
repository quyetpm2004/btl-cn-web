import { z } from 'zod'

const name = z.string().min(1, 'name is required')
const type = z.coerce.number().int()
const start_date = z.coerce
  .date()
  .min(new Date('2000-01-01'), 'start_date is required')
const end_date = z.coerce
  .date()
  .min(new Date('2000-01-01'), 'end_date is required')
const description = z.string()
const status = z.coerce.boolean()

export const createCollectionPeriodSchema = z.strictObject({
  name,
  type,
  start_date,
  end_date,
  description: description.optional(),
  status: status.optional().default(true)
})

export const updateCollectionPeriodSchema =
  createCollectionPeriodSchema.partial()

export const collectionPeriodIdParamSchema = z.strictObject({
  id: z.coerce.number().int().positive()
})
