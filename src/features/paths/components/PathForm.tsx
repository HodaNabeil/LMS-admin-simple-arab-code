import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { createPathSchema, editPathSchema, type CreatePathDto, type UpdatePathDto, PathCategory } from "@/validations/path";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Pages, Routes } from "@/constants/enums";
import { useCreatePath, useUpdatePath } from "../hooks/usePathsMutations";
import { usePathStorage } from "./services/usePathStorage";
import { FORM_DATA_KEY, FORM_STEP_KEY, step1Fields, step2Fields } from "./services/constants";
import { PathFormSteps } from "./path-form/components/form/PathFormSteps";
import { PathFormField } from "./path-form/components/form/PathFormField";
import { PathFormActions } from "./path-form/components/form/PathFormActions";
import type { Path } from "@/types/path";

interface PathFormProps {
  pathData?: Path;
}

const PathForm = ({ pathData }: PathFormProps) => {
  const isEditMode = Boolean(pathData);

  const createMutation = useCreatePath();
  const updateMutation = useUpdatePath({ slug: pathData?.slug || "" });
  const mutation = isEditMode ? updateMutation : createMutation;
  const navigate = useNavigate();

  const { saveToLocalStorage, getFromLocalStorage, clearDraftData } = usePathStorage();

  const [currentStep, setCurrentStep] = useState(() => {
    if (isEditMode) {
      return 1;
    }
    const savedStep = getFromLocalStorage(FORM_STEP_KEY);
    return savedStep || 1;
  });

  const [openDraftDialog, setOpenDraftDialog] = useState(false);

  const totalSteps = isEditMode ? 1 : 2;

  const getSavedFormData = useCallback(() => {
    if (isEditMode && pathData) {
      return {
        title: pathData.title || "",
        slug: pathData.slug || "",
        summary: pathData.summary || "",
        description: pathData.description || "",
        icon: pathData.icon || "",
        metaTitle: pathData.metaTitle || "",
        metaDescription: pathData.metaDescription || "",
        category: (pathData.category as unknown as PathCategory) || PathCategory.WEB,
        trackIds: (pathData as any).tracks?.map((t: any) => t.id) || [],

      };
    }

    const savedData = getFromLocalStorage(FORM_DATA_KEY);
    return (
      savedData || {
        title: "",
        slug: "",
        summary: "",
        description: "",
        icon: "",
        metaTitle: "",
        metaDescription: "",
        category: PathCategory.WEB,
        trackIds: [],

      }
    );
  }, [isEditMode, pathData, getFromLocalStorage]);

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    trigger,
    watch,
    reset,
  } = useForm<CreatePathDto | UpdatePathDto>({
    // @ts-expect-error - zodResolver has issues with conditional schema types
    resolver: zodResolver(isEditMode ? editPathSchema : createPathSchema),
    mode: "onChange",
    defaultValues: getSavedFormData(),
  });

  const formLoading = isSubmitting || mutation.isPending;
  const watchedValues = watch();

  // Auto-save form data
  useEffect(() => {
    if (!isEditMode) {
      const timeoutId = setTimeout(() => {
        saveToLocalStorage(FORM_DATA_KEY, watchedValues);
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [watchedValues, isEditMode, saveToLocalStorage]);

  // Save current step
  useEffect(() => {
    if (!isEditMode) {
      saveToLocalStorage(FORM_STEP_KEY, currentStep);
    }
  }, [currentStep, isEditMode, saveToLocalStorage]);

  const handleFormSubmit = async (data: CreatePathDto | UpdatePathDto) => {
    try {
      await mutation.mutateAsync(data);
      clearDraftData();
      toast.success(
        isEditMode ? "تم تحديث المسار بنجاح" : "تم إنشاء المسار بنجاح"
      );
      navigate(`/${Routes.ADMIN}/${Pages.PATHS}`);
    } catch (error) {
      console.error("❌ Form submission error:", error);
      console.error("Error details:", {
        error,
        isEditMode,
        data
      });
    }
  };

  const handleCancel = () => {
    if (isEditMode) {
      clearDraftData();
      navigate(`/${Routes.ADMIN}/${Pages.PATHS}`);
    } else {
      clearDraftData();
      reset();
      navigate(`/${Routes.ADMIN}/${Pages.PATHS}`);
    }
  };

  const handleClearDraft = () => {
    setOpenDraftDialog(true);
  };

  const confirmClearDraft = () => {
    clearDraftData();
    reset(getSavedFormData());
    setCurrentStep(1);
    setOpenDraftDialog(false);
    toast.success("تم حذف المسودة بنجاح");
  };

  const getFieldsForStep = (step: number): (keyof UpdatePathDto)[] => {
    if (isEditMode) {
      const fields: (keyof UpdatePathDto)[] = [
        "title",
        "slug",
        "summary",
        "description",
        "icon",
        "metaTitle",
        "metaDescription",
        "category",
        "trackIds",
      ];

      return fields;
    }

    switch (step) {
      case 1:
        return ["title", "slug", "summary", "description", "icon", "metaTitle", "metaDescription"];
      case 2:
        return ["category", "trackIds"];
      default:
        return [];
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

  const getCurrentFields = () => {
    if (isEditMode) {
      return [...step1Fields, ...step2Fields];
    }
    switch (currentStep) {
      case 1: return step1Fields;
      case 2: return step2Fields;
      default: return [];
    }
  };

  const getStepTitle = () => {
    if (isEditMode) return "تعديل المسار التعليمي";
    switch (currentStep) {
      case 1: return "انشاء مسار تعليمي جديد";
      case 2: return "إضافة تفاصيل المسار التعليمي";
      default: return "";
    }
  };

  const getStepDescription = () => {
    if (isEditMode) return "قم بتعديل بيانات المسار التعليمي.";
    switch (currentStep) {
      case 1: return "املأ التفاصيل الأساسية للمسار التعليمي.";
      case 2: return "أضف صورة ورابط للمسار التعليمي.";
      default: return "";
    }
  };

  const onInvalid = (errors: any) => {
    console.error("Validation Errors:", errors);

    const missingFields = Object.keys(errors).join(", ");
    toast.error(`يرجى التحقق من الحقول المطلوبة: ${missingFields}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <PathFormSteps currentStep={currentStep} totalSteps={totalSteps} />

      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">{getStepTitle()}</h2>
        <p className="text-muted-foreground">{getStepDescription()}</p>

        {!isEditMode && (
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>يتم حفظ البيانات تلقائياً</span>
          </div>
        )}
      </div>

      <Card className="p-8">
        <form onSubmit={handleSubmit(handleFormSubmit, onInvalid)} className="space-y-6">
          {getCurrentFields().map((field) => (
            <div key={field.name} className="mb-6">
              <PathFormField
                field={field}
                control={control}
                errors={errors}

              />
            </div>
          ))}

          <PathFormActions
            isEditMode={isEditMode}
            currentStep={currentStep}
            totalSteps={totalSteps}
            formLoading={formLoading}
            onCancel={handleCancel}
            onClearDraft={!isEditMode ? handleClearDraft : undefined}
            onPrevStep={prevStep}
            onNextStep={nextStep}
          />
        </form>
      </Card>

      <Dialog open={openDraftDialog} onOpenChange={setOpenDraftDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>حذف المسودة؟</DialogTitle>
            <DialogDescription>
              هل أنت متأكد من أنك تريد حذف المسودة المحفوظة؟ سيتم فقد جميع التغييرات التي قمت بها.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDraftDialog(false)}>
              إلغاء
            </Button>
            <Button variant="destructive" onClick={confirmClearDraft}>
              نعم، احذف
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div >
  );
};

export default PathForm;
