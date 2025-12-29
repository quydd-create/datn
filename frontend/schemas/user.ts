import { Gender } from "@/enums";
import { parseDate } from "@/utils/parseToDate";
import { z } from 'zod';

export const profileSchema = z.object({
    gender: z
      .string()
      .min(1, 'Giới tính là bắt buộc')
      .refine(
        (val) => Object.values(Gender).includes(val as Gender),
        'Giới tính không hợp lệ'
      ),
    last_name: z
      .string()
      .min(1, 'Họ là bắt buộc'),
    first_name: z
      .string()
      .min(1, 'Tên là bắt buộc'),
    dob: z
      .string()
      .min(1, 'Ngày sinh là bắt buộc')
      .refine(
        (val) => parseDate(val) !== undefined && parseDate(val) !== null,
        'Ngày sinh không hợp lệ'
      ),
  });
  
  export type ProfileFormData = z.infer<typeof profileSchema>;