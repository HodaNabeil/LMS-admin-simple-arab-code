import { InputTypes } from "@/constants/enums";
import type { IFormField } from "@/types/app";

export const FORM_DATA_KEY = "addPathForm_draft";
export const FORM_STEP_KEY = "addPathForm_step";

export const step1Fields: IFormField[] = [
    {
        name: "title",
        label: "عنوان المسار التعليمي",
        type: InputTypes.TEXT,
        placeholder: "ادخل عنوان المسار التعليمي",
    },
    {
        name: "slug",
        label: "المُعرّف (Slug)",
        type: InputTypes.TEXT,
        placeholder: "أدخل مُعرّف المادة (يجب أن يكون فريدًا)",
    },
    {
        name: "summary",
        label: "ملخص المسار",
        type: InputTypes.TEXTAREA,
        placeholder: "ادخل ملخص المسار",
    },
    {
        name: "description",
        label: "وصف المسار التعليمي (بالتفاصيل)",
        type: InputTypes.TEXTAREA,
        placeholder: "ادخل وصف المسار التعليمي",
    },
    {
        name: "icon",
        label: "أيقونة المسار",
        type: InputTypes.TEXT,
        placeholder: "book-open",
    },
    {
        name: "metaTitle",
        label: "عنوان SEO",
        type: InputTypes.TEXT,
        placeholder: "تعلم أساسيات اللغة العربية - مسار تعليمي شامل",
    },
    {
        name: "metaDescription",
        label: "وصف SEO",
        type: InputTypes.TEXTAREA,
        placeholder: "مسار تعليمي شامل لإتقان أساسيات اللغة العربية مع إرشادات الخبراء",
    },
];

export const step2Fields: IFormField[] = [
    {
        name: "category",
        label: "تصنيف المسار",
        type: InputTypes.SELECT,
        placeholder: "اختار تصنيف المسار",
        options: [
            { label: "WEB", value: "WEB" },
            { label: "MOBILE", value: "MOBILE" },
            { label: "OTHER", value: "OTHER" },
        ],
    }
];

