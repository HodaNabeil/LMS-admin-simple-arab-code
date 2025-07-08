import * as z from "zod";

export const PathSchema = z.object({
  name: z
    .string()
    .trim()
    .min(4, { message: "الاسم يجب أن يكون على الأقل 4 أحرف" })
    .max(10, { message: "الاسم يجب ألا يزيد عن 10 أحرف" }),

  slug: z
    .string()
    .trim()
    .min(2, { message: "المُعرّف (slug) يجب أن يكون على الأقل 2 أحرف" })
    .regex(/^[a-z0-9-]+$/, {
      message:
        "المُعرّف يجب أن يحتوي فقط على حروف إنجليزية صغيرة، أرقام، وشرطات (-)",
    }),

  title: z
    .string()
    .trim()
    .min(2, { message: "العنوان يجب أن يكون على الأقل حرفين" })
    .max(50, { message: "العنوان يجب ألا يزيد عن 50 حرفًا" }),

  description: z
    .string()
    .trim()
    .min(2, { message: "الوصف يجب أن يكون على الأقل حرفين" })
    .max(50, { message: "الوصف يجب ألا يزيد عن 50 حرفًا" }),

  image: z
    .any()
    .refine(
      (file) => {
        if (!file) return false;
        return file instanceof File;
      },
      { message: "صورة المادة مطلوبة" }
    )
    .refine(
      (file) => {
        if (!file) return true;
        return file.size <= 5 * 1024 * 1024; // 5MB max
      },
      { message: "حجم الصورة يجب أن يكون أقل من 5 ميجابايت" }
    )
    .refine(
      (file) => {
        if (!file) return true;
        const allowedTypes = [
          "image/jpeg",
          "image/png",
          "image/jpg",
          "image/webp",
        ];
        return allowedTypes.includes(file.type);
      },
      { message: "نوع الصورة يجب أن يكون JPEG أو PNG أو JPG أو WEBP" }
    ),
  url: z.string().trim(),
});

export type IPathForm = z.infer<typeof PathSchema>;
