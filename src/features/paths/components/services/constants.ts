export const FORM_DATA_KEY = "addPathForm_draft";
export const FORM_STEP_KEY = "addPathForm_step";

export const step1Fields = [
    {
        name: "title",
        label: "عنوان المسار التعليمي",
        type: "text" as const,
        placeholder: "ادخل عنوان المسار التعليمي",
    },
    {
        name: "slug",
        label: "المُعرّف (Slug)",
        type: "text" as const,
        placeholder: "أدخل مُعرّف المادة (يجب أن يكون فريدًا)",
    },
    {
        name: "summary",
        label: "ملخص المسار",
        type: "text" as const,
        placeholder: "ادخل ملخص المسار",
    },
    {
        name: "description",
        label: "وصف المسار التعليمي (بالتفاصيل)",
        type: "textarea" as const,
        placeholder: "ادخل وصف المسار التعليمي",
    },
    {
        name: "thumbnailUrl",
        label: "رابط الصورة المصغرة",
        type: "text" as const,
        placeholder: "https://example.com/images/path-cover.jpg",
    },
    {
        name: "parentId",
        label: "معرف المسار الأب (اختياري)",
        type: "text" as const,
        placeholder: "123e4567-e89b-12d3-a456-426614174000",
    },
    {
        name: "icon",
        label: "أيقونة المسار",
        type: "text" as const,
        placeholder: "book-open",
    },
    {
        name: "metatitle",
        label: "عنوان SEO",
        type: "text" as const,
        placeholder: "تعلم أساسيات اللغة العربية - مسار تعليمي شامل",
    },
    {
        name: "metaDescription",
        label: "وصف SEO",
        type: "textarea" as const,
        placeholder: "مسار تعليمي شامل لإتقان أساسيات اللغة العربية مع إرشادات الخبراء",
    },
];

export const step2Fields = [
    {
        name: "image",
        label: "اختار صورة المسار التعليمي",
        type: "file" as const,
        placeholder: "اختار صورة المسار التعليمي",
        description: "يجب أن تكون الصورة JPEG أو PNG أو JPG أو WEBP",
        fileType: "image" as const,
        accept: "image/*",
        maxSize: 5,
        allowedTypes: ["image/jpeg", "image/png", "image/jpg", "image/webp"],
    },
    {
        name: "roadmap",
        label: "خريطة المسار التعليمي (PDF فقط)",
        type: "file" as const,
        placeholder: "ارفع ملف PDF لخريطة المسار",
        description: "يجب رفع ملف PDF فقط، وأقل من 5 ميجابايت",
        fileType: "pdf" as const,
        accept: "application/pdf",
        maxSize: 5,
        allowedTypes: ["application/pdf"],
    },
];
