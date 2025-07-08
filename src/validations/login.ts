import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "البريد الإلكتروني مطلوب" })
    .email({
      message: "يجب أن يكون بريد إلكتروني صحيح",
    }),
  password: z
    .string()
    .min(6, { message: "كلمة المرور يجب أن تكون 6 أحرف على الأقل" }),
  rememberMe: z.boolean().optional(),
});
