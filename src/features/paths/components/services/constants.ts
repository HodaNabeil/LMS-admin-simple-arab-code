export const FORM_DATA_KEY = "addPathForm_draft";
export const FORM_STEP_KEY = "addPathForm_step";

export const step1Fields = [
    {
        name: "name",
        label: "اسم المسار التعليمي",
        type: "text" as const,
        placeholder: "ادخل اسم المسار التعليمي",
    },
    {
        name: "slug",
        label: "المُعرّف (Slug)",
        type: "text" as const,
        placeholder: "أدخل مُعرّف المادة (يجب أن يكون فريدًا)",
    },
    {
        name: "heading",
        label: "عنوان المسار ",
        type: "text" as const,
        placeholder: "ادخل عنوان المسار",
    },
    {
        name: "description",
        label: "وصف المسار التعليمي (بالتفاصيل)",
        type: "textarea" as const,
        placeholder: "ادخل وصف المسار التعليمي",
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
