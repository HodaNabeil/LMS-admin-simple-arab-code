import * as z from "zod";

export const createCourseSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(2, { message: "المُعرّف (slug) يجب أن يكون على الأقل 2 أحرف" })
    .regex(/^[a-z0-9-]+$/, {
      message:
        "المُعرّف يجب أن يحتوي فقط على حروف إنجليزية صغيرة، أرقام، وشرطات (-)",
    }),
  trackId: z.string().trim().min(1, { message: "يجب اختيار تراك" }),
  pathId: z.string().trim().min(1, { message: "يجب اختيار مسار" }),
});

export type ICreateCourseForm = z.infer<typeof createCourseSchema>;
