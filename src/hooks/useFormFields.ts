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

  const createPathsFieldsFirstStep = (): IFormField[] => [
    {
      label: "اسم المسار",
      name: "name",
      type: "text",
      placeholder: "ادخل اسم المسار الجديد",
      autoFocus: true,
    },
    {
      label: "معرف المسار (Slug)",
      name: "slug",
      type: "text",
      placeholder: "ادخل معرف المسار (slug)",
    },
    {
      label: "عنوان المسار",
      name: "title",
      type: "text",
      placeholder: "ادخل عنوان المسار",
    },
    {
      label: "وصف المسار",
      name: "description",
      type: "textarea", // "textarea" can also be used
      placeholder: "أدخل وصفًا موجزًا للمسار",
    },

    // {
    //   label: "صورة المسار",
    //   name: "image",
    //   type: "image",
    //   placeholder: "اختر صورة للمسار",
    // },
    // {
    //   label: "خريطة المسار",
    //   name: "map",
    //   type: "image",
    //   placeholder: "ارفع خريطة المسار",
    // },
    // {
    //   label: "الكورسات",
    //   name: "courses",
    //   type: "select",
    //   placeholder: "اختر كورس",
    //   options: [
    //     { value: "course1", label: "Course 1" },
    //     { value: "course2", label: "Course 2" },
    //   ],
    // },
  ];




  const createPathsFieldsStepTow= (): IFormField[] => [
    {
      label: "صورة المسار",
      name: "image",
      type: "image",
      placeholder: "اختر صورة للمسار",
    },
    {
      label: "خريطة المسار",
      name: "map",
      type: "image",
      placeholder: "ارفع خريطة المسار",
    },
    {
      label: "الكورسات",
      name: "courses",
      type: "select",
      placeholder: "اختر كورس",
      options: [
        { value: "course1", label: "Course 1" },
        { value: "course2", label: "Course 2" },
      ],
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
      case Pages.PATHS_CREATE:
        return createPathsFieldsFirstStep();

      default:
        return [];
    }
  };

  return {
    getFormFields,
  };
};

export default useFormFields;
