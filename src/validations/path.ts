import * as z from "zod";

// Base fields that are required in both create and edit schemas
const basePathFields = {
  name: z
    .string()
    .trim()
    .min(4, { message: "الاسم يجب أن يكون على الأقل 4 أحرف" }),
  slug: z
    .string()
    .trim()
    .min(2, { message: "المُعرّف (slug) يجب أن يكون على الأقل 2 أحرف" })
    .regex(/^[a-z0-9-]+$/, {
      message:
        "المُعرّف يجب أن يحتوي فقط على حروف إنجليزية صغيرة، أرقام، وشرطات (-)",
    }),
  description: z
    .string()
    .min(1, { message: "الوصف التفصيلي مطلوب" })
    .min(20, { message: "الوصف التفصيلي يجب أن يكون 20 حرف على الأقل" }),
  heading: z
    .string()
    .min(1, { message: "المحتوى المختصر مطلوب" })
    .min(10, { message: "المحتوى المختصر يجب أن يكون 10 أحرف على الأقل" }),
};

export const pathSchema = z.object({
  ...basePathFields,
  image: z
    .any()
    .refine(
      (file) => {
        if (!file) return false;
        return file instanceof File;
      },
      { message: "صورة المسار مطلوبة" }
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
  roadmap: z
    .any()
    .refine((file) => file instanceof File && file.type === "application/pdf", {
      message: "يجب رفع ملف PDF فقط",
    })
    .refine((file) => file instanceof File && file.size <= 5 * 1024 * 1024, {
      message: "حجم الملف يجب أن يكون أقل من 5 ميجابايت",
    }),
});

// Schema for editing paths - base fields are required, files are optional
export const pathEditSchema = z.object({
  ...basePathFields,

  image: z
    .any()
    .refine(
      (file) => {
        // If no file provided, that's okay for edit
        if (!file || file === undefined || file === null) return true;
        return file instanceof File;
      },
      { message: "يجب أن تكون الصورة ملف صالح" }
    )
    .refine(
      (file) => {
        if (!file || file === undefined || file === null) return true;
        return file.size <= 5 * 1024 * 1024; // 5MB max
      },
      { message: "حجم الصورة يجب أن يكون أقل من 5 ميجابايت" }
    )
    .refine(
      (file) => {
        if (!file || file === undefined || file === null) return true;
        const allowedTypes = [
          "image/jpeg",
          "image/png",
          "image/jpg",
          "image/webp",
        ];
        return allowedTypes.includes(file.type);
      },
      { message: "نوع الصورة يجب أن يكون JPEG أو PNG أو JPG أو WEBP" }
    )
    .optional(),

  roadmap: z
    .any()
    .refine(
      (file) => {
        // If no file provided, that's okay for edit
        if (!file || file === undefined || file === null) return true;
        return file instanceof File && file.type === "application/pdf";
      },
      { message: "يجب رفع ملف PDF فقط" }
    )
    .refine(
      (file) => {
        if (!file || file === undefined || file === null) return true;
        return file instanceof File && file.size <= 5 * 1024 * 1024;
      },
      { message: "حجم الملف يجب أن يكون أقل من 5 ميجابايت" }
    )
    .optional(),
});

export type IPathForm = z.infer<typeof pathSchema>;
export type PathEdit = z.infer<typeof pathEditSchema>;
