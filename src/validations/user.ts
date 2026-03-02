import { UserType } from '@/constants/enums';
import { z } from 'zod';

const baseUserSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: 'الاسم يجب أن يكون حرفين على الأقل' })
    .max(50, { message: 'الاسم يجب أن يكون أقل من 50 حرف' }),
  email: z
    .string()
    .trim()
    .min(1, { message: 'البريد الإلكتروني مطلوب' })
    .email({
      message: 'يجب أن يكون بريد إلكتروني صحيح',
    }),
  role: z
    .enum([UserType.ADMIN, UserType.USER, UserType.INSTRUCTOR], {
      errorMap: () => ({ message: 'نوع الحساب غير صحيح' }),
    })
    .optional(),
});

const createUserSchema = baseUserSchema.extend({
  password: z
    .string()
    .min(8, { message: 'كلمة المرور يجب أن تكون 8 أحرف على الأقل' }),
});

const updateUserSchema = baseUserSchema.extend({
  password: z
    .string()
    .min(8, { message: 'كلمة المرور يجب أن تكون 8 أحرف على الأقل' })
    .optional(),
});

export const userSchema = createUserSchema;
export const createUserValidation = createUserSchema;
export const updateUserValidation = updateUserSchema;

export type UserSchemaType = z.infer<typeof userSchema>;
