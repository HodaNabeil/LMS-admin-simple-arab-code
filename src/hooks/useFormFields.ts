import { Pages, UserType } from "@/constants/enums";
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
      label: "اسم المسار التعليمي",
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
      name: "selectedPath", // تصحيح اسم الحقل
      label: "اختار المسار التعليمي",
      type: "select",
      placeholder: "اختر المسار التعليمي",
      options: [
        { value: "1", label: "المسار التعليمي 1" },
        { value: "2", label: "المسار التعليمي 2" },
        { value: "3", label: "المسار التعليمي 3" },
      ],
    },
    {
      name: "slug",
      label: "اسم الكورس (Slug)",
      type: "text",
      placeholder: "ادخل اسم الكورس يجب أن يكون فريد!",
    },
  ];

  const goalsFields = (): IFormField[] => [
    {
      name: "whatWillStudentsLearn",
      label: "ما الذي سيتعلمه الطلاب في هذا الكورس؟",
      type: "text",
      placeholder: "مثال: أساسيات البرمجة، استخدام React...",
    },
    {
      name: "requirements",
      label: "ما هي المتطلبات اللازمة للالتحاق بهذا الكورس؟",
      type: "textarea",
      placeholder: "مثال: معرفة سابقة بـ HTML و CSS",
    },
    {
      name: "prerequisiteCourse",
      label: "اختر كورسًا يجب تعلمه أولًا",
      type: "select",
      options: [
        { value: "hodaCourse", label: "كورس Hoda" },
        { value: "hodaCourse4", label: "كورس Hoda4" },
      ],
    },
    {
      name: "targetAudience",
      label: "لمن هذا الكورس؟",
      type: "text",
      placeholder: "مثال: للمبتدئين، للمطورين المتوسطين، للطلاب...",
    },
  ];

  const basicsFields = (): IFormField[] => [
    {
      name: "name",
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
        { value: "all", label: "جميع المستويات" },
        { value: "beginner", label: "مبتدئ" },
        { value: "intermediate", label: "متوسط" },
        { value: "advanced", label: "متقدم" },
      ],
    },
    {
      name: "hours",
      label: "مدة الدورة (بالساعات)",
      type: "number",
      placeholder: "ادخل مدة الدورة (بالساعات)",
    },
    {
      name: "image",
      label: "صورة الدورة",
      type: "image",
      placeholder: "اختار صورة الدورة",
    },
    {
      name: "video",
      label: "فيديو الدورة",
      type: "file",
      placeholder: "اختر فيديو الدورة",
    },
  ];

  const pricingFields = (): IFormField[] => [
    {
      name: "priceInCents",
      label: "السعر بالسنت",
      type: "number",
      placeholder: "ادخل السعر بالسنت",
    },
    {
      name: "price",
      label: "السعر بالدولار",
      type: "number",
      placeholder: "ادخل السعر بالدولار",
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
      case Pages.CREATE_COURSES:
        return createCourseFields();
      case Pages.GOALS:
        return goalsFields();
      case Pages.BASICS:
        return basicsFields();
      case Pages.PRICING:
        return pricingFields();
      default:
        return [];
    }
  };

  return {
    getFormFields,
  };
};

export default useFormFields;
