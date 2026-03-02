import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "البريد الإلكتروني أو اسم المستخدم مطلوب" })
    .refine((value) => {
      // Allow email format or simple username like "Adam"
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const usernameRegex = /^[a-zA-Z]+$/;
      return emailRegex.test(value) || usernameRegex.test(value);
    }, {
      message: "يجب أن يكون بريد إلكتروني صحيح أو اسم مستخدم صحيح",
    }),
  password: z
    .string()
    .min(6, { message: "كلمة المرور يجب أن تكون 6 أحرف على الأقل" }),
  rememberMe: z.boolean().optional(),
});
