import { UserType } from "@/constants/enums";
import { z } from "zod";

export const userSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "الاسم يجب أن يكون حرفين على الأقل" })
    .max(50, { message: "الاسم يجب أن يكون أقل من 50 حرف" }),
  email: z
    .string()
    .trim()
    .min(1, { message: "البريد الإلكتروني مطلوب" })
    .email({
      message: "يجب أن يكون بريد إلكتروني صحيح",
    }),
  role: z.enum([UserType.ADMIN, UserType.USER], {
    errorMap: () => ({ message: "نوع الحساب غير صحيح" }),
  }),
});

export type UserSchemaType = z.infer<typeof userSchema>;
