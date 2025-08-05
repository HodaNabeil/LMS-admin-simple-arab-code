import FormFields from "@/components/shared/form-fields/form-fields";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { pathEditSchema, pathSchema, type IPathForm } from "@/validations/path";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Save, Trash2, Eye, Download } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Pages, Routes } from "@/constants/enums";
import { useCreatePath, useUpdatePath } from "../hooks/usePathsMutations";
import type { Path } from "@/types/path";
import RemoteImage from "@/components/shared/RemoteImage";

interface PathFormProps {
  onSubmit?: (data: Partial<IPathForm>) => void;
  isLoading?: boolean;
  pathData?: Path; // بيانات المسار للتعديل
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
      delete dataToSave.roadmap;

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

// Component to display existing PDF files
const ExistingPDFDisplay = ({
  fileUrl,
  fileName,
}: {
  fileUrl: string;
  fileName: string;
}) => {
  return (
    <div className="mb-4 p-4 border rounded-lg bg-muted/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center">
            <span className="text-xs font-bold text-red-600">PDF</span>
          </div>
          <div>
            <span className="text-sm font-medium text-muted-foreground">
              ملف PDF الحالي:
            </span>
            <p className="text-sm text-foreground">{fileName}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => window.open(fileUrl, "_blank")}
          >
            <Eye className="w-4 h-4 mr-1" />
            عرض
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              const link = document.createElement("a");
              link.href = fileUrl;
              link.download = fileName;
              link.click();
            }}
          >
            <Download className="w-4 h-4 mr-1" />
            تحميل
          </Button>
        </div>
      </div>
    </div>
  );
};

const PathForm = ({ onSubmit, isLoading = false, pathData }: PathFormProps) => {
  const isEditMode = Boolean(pathData);
  const [isChangingImage, setIsChangingImage] = useState(false);
  const [isChangingRoadmap, setIsChangingRoadmap] = useState(false);

  console.log(isEditMode);
  const createMutation = useCreatePath();
  const updateMutation = useUpdatePath();
  const mutation = isEditMode ? updateMutation : createMutation;
  const navigate = useNavigate();

  // Get saved step from localStorage or default to 1
  const [currentStep, setCurrentStep] = useState(() => {
    const savedStep = getFromLocalStorage(FORM_STEP_KEY);
    return savedStep || 1;
  });

  const totalSteps = 2;

  function onCancel() {
    navigate(`/${Routes.ADMIN}/${Pages.PATHS}`);
  }

  // Get saved form data from localStorage or use pathData for edit mode
  const getSavedFormData = useCallback(() => {
    if (isEditMode && pathData) {
      return {
        heading: pathData.heading || "",
        description: pathData.description || "",
        name: pathData.name || "",
        slug: pathData.slug || "",
        image: pathData.image || null,
        roadmap: pathData.roadmapUrl || null,
      };
    }

    const savedData = getFromLocalStorage(FORM_DATA_KEY);
    return (
      savedData || {
        heading: "",
        description: "",
        name: "",
        slug: "",
        image: null,
        roadmap: null,
      }
    );
  }, [isEditMode, pathData]);

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    trigger,
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(isEditMode ? pathEditSchema : pathSchema),
    mode: "onChange",
    defaultValues: getSavedFormData(),
  });

  const formLoading = isSubmitting || isLoading || mutation.isPending;

  // Watch all form values for auto-save
  const watchedValues = watch();

  // Auto-save form data to localStorage whenever values change (only in add mode)
  useEffect(() => {
    if (!isEditMode) {
      const timeoutId = setTimeout(() => {
        saveToLocalStorage(FORM_DATA_KEY, watchedValues);
      }, 500); // Debounce saves by 500ms

      return () => clearTimeout(timeoutId);
    }
  }, [watchedValues, isEditMode]);

  // Save current step to localStorage whenever it changes
  useEffect(() => {
    saveToLocalStorage(FORM_STEP_KEY, currentStep);
  }, [currentStep]);

  const clearDraftData = useCallback(() => {
    removeFromLocalStorage(FORM_DATA_KEY);
    removeFromLocalStorage(FORM_STEP_KEY);
  }, []);

  const handleFormSubmit = async (data: Partial<IPathForm>) => {
    try {
      const formData = new FormData();

      // Only append fields that are provided (for edit mode)
      if (data.name) {
        formData.append("name", data.name);
      }
      if (data.slug) {
        formData.append("slug", data.slug);
      }
      if (data.description) {
        formData.append("description", data.description);
      }
      if (data.heading) {
        formData.append("heading", data.heading);
      }

      if (data.image && typeof data.image !== "string") {
        formData.append("image", data.image);
      }
      if (data.roadmap && typeof data.roadmap !== "string") {
        formData.append("roadmap", data.roadmap);
      }

      // Add ID for edit mode
      if (isEditMode && pathData?.id) {
        formData.append("id", pathData.id);
      }

      await mutation.mutateAsync(formData);

      if (!isEditMode) {
        clearDraftData();
      }

      onSubmit?.(data);
      navigate(`/${Routes.ADMIN}/${Pages.PATHS}`);
    } catch (error) {
      console.log(error || "Error submitting form");
    }
  };

  const handleCancel = () => {
    if (isEditMode) {
      onCancel?.();
    } else {
      // Show confirmation before clearing draft
      if (
        confirm("هل تريد إلغاء إنشاء المسار التعليمي وحذف المسودة المحفوظة؟")
      ) {
        clearDraftData();
        reset();
        onCancel?.();
      }
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
        return ["name", "slug", "description", "heading"];
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
      label: "اسم المسار التعليمي",
      type: "text" as const,
      placeholder: "ادخل اسم المسار التعليمي",
    },
    {
      name: "heading",
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
      label: "وصف المسار التعليمي (بالتفاصيل)",
      type: "textarea" as const,
      placeholder: "ادخل وصف المسار التعليمي",
    },
  ];

  const step2Fields = [
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
    if (isEditMode) {
      return "تعديل المسار التعليمي";
    }

    switch (currentStep) {
      case 1:
        return "انشاء مسار تعليمي جديد";
      case 2:
        return "إضافة تفاصيل المسار التعليمي";
      default:
        return "";
    }
  };

  const getStepDescription = () => {
    if (isEditMode) {
      return "قم بتعديل بيانات المسار التعليمي.";
    }

    switch (currentStep) {
      case 1:
        return "املأ التفاصيل الأساسية للمسار التعليمي.";
      case 2:
        return "أضف صورة ورابط للمسار التعليمي.";
      default:
        return "";
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

        {/* Draft indicator - only show in add mode */}
        {!isEditMode && (
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>يتم حفظ البيانات تلقائياً</span>
          </div>
        )}
      </div>

      {/* Form */}
      <Card className="p-8">
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {getCurrentFields().map((field) => (
            <div key={field.name} className="mb-6">
              {/* Handle Image Field with Toggle Logic */}
              {isEditMode &&
              currentStep === 2 &&
              field.name === "image" &&
              pathData?.image ? (
                !isChangingImage ? (
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-foreground block">
                      {field.label}
                    </label>
                    <div className="relative">
                      <RemoteImage
                        prefix="static"
                        src={pathData.image}
                        alt="صورة المسار"
                        className="w-full h-40 object-cover rounded-lg border"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setIsChangingImage(true)}
                      disabled={formLoading}
                      className="w-full"
                    >
                      تغيير الصورة
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <FormFields {...field} control={control} errors={errors} />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsChangingImage(false)}
                      disabled={formLoading}
                      className="w-full"
                    >
                      إلغاء التغيير
                    </Button>
                  </div>
                )
              ) : isEditMode &&
                currentStep === 2 &&
                field.name === "roadmap" &&
                pathData?.roadmapUrl ? (
                !isChangingRoadmap ? (
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-foreground block">
                      {field.label}
                    </label>
                    <ExistingPDFDisplay
                      fileUrl={pathData.roadmapUrl}
                      fileName="خريطة المسار.pdf"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setIsChangingRoadmap(true)}
                      disabled={formLoading}
                      className="w-full"
                    >
                      تغيير ملف PDF
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <FormFields {...field} control={control} errors={errors} />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsChangingRoadmap(false)}
                      disabled={formLoading}
                      className="w-full"
                    >
                      إلغاء التغيير
                    </Button>
                  </div>
                )
              ) : (
                <FormFields {...field} control={control} errors={errors} />
              )}
            </div>
          ))}

          {/* Form Actions */}
          <div className="flex items-center justify-between pt-6 border-t">
            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={formLoading}
              >
                إلغاء
              </Button>

              {/* Clear draft button - only show in add mode */}
              {!isEditMode && (
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
              )}

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
                  {isEditMode ? "تعديل" : "انشاء"}
                </Button>
              )}
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default PathForm;
