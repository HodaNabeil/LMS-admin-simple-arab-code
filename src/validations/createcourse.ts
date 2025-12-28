import * as z from "zod";

export const  createCourseSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(2, { message: "المُعرّف (slug) يجب أن يكون على الأقل 2 أحرف" })
    .regex(/^[a-z0-9-]+$/, {
      message:
        "المُعرّف يجب أن يحتوي فقط على حروف إنجليزية صغيرة، أرقام، وشرطات (-)",
    }),
  selectedPath: z
    .string()
    .trim()
    .min(1, { message: "يجب اختيار قيمة" })
    .max(50, { message: "القيمة المختارة طويلة جدًا" }),
});

export type ICreateCourseForm = z.infer<typeof createCourseSchema>;
