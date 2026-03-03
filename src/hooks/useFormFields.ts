import { CreateCouponDtoType, Level, Pages, UserType, InputTypes } from "@/constants/enums";
import type { IFormField, IFormFieldsVariables, IOption } from "@/types/app";

const useFormFields = ({ slug }: IFormFieldsVariables) => {
  const signinFields = (): IFormField[] => [
    {
      label: "البريد الإلكتروني",
      name: "email",
      type: InputTypes.EMAIL,
      placeholder: "أدخل بريدك الإلكتروني",
      autoFocus: true,
    },
    {
      label: "كلمة المرور",
      name: "password",
      placeholder: "••••••••",
      type: InputTypes.PASSWORD,
    },
  ];

  const CreateSectionFormFields = (): IFormField[] => [
    {
      name: "title",
      label: "اسم القسم",
      type: InputTypes.TEXT,
      placeholder: "ادخل اسم القسم",
    },
    {
      name: "description",
      label: "وصف القسم",
      type: InputTypes.TEXTAREA,
      placeholder: "ادخل وصف القسم",
    },
  ];

  const signupFields = (): IFormField[] => [
    {
      label: "نوع الحساب",
      name: "user_type",
      type: InputTypes.SELECT,
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
      type: InputTypes.IMAGE,
      placeholder: "اختر صورة شخصية",
    },
    {
      label: "الاسم",
      name: "name",
      type: InputTypes.TEXT,
      placeholder: "أدخل اسمك الكامل",
    },
    {
      label: "رقم الهاتف",
      name: "phone",
      type: InputTypes.PHONE,
      placeholder: "أدخل رقم هاتفك",
    },
    {
      label: "البريد الإلكتروني",
      name: "email",
      type: InputTypes.EMAIL,
      placeholder: "أدخل بريدك الإلكتروني",
    },
    {
      label: "كلمة المرور",
      name: "password",
      type: InputTypes.PASSWORD,
      placeholder: "••••••••",
    },
    {
      label: "تأكيد كلمة المرور",
      name: "confirm_password",
      type: InputTypes.PASSWORD,
      placeholder: "••••••••",
    },
  ];

  const forgotFields = (): IFormField[] => [
    {
      label: "البريد الإلكتروني",
      name: "email",
      type: InputTypes.TEXT,
      placeholder: "أدخل بريدك الإلكتروني",
      autoFocus: true,
    },
  ];

  const resetFields = (): IFormField[] => [
    {
      label: "كلمة المرور الجديدة",
      name: "password",
      type: InputTypes.PASSWORD,
      placeholder: "أدخل كلمة المرور الجديدة",
      autoFocus: true,
    },
    {
      label: "تأكيد كلمة المرور",
      name: "confirm_password",
      type: InputTypes.PASSWORD,
      placeholder: "أعد إدخال كلمة المرور",
    },
  ];
  const loginFields = (): IFormField[] => [
    {
      label: "البريد الإلكتروني أو اسم المستخدم",
      name: "email",
      type: InputTypes.TEXT,
      placeholder: "أدخل بريدك الإلكتروني أو اسم المستخدم",
      autoFocus: true,
    },
    {
      label: "كلمة المرور",
      name: "password",
      type: InputTypes.PASSWORD,
      placeholder: "••••••••",
    },
  ];

  const userFields = (): IFormField[] => [
    {
      label: "الاسم",
      name: "name",
      type: InputTypes.TEXT,
      placeholder: "أدخل اسمك الكامل",
      autoFocus: true,
    },
    {
      label: "البريد الإلكتروني",
      name: "email",
      type: InputTypes.EMAIL,
      placeholder: "أدخل بريدك الإلكتروني",
    },
    {
      label: "كلمة المرور",
      name: "password",
      type: InputTypes.PASSWORD,
      placeholder: "••••••••",
    },
    {
      label: "نوع الحساب",
      name: "role",
      type: InputTypes.SELECT,
      placeholder: "اختر نوع حسابك",
      options: [
        { value: UserType.USER, label: UserType.USER },
        { value: UserType.ADMIN, label: UserType.ADMIN },
        { value: UserType.INSTRUCTOR, label: UserType.INSTRUCTOR },
      ],
    },
  ];

  const pathFields = (): IFormField[] => [
    {
      name: "name",
      label: "اسم التراك التعليمي",
      type: InputTypes.TEXT,
      placeholder: "ادخل اسم المسار التعليمي",
    },
    {
      name: "heading",
      label: "عنوان المسار",
      type: InputTypes.TEXT,
      placeholder: "ادخل عنوان المسار",
    },
    {
      name: "slug",
      label: "Slug",
      type: InputTypes.TEXT,
      placeholder: "أدخل مُعرّف المادة (يجب أن يكون فريدًا)",
    },

    {
      name: "description",
      label: "وصف المسار التعليمي",
      type: InputTypes.TEXTAREA,
      placeholder: "ادخل وصف المسار التعليمي",
    },
    {
      name: "image",
      label: "اختار صورة المسار التعليمي",
      type: InputTypes.IMAGE,
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
      type: InputTypes.SELECT,
      placeholder: "اختر المسار",
    },
    {
      name: "trackId",
      label: "اختار التراك",
      type: InputTypes.SELECT,
      placeholder: "اختر التراك",
      options: [],
    },
    {
      name: "slug",
      label: "اسم الدورة (Slug)",
      type: InputTypes.TEXT,
      placeholder: "ادخل اسم الدورة يجب أن يكون فريد!",
    },
  ];

  const goalsFields = (): IFormField[] => [
    {
      name: "knowledgeNeeded",
      label: "ما ينبغي عليك معرفته",
      type: InputTypes.TEXTAREA,
      placeholder: "مثال: يفضل معرفة أساسيات البرمجة أو HTML",
    },
  ];

  const basicsFields = (): IFormField[] => [
    {
      name: "title",
      label: "اسم الدورة",
      type: InputTypes.TEXT,
      placeholder: "ادخل اسم الدورة",
    },
    {
      name: "description",
      label: "وصف الدورة",
      type: InputTypes.TEXTAREA,
      placeholder: "ادخل وصف الدورة",
    },
    {
      name: "shortDescription",
      label: "وصف قصير",
      type: InputTypes.TEXTAREA,
      placeholder: "ادخل وصف قصير",
    },
    {
      name: "slug",
      label: "اسم الدورة (Slug)",
      type: InputTypes.TEXT,
      placeholder: "ادخل اسم الدورة (يجب أن يكون فريد)",
    },
    {
      name: "level",
      label: "مستوى الدورة",
      type: InputTypes.SELECT,
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
      type: InputTypes.NUMBER,
      placeholder: "ادخل مدة الدورة (بالساعات)",
    },
    {
      name: "thumbnail",
      label: "صورة الدورة",
      type: InputTypes.IMAGE,
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
      type: InputTypes.NUMBER,
      placeholder: "ادخل سعر العرض بالسينت",
    },
    {
      name: "price",
      label: "السعر الاساسي بالسينت",
      type: InputTypes.NUMBER,
      placeholder: "ادخل سعر الدورة بالسينت",
    },
  ];

  const lessonFields = (): IFormField[] => [
    {
      name: "title",
      label: "اسم المحاضرة",
      type: InputTypes.TEXT,
      placeholder: "ادخل اسم المحاضرة",
    },
    {
      name: "description",
      label: " وصف المحاضرة",
      type: InputTypes.TEXTAREA,
      placeholder: "ادخل وصف المحاضرة",
    },
  ];

  const createTrackFields = (): IFormField[] => [
    {
      name: "pathId",
      label: "المسار التعليمي ",
      type: InputTypes.SELECT,
      placeholder: "اختر المسار التعليمي",
      options: [],
    },
    {
      name: "title",
      label: "عنوان التراك الفرعي",
      type: InputTypes.TEXT,
      placeholder: "ادخل عنوان التراك الفرعي",
    },
    {
      name: "slug",
      label: "المُعرّف (Slug)",
      type: InputTypes.TEXT,
      placeholder: "أدخل مُعرّف التراك (يجب أن يكون فريدًا)",
    },
    {
      name: "summary",
      label: "ملخص التراك",
      type: InputTypes.TEXTAREA,
      placeholder: "ادخل ملخص التراك الفرعي",
    },
    {
      name: "description",
      label: "وصف التراك الفرعي (بالتفاصيل)",
      type: InputTypes.TEXTAREA,
      placeholder: "ادخل وصف التراك الفرعي",
    },
    {
      name: "category",
      label: "تصنيف التراك",
      type: InputTypes.SELECT,
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
      type: InputTypes.TEXT,
      placeholder: "react",
    },
    {
      name: "thumbnail",
      label: "صورة التراك",
      type: InputTypes.FILE,
      placeholder: "اختر صورة للمسار",
      description: "يمكن رفع صورة بحجم أقصى 5 ميجابايت (JPEG, PNG, JPG, WebP)",
    },
    {
      name: "metaTitle",
      label: "عنوان SEO",
      type: InputTypes.TEXT,
      placeholder: "تعلم تطوير الواجهات الأمامية - مسار شامل",
    },
    {
      name: "metaDescription",
      label: "وصف SEO",
      type: InputTypes.TEXTAREA,
      placeholder: "مسار شامل لتعلم تطوير الواجهات الأمامية الحديثة",
    },
  ];

  const couponFields = (): IFormField[] => [
    {
      name: "code",
      label: "كود الكوبون",
      type: InputTypes.TEXT,
      placeholder: "مثال: SUMMER2024",
      autoFocus: true,
    },
    {
      name: "value",
      label: "قيمة التخفيض",
      type: InputTypes.NUMBER,
      placeholder: "100",
    },
    {
      name: "type",
      label: "نوع التخفيض",
      type: InputTypes.SELECT,
      options: [
        { value: CreateCouponDtoType.FIXED, label: "مبلغ ثابت" },
        { value: CreateCouponDtoType.PERCENTAGE, label: "نسبة مئوية" },
      ],
    },
    {
      name: "description",
      label: "الوصف",
      type: InputTypes.TEXTAREA,
      placeholder: "وصف اختياري للكوبون",
    },
    {
      name: "startsAt",
      label: "تاريخ البدء",
      type: InputTypes.DATE,
    },
    {
      name: "expiresAt",
      label: "تاريخ انتهاء الصلاحية",
      type: InputTypes.DATE,
    },
    {
      name: "maxUses",
      label: "الحد الأقصى للاستخدام (كلي)",
      type: InputTypes.NUMBER,
      placeholder: "100",
    },
    {
      name: "maxUsesPerUser",
      label: "الحد الأقصى لكل مستخدم",
      type: InputTypes.NUMBER,
      placeholder: "1",
    },
    {
      name: "minOrderAmount",
      label: "أقل قيمة للطلب",
      type: InputTypes.NUMBER,
      placeholder: "0",
    },
    {
      name: "courseIds",
      label: "الدورات *",
      type: InputTypes.MULTI_SELECT,
      placeholder: "اختر دورة واحدة على الأقل",
    },
    {
      name: "allCourses",
      label: "كل الدورات",
      type: InputTypes.CHECKBOX,
    },
    {
      name: "isActive",
      label: "تفعيل الكوبون",
      type: InputTypes.CHECKBOX,
    },
  ];

  const createReviewFields = (): IFormField[] => [
    {
      name: "studentId",
      label: "اسم الطالب",
      type: InputTypes.SELECT,
      placeholder: "اختر الطالب للمراجعة",
    },
    {
      name: "courseId",
      label: "اسم الدورة",
      type: InputTypes.SELECT,
      placeholder: "اختر الدورة للمراجعة",
    },
    {
      name: "rating",
      label: "التقييم",
      type: InputTypes.RATING,
      required: true,
      placeholder: "5",
    },
    {
      name: "status",
      label: "الحالة",
      type: InputTypes.SELECT,
      placeholder: "اختر الحالة",
      options: [
        { label: "قيد الانتظار", value: "pending" },
        { label: "موافق", value: "approved" },
        { label: "مرفوض", value: "rejected" },
      ],
    },
    {
      name: "comment",
      label: "التعليق",
      type: InputTypes.TEXTAREA,
      placeholder: "اكتب تعليق المراجعة...",
    },
  ];

  const createPaymentFields = (): IFormField[] => [
    {
      name: "orderId",
      label: "اختر الطلب",
      type: InputTypes.SELECT,
      placeholder: "اختر طلباً",
      options: [],
    },
    {
      name: "provider",
      label: "مزود الدفع",
      type: InputTypes.SELECT,
      placeholder: "اختر مزود الدفع",
      options: [
        { value: "PAYMOB", label: "Paymob" },
        { value: "STRIPE", label: "Stripe" },
        { value: "PAYPAL", label: "PayPal" },
      ],
    },
    {
      name: "status",
      label: "الحالة",
      type: InputTypes.SELECT,
      placeholder: "اختر الحالة",
      options: [
        { value: "PENDING", label: "قيد الانتظار" },
        { value: "PROCESSING", label: "قيد المعالجة" },
        { value: "SUCCEEDED", label: "مكتمل" },
      ],
    },
  ];

  const createOrderFields = (): IFormField[] => [
    {
      name: "userId",
      label: "اختر المستخدم *",
      type: InputTypes.SELECT,
      placeholder: "ابحث عن البريد الإلكتروني أو الاسم...",
      options: [],
    },
    {
      name: "currency",
      label: "العملة *",
      type: InputTypes.SELECT,
      placeholder: "اختر العملة...",
      options: [],
    },
    {
      name: "courseId",
      label: "الدورة *",
      type: InputTypes.SELECT,
      placeholder: "ابحث عن الدورة...",
      options: [],
    },
    {
      name: "coursePriceCents",
      label: "سعر الدورة (بالسنت) *",
      type: InputTypes.NUMBER,
      placeholder: "49990",
    },
    {
      name: "couponId",
      label: "اختر الكوبون (اختياري)",
      type: InputTypes.SELECT,
      placeholder: "ابحث عن الكوبون...",
      options: [],
    },
    {
      name: "discountCents",
      label: "مبلغ التخفيض (بالسنت)",
      type: InputTypes.NUMBER,
      placeholder: "10000",
    },
    {
      name: "taxCents",
      label: "الضريبة (بالسنت)",
      type: InputTypes.NUMBER,
      placeholder: "0",
    },
  ];

  const getFormFields = (
    dynamicOptions?: Record<string, IOption[]>,
  ): IFormField[] => {
    const fields = (() => {
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
        case Pages.COUPONS:
        case Pages.CREATE_COUPONS:
          return couponFields();
        case Pages.CREATE_REVIEWS:
          return createReviewFields();
        case Pages.CREATE_PAYMENTS:
          return createPaymentFields();
        case Pages.CREATE_ORDERS:
          return createOrderFields();
        default:
          return [];
      }
    })();

    if (dynamicOptions) {
      return fields.map((field: IFormField) => ({
        ...field,
        options: dynamicOptions[field.name] || field.options,
      }));
    }

    return fields;
  };

  return {
    getFormFields,
  };
};

export default useFormFields;
