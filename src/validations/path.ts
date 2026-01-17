import * as z from "zod";

// Base fields that are required in both create and edit schemas
const basePathFields = {
  title: z
    .string()
    .trim()
    .min(1, { message: "العنوان مطلوب" })
    .max(255, { message: "العنوان يجب أن يكون أقل من 255 حرف" }),
  slug: z
    .string()
    .trim()
    .min(1, { message: "المُعرّف (slug) يجب أن يكون على الأقل حرف واحد" })
    .max(100, { message: "المُعرّف يجب أن يكون أقل من 100 حرف" })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message:
        "المُعرّف يجب أن يحتوي فقط على حروف إنجليزية صغيرة، أرقام، وشرطات (-)",
    }),
  summary: z
    .string()
    .trim()
    .min(1, { message: "الملخص مطلوب" })
    .max(200, { message: "الملخص يجب أن يكون أقل من 200 حرف" }),
  description: z
    .string()
    .min(1, { message: "الوصف التفصيلي مطلوب" })
    .min(20, { message: "الوصف التفصيلي يجب أن يكون 20 حرف على الأقل" }),
  thumbnailUrl: z
    .string()
    .url({ message: "رابط الصورة المصغرة يجب أن يكون رابط صحيح" })
    .optional(),
  parentId: z
    .string()
    .uuid({ message: "معرف المسار الأب يجب أن يكون UUID صحيح" })
    .optional(),
  icon: z
    .string()
    .trim()
    .optional(),
  metatitle: z
    .string()
    .trim()
    .max(255, { message: "عنوان SEO يجب أن يكون أقل من 255 حرف" })
    .optional(),
  metaDescription: z
    .string()
    .trim()
    .max(500, { message: "وصف SEO يجب أن يكون أقل من 500 حرف" })
    .optional(),
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
