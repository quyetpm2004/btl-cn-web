import { z } from 'zod'

const userId = z.coerce
  .number()
  .int()
  .positive('user_id must be a positive integer')
const fullname = z.string().min(1, 'fullname is required')
const gender = z.coerce
  .number()
  .int()
  .min(1)
  .max(3)
  .describe('1: male, 2: female, 3: other')
const dob = z.coerce.date().max(new Date(), 'dob cannot be in the future')
const place_of_birth = z.string().min(1, 'place_of_birth is required')
const ethnicity = z.string().min(1, 'ethnicity is required')
const occupation = z.string().min(1, 'occupation is required')
const hometown = z.string().min(1, 'hometown is required')
const id_card = z.string().min(1, 'id_card is required')
const household_no = z.string().min(1, 'household_no is required')
const status = z.coerce
  .number()
  .int()
  .min(1)
  .max(3)
  .describe('1: currently residing, 2: temporarily absent, 3: moved out')
const registered_at = z.coerce
  .date()
  .max(new Date(), 'registered_at cannot be in the future')

export const createResidentSchema = z.strictObject({
  user_id: userId.optional(),
  fullname,
  gender,
  dob,
  place_of_birth,
  ethnicity,
  occupation,
  hometown,
  id_card,
  household_no,
  status,
  registered_at
})

export const updateResidentSchema = createResidentSchema.partial()

export const residentIdParamSchema = z.strictObject({
  id: z.coerce.number().int().positive()
})
