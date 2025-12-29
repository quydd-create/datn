import { Gender } from '@/enums';
import { z } from 'zod';

// Login Schema - matches UserLoginRequest
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email là bắt buộc')
    .email('Email không hợp lệ'),
  password: z
    .string()
    .min(1, 'Mật khẩu là bắt buộc'),
  recaptcha: z
    .boolean()
    .refine(val => val === true, "Vui lòng xác thực bạn không phải là robot"),
});

// Export inferred types
export type LoginFormData = z.infer<typeof loginSchema>;

// Thêm schema register
export const registerSchema = z.object({
  first_name: z
    .string()
    .min(1, 'Họ là bắt buộc')
    .min(2, 'Họ phải có ít nhất 2 ký tự'),
  last_name: z
    .string()
    .min(1, 'Tên là bắt buộc')
    .min(2, 'Tên phải có ít nhất 2 ký tự'),
  phone_number: z
    .string()
    .min(1, 'Số điện thoại là bắt buộc')
    .min(10, 'Số điện thoại không hợp lệ'),
  dob: z
    .string()
    .min(1, 'Ngày sinh là bắt buộc'),
  gender: z
    .string()
    .min(1, 'Giới tính là bắt buộc')
    .refine(
      (val) => Object.values(Gender).includes(val as Gender),
      'Giới tính không hợp lệ'
    ),
  email: z
    .string()
    .min(1, 'Email là bắt buộc')
    .email('Email không hợp lệ'),
  password: z
    .string()
    .min(6, 'Mật khẩu tối thiểu 6 ký tự'),
  confirm_password: z
    .string()
    .min(6, 'Xác nhận mật khẩu là bắt buộc'),
  otp_code: z
    .string()
    .length(6, "Mã OTP phải có 6 chữ số")
    .regex(/^[0-9]+$/, "Mã OTP chỉ được chứa số"),
  recaptcha: z
    .boolean()
    .refine(val => val === true, "Vui lòng xác thực bạn không phải là robot"),
  agree_terms: z
    .boolean()
    .refine(val => val === true, 'Bạn phải đồng ý với điều khoản'),
}).refine((data) => data.password === data.confirm_password, {
  message: 'Mật khẩu không khớp',
  path: ['confirm_password'],
});

export type RegisterFormData = z.infer<typeof registerSchema>;

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'Email là bắt buộc')
    .email('Email không hợp lệ'),
  password: z
    .string()
    .min(6, 'Mật khẩu tối thiểu 6 ký tự'),
  confirm_password: z
    .string()
    .min(6, 'Xác nhận mật khẩu là bắt buộc'),
  recaptcha: z
    .boolean()
    .refine(val => val === true, "Vui lòng xác thực bạn không phải là robot"),
  otp_code: z
    .string()
    .length(6, "Mã OTP phải có 6 chữ số")
    .regex(/^[0-9]+$/, "Mã OTP chỉ được chứa số"),
}).refine((data) => data.password === data.confirm_password, {
  message: 'Mật khẩu không khớp',
  path: ['confirm_password'],
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;