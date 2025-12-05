import { z } from 'zod'

/**
 * Profile schema for update requests.
 * All fields are optional (suitable for partial updates) but validated when present.
 */
export const profileSchema = z.object({
  email: z.string().email().optional().nullable(),
  full_name: z
    .string()
    .min(2, 'Họ tên phải ít nhất 2 ký tự')
    .max(100)
    .optional()
    .nullable(),
  phone: z
    .string()
    .regex(/^0[0-9]{9,10}$/, 'Số điện thoại không hợp lệ (ví dụ: 09xxxxxxx)')
    .optional()
    .nullable(),
  gender: z
    .preprocess((v) => {
      if (v === null || v === undefined || v === '') return null
      return Number(v)
    }, z.number().int().min(1).max(3))
    .optional()
    .nullable(),
  id_card: z
    .string()
    .regex(/^\d{9}$|^\d{12}$/, 'CMND/CCCD phải là 9 hoặc 12 chữ số')
    .optional()
    .nullable(),
  dob: z
    .string()
    .refine(
      (v) => {
        if (v === null || v === undefined || v === '') return true // allow empty for optional
        const d = Date.parse(v)
        return !Number.isNaN(d)
      },
      {
        message:
          'Ngày sinh không hợp lệ, dùng định dạng ISO (YYYY-MM-DD) hoặc timestamp'
      }
    )
    .optional()
    .nullable(),
  hometown: z.string().max(100).optional().nullable(),
  ethnicity: z.string().max(50).optional().nullable(),
  occupation: z.string().max(100).optional().nullable(),
  household_no: z.string().max(20).optional().nullable()
})
