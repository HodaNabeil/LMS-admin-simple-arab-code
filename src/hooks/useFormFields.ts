import { Level, Pages, StatusLesson, UserType } from "@/constants/enums";
import type { IFormField, IFormFieldsVariables } from "@/types/app";

const useFormFields = ({ slug }: IFormFieldsVariables) => {
  const signinFields = (): IFormField[] => [
    {
      label: "البريد الإلكتروني",
      name: "email",
      type: "email",
      placeholder: "أدخل بريدك الإلكتروني",
      autoFocus: true,
    },
    {
      label: "كلمة المرور",
      name: "password",
      placeholder: "••••••••",
      type: "password",
    },
  ];

  const CreateSectionFormFields = (): IFormField[] => [
    {
      name: "name",
      label: "اسم القسم",
      type: "text",
      placeholder: "ادخل اسم القسم",
    },
    {
      name: "description",
      label: "وصف القسم",
      type: "textarea",
      placeholder: "ادخل وصف القسم",
    },
  ];

  const signupFields = (): IFormField[] => [
    {
      label: "نوع الحساب",
      name: "user_type",
      type: "select",
      placeholder: "اختر نوع حسابك",
      autoFocus: true,
      options: [
        { value: UserType.USER, label: "" },
        { value: UserType.ADMIN, label: "" },
      ],
    },
    {
      label: "صورة الملف الشخصي",
      name: "profile_picture",
      type: "image",
      placeholder: "اختر صورة شخصية",
    },
    {
      label: "الاسم",
      name: "name",
      type: "text",
      placeholder: "أدخل اسمك الكامل",
    },
    {
      label: "رقم الهاتف",
      name: "phone",
      type: "phone",
      placeholder: "أدخل رقم هاتفك",
    },
    {
      label: "البريد الإلكتروني",
      name: "email",
      type: "email",
      placeholder: "أدخل بريدك الإلكتروني",
    },
    {
      label: "كلمة المرور",
      name: "password",
      type: "password",
      placeholder: "••••••••",
    },
    {
      label: "تأكيد كلمة المرور",
      name: "confirm_password",
      type: "password",
      placeholder: "••••••••",
    },
  ];

  const forgotFields = (): IFormField[] => [
    {
      label: "البريد الإلكتروني",
      name: "email",
      type: "text",
      placeholder: "أدخل بريدك الإلكتروني",
      autoFocus: true,
    },
  ];

  const resetFields = (): IFormField[] => [
    {
      label: "كلمة المرور الجديدة",
      name: "password",
      type: "password",
      placeholder: "أدخل كلمة المرور الجديدة",
      autoFocus: true,
    },
    {
      label: "تأكيد كلمة المرور",
      name: "confirm_password",
      type: "password",
      placeholder: "أعد إدخال كلمة المرور",
    },
  ];
  const loginFields = (): IFormField[] => [
    {
      label: "البريد الإلكتروني",
      name: "email",
      type: "email",
      placeholder: "أدخل بريدك الإلكتروني",
      autoFocus: true,
    },
    {
      label: "كلمة المرور",
      name: "password",
      type: "password",
      placeholder: "••••••••",
    },
  ];

  const userFields = (): IFormField[] => [
    {
      label: "الاسم",
      name: "name",
      type: "text",
      placeholder: "أدخل اسمك الكامل",
      autoFocus: true,
    },
    {
      label: "البريد الإلكتروني",
      name: "email",
      type: "email",
      placeholder: "أدخل بريدك الإلكتروني",
    },
    {
      label: "نوع الحساب",
      name: "role",
      type: "select",
      placeholder: "اختر نوع حسابك",
      options: [
        { value: UserType.USER, label: UserType.USER },
        { value: UserType.ADMIN, label: UserType.ADMIN },
      ],
    },
  ];

  const pathFields = (): IFormField[] => [
    {
      name: "name",
      label: "اسم التراك التعليمي",
      type: "text",
      placeholder: "ادخل اسم المسار التعليمي",
    },
    {
      name: "heading",
      label: "عنوان المسار",
      type: "text",
      placeholder: "ادخل عنوان المسار",
    },
    {
      name: "slug",
      label: "Slug",
      type: "text",
      placeholder: "أدخل مُعرّف المادة (يجب أن يكون فريدًا)",
    },

    {
      name: "description",
      label: "وصف المسار التعليمي",
      type: "textarea",
      placeholder: "ادخل وصف المسار التعليمي",
    },
    {
      name: "image",
      label: "اختار صورة المسار التعليمي",
      type: "image",
      placeholder: "اختار صورة المسار التعليمي",
    },
    {
      name: "roadmap",
      label: "رابط المسار التعليمي",
      type: "file",
      placeholder: "ادخل رابط المسار التعليمي",
    },
  ];

  const createCourseFields = (): IFormField[] => [
    {
      name: "pathId",
      label: "اختار المسار",
      type: "select",
      placeholder: "اختر المسار",
    },
    {
      name: "trackId",
      label: "اختار التراك",
      type: "select",
      placeholder: "اختر التراك",
      options: [],
    },
    {
      name: "slug",
      label: "اسم الدورة (Slug)",
      type: "text",
      placeholder: "ادخل اسم الدورة يجب أن يكون فريد!",
    },
  ];

  const goalsFields = (): IFormField[] => [
    {
      name: "knowledgeNeeded",
      label: "ما ينبغي عليك معرفته",
      type: "textarea",
      placeholder: "مثال: يفضل معرفة أساسيات البرمجة أو HTML",
    },
  ];

  const basicsFields = (): IFormField[] => [
    {
      name: "title",
      label: "اسم الدورة",
      type: "text",
      placeholder: "ادخل اسم الدورة",
    },
    {
      name: "description",
      label: "وصف الدورة",
      type: "textarea",
      placeholder: "ادخل وصف الدورة",
    },
    {
      name: "shortDescription",
      label: "وصف قصير",
      type: "textarea",
      placeholder: "ادخل وصف قصير",
    },
    {
      name: "slug",
      label: "اسم الدورة (Slug)",
      type: "text",
      placeholder: "ادخل اسم الدورة (يجب أن يكون فريد)",
    },
    {
      name: "level",
      label: "مستوى الدورة",
      type: "select",
      placeholder: "اختر مستوى الدورة",
      options: [
        { value: Level.ALL_LEVELS, label: "جميع المستويات" },
        { value: Level.BEGINNER, label: "مبتدئ" },
        { value: Level.INTERMEDIATE, label: "متوسط" },
        { value: Level.ADVANCED, label: "متقدم" },
      ],
    },
    {
      name: "hours",
      label: "مدة الدورة (بالساعات)",
      type: "number",
      placeholder: "ادخل مدة الدورة (بالساعات)",
    },
    {
      name: "thumbnailUrl",
      label: "صورة الدورة",
      type: "image",
      placeholder: "اختار صورة الدورة",
    },
    {
      name: "previewVideo",
      label: "فيديو الدورة",
      type: "file",
      placeholder: "اختر فيديو الدورة",
    },
  ];

  const pricingFields = (): IFormField[] => [
    {
      name: "compareAtPrice",
      label: "سعر العرض بالسينت",
      type: "number",
      placeholder: "ادخل سعر العرض بالسينت",
    },
    {
      name: "price",
      label: "السعر الاساسي بالسينت",
      type: "number",
      placeholder: "ادخل سعر الدورة بالسينت",
    },
  ];

  const lessonFields = (): IFormField[] => [
    {
      name: "name",
      label: "المحاضرة اسم  ",
      type: "text",
      placeholder: "ادخل اسم المحاضرة التعليمي",
    },

    {
      name: "description",
      label: " وصف المحاضرة",
      type: "textarea",
      placeholder: "ادخل وصف المحاضرة التعليمي",
    },
    {
      label: "معاينه المحاضرة",
      name: "role",
      type: "select",
      placeholder: "اختر معاينه المحاضرة",
      options: [
        { value: StatusLesson.LOCKED, label: StatusLesson.LOCKED },
        { value: StatusLesson.UNLOCKED, label: StatusLesson.UNLOCKED },
        { value: StatusLesson.PREVIEW, label: StatusLesson.PREVIEW },
      ],
    },
  ];

  const createTrackFields = (): IFormField[] => [
    {
      name: "pathId",
      label: "المسار التعليمي ",
      type: "select" as const,
      placeholder: "اختر المسار التعليمي",
      options: [],
    },
    {
      name: "title",
      label: "عنوان التراك الفرعي",
      type: "text" as const,
      placeholder: "ادخل عنوان التراك الفرعي",
    },
    {
      name: "slug",
      label: "المُعرّف (Slug)",
      type: "text" as const,
      placeholder: "أدخل مُعرّف التراك (يجب أن يكون فريدًا)",
    },
    {
      name: "summary",
      label: "ملخص التراك",
      type: "textarea" as const,
      placeholder: "ادخل ملخص التراك الفرعي",
    },
    {
      name: "description",
      label: "وصف التراك الفرعي (بالتفاصيل)",
      type: "textarea" as const,
      placeholder: "ادخل وصف التراك الفرعي",
    },
    {
      name: "category",
      label: "تصنيف التراك",
      type: "select" as const,
      placeholder: "اختار تصنيف التراك",
      options: [
        { label: "WEB", value: "WEB" },
        { label: "MOBILE", value: "MOBILE" },
        { label: "OTHER", value: "OTHER" },
      ],
    },
    {
      name: "icon",
      label: "أيقونة التراك",
      type: "text" as const,
      placeholder: "react",
    },
    {
      name: "thumbnail",
      label: "صورة التراك",
      type: "file" as const,
      placeholder: "اختر صورة للمسار",
      description: "يمكن رفع صورة بحجم أقصى 5 ميجابايت (JPEG, PNG, JPG, WebP)",
    },
    {
      name: "metaTitle",
      label: "عنوان SEO",
      type: "text" as const,
      placeholder: "تعلم تطوير الواجهات الأمامية - مسار شامل",
    },
    {
      name: "metaDescription",
      label: "وصف SEO",
      type: "textarea" as const,
      placeholder: "مسار شامل لتعلم تطوير الواجهات الأمامية الحديثة",
    },
  ];

  const getFormFields = (): IFormField[] => {
    switch (slug) {
      case Pages.SIGNIN:
        return signinFields();
      case Pages.SIGNUP:
        return signupFields();
      case Pages.FORGOT_PASSWORD:
        return forgotFields();
      case Pages.RESET_PASSWORD:
        return resetFields();
      case Pages.USERS:
        return userFields();
      case Pages.LOGIN:
        return loginFields();
      case Pages.PATHS:
        return pathFields();
      case Pages.CREATE_TRACKS:
        return createTrackFields();

      case Pages.CREATE_COURSES:
        return createCourseFields();
      case Pages.GOALS:
        return goalsFields();
      case Pages.BASICS:
        return basicsFields();
      case Pages.PRICING:
        return pricingFields();
      case Pages.CURRICULUM:
        return CreateSectionFormFields();
      case Pages.LESSONS:
        return lessonFields();
      default:
        return [];
    }
  };

  return {
    getFormFields,
  };
};

export default useFormFields;
