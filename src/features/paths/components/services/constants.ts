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
        name: "icon",
        label: "أيقونة المسار",
        type: "text" as const,
        placeholder: "book-open",
    },
    {
        name: "metaTitle",
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
        name: "category",
        label: "تصنيف المسار",
        type: "select" as const,
        placeholder: "اختار تصنيف المسار",
        options: [
            { label: "WEB", value: "WEB" },
            { label: "MOBILE", value: "MOBILE" },
            { label: "OTHER", value: "OTHER" },
        ],
    },
    {
        name: "trackIds",
        label: "معرفات المسارات (Track IDs)",
        type: "text" as const,
        placeholder: "ادخل معرفات المسارات",
        description: "يمكن ادخال معرفات المسارات هنا"
    },

];
