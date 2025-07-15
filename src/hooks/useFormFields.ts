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
      type: "text",
      placeholder: "ادخل رابط المسار التعليمي",
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
      default:
        return [];
    }
  };

  return {
    getFormFields,
  };
};

export default useFormFields;
