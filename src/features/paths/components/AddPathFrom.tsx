import FormFields from "@/components/shared/form-fields/form-fields";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PathSchema, type IPathForm } from "@/validations/path";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Save, Trash2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
interface AddPathFormProps {
  onSubmit?: (data: IPathForm) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}
// Local storage key for persisting form data
const FORM_DATA_KEY = "addCourseForm_draft";
const FORM_STEP_KEY = "addCourseForm_step";

// Helper functions for local storage
const saveToLocalStorage = (key: string, data: Partial<IPathForm> | number) => {
  try {
    // Don't save File objects to localStorage as they can't be serialized
    if (key === FORM_DATA_KEY && typeof data === "object") {
      const dataToSave = { ...data };
      // Remove file objects before saving
      delete dataToSave.image;

      localStorage.setItem(key, JSON.stringify(dataToSave));
    } else {
      localStorage.setItem(key, JSON.stringify(data));
    }
  } catch (error) {
    console.warn("Failed to save to localStorage:", error);
  }
};

const getFromLocalStorage = (key: string) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.warn("Failed to read from localStorage:", error);
    return null;
  }
};

const removeFromLocalStorage = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.warn("Failed to remove from localStorage:", error);
  }
};

const AddPathFrom = ({
  onSubmit,
  onCancel,
  isLoading = false,
}: AddPathFormProps) => {
  // Get saved step from localStorage or default to 1
  const [currentStep, setCurrentStep] = useState(() => {
    const savedStep = getFromLocalStorage(FORM_STEP_KEY);
    return savedStep || 1;
  });
  const totalSteps = 2;

  // Get saved form data from localStorage
  const getSavedFormData = useCallback(() => {
    const savedData = getFromLocalStorage(FORM_DATA_KEY);
    return (
      savedData || {
        title: "",
        description: "",
        name: "",
        slug: "",
        image: null, // Initialize as null for file input
        Roadmap: null, // Initialize as null for file input
      }
    );
  }, []);

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    trigger,
    watch,
    reset,
  } = useForm<IPathForm>({
    resolver: zodResolver(PathSchema),
    mode: "onChange",
    defaultValues: getSavedFormData(),
  });

  const formLoading = isSubmitting || isLoading;

  // Watch all form values for auto-save
  const watchedValues = watch();

  // Auto-save form data to localStorage whenever values change
  useEffect(() => {
    ///////////////////////////////////////////////////////////>>>>>
    const timeoutId = setTimeout(() => {
      saveToLocalStorage(FORM_DATA_KEY, watchedValues);
    }, 500); // Debounce saves by 500ms

    return () => clearTimeout(timeoutId);
  }, [watchedValues]);

  // Save current step to localStorage whenever it changes
  useEffect(() => {
    saveToLocalStorage(FORM_STEP_KEY, currentStep);
  }, [currentStep]);

  // Check for saved draft on component mount
  useEffect(() => {
    const savedData = getFromLocalStorage(FORM_DATA_KEY);
    if (
      savedData &&
      Object.keys(savedData).some(
        (key) => savedData[key] !== "" && savedData[key] !== 0
      )
    ) {
      toast.info("تم استعادة المسودة المحفوظة مسبقاً", {
        duration: 5000,
        action: {
          label: "بدء من جديد",
          onClick: handleClearDraft,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clearDraftData = useCallback(() => {
    removeFromLocalStorage(FORM_DATA_KEY);
    removeFromLocalStorage(FORM_STEP_KEY);
  }, []);

  const handleFormSubmit = async (data: IPathForm) => {
    try {
      console.log("Course Form Data:", data);
      toast.success("تم إنشا المسار بنجاح!");

      // Clear draft data after successful submission
      clearDraftData();

      onSubmit?.(data);
    } catch (error) {
      console.error("Error creating course:", error);
      toast.error("حدث خطأ أثناء إنشاء المسار التعليمي");
    }
  };

  const handleCancel = () => {
    // Show confirmation before clearing draft
    if (confirm("هل تريد إلغاء إنشاء المسار التعليمي وحذف المسودة المحفوظة؟")) {
      clearDraftData();
      reset();
      onCancel?.();
    }
  };

  const handleClearDraft = () => {
    if (confirm("هل تريد حذف المسودة المحفوظة وبدء من جديد؟")) {
      clearDraftData();
      reset(getSavedFormData());
      setCurrentStep(1);
      toast.success("تم حذف المسودة بنجاح");
    }
  };

  const nextStep = async () => {
    const fieldsToValidate = getFieldsForStep(currentStep);
    const isValid = await trigger(fieldsToValidate);

    if (isValid && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getFieldsForStep = (step: number): (keyof IPathForm)[] => {
    switch (step) {
      case 1:
        return ["name", "slug", "description", "title"];
      case 2:
        return ["image", "roadmap"];
      default:
        return [];
    }
  };

  // Form field configurations
  const step1Fields = [
    {
      name: "name",
      label: "  اسم المسار التعليمي (المحتصر)",
      type: "text" as const,
      placeholder: "ادخل اسم المسار التعليمي",
    },
    {
      name: "title",
      label: "عنوان المسار ",
      type: "text" as const,
      placeholder: "ادخل عنوان المسار",
    },
    {
      name: "slug",
      label: "المُعرّف (Slug)",
      type: "text" as const,
      placeholder: "أدخل مُعرّف المادة (يجب أن يكون فريدًا)",
    },

    {
      name: "description",
      label: "  وصف المسار التعليمي (بالتفاصيل)",
      type: "textarea" as const,
      placeholder: "ادخل وصف المسار التعليمي",
    },
  ];

  const step2Fields = [
    {
      name: "image",
      label: "اختار صورة المسار التعليمي",
      type: "image" as const,
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
      maxSize: 5, // بالميجابايت
      allowedTypes: ["application/pdf"],
    },
  ];

  const getCurrentFields = () => {
    switch (currentStep) {
      case 1:
        return step1Fields;
      case 2:
        return step2Fields;
      default:
        return [];
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "انشاء مسار تعليمي جديد";
      case 2:
        return " إضافة تفاصيل المسار التعليمي";

      default:
        return "";
    }
  };

  const getStepDescription = () => {
    switch (currentStep) {
      case 1:
        return "املأ التفاصيل الأساسية للمسار التعليمي.";
      case 2:
        return " أضف صورة ورابط للمسار التعليمي.";
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-8">
        {Array.from({ length: totalSteps }, (_, index) => (
          <div key={index + 1} className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= index + 1
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {index + 1}
            </div>
            {index < totalSteps - 1 && (
              <div
                className={`w-16 h-1 mx-2 ${
                  currentStep > index + 1 ? "bg-primary" : "bg-muted"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step Title */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">{getStepTitle()}</h2>
        <p className="text-muted-foreground">{getStepDescription()}</p>

        {/* Draft indicator */}
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>يتم حفظ البيانات تلقائياً</span>
        </div>
      </div>

      {/* Form */}
      <Card className="p-8">
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {getCurrentFields().map((field) => (
            <div key={field.name} className="mb-6">
              <FormFields {...field} control={control} errors={errors} />
            </div>
          ))}

          {/* Form Actions */}
          <div className="flex items-center justify-between pt-6 border-t">
            <div className="flex gap-4">
              {onCancel && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={formLoading}
                >
                  إلغاء
                </Button>
              )}

              {/* Clear draft button */}
              <Button
                type="button"
                variant="ghost"
                onClick={handleClearDraft}
                disabled={formLoading}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                حذف المسودة
              </Button>

              {currentStep > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={formLoading}
                >
                  السابق
                </Button>
              )}
            </div>

            <div className="flex space-x-4 rtl:space-x-reverse">
              {currentStep < totalSteps ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  disabled={formLoading}
                  className="flex items-center gap-2"
                >
                  التالي
                  <ArrowRight className="w-4 h-4 rotate-180" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={formLoading}
                  className="flex items-center gap-2"
                >
                  {formLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  حفظ المسار التعليمي
                </Button>
              )}
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AddPathFrom ;
