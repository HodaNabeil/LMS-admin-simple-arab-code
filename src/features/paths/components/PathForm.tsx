import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import type { Path } from "@/types/path";
import { Pages, Routes } from "@/constants/enums";
import { usePathForm } from "../hooks/usePathForm";
import { PathFormHeader } from "./path-form/PathFormHeader";
import { ClearDraftDialog } from "./path-form/ClearDraftDialog/ClearDraftDialog";
import { PathFormSteps } from "./path-form/components/form/PathFormSteps";
import { PathFormActions } from "./path-form/components/form/PathFormActions";
import { PathFormField } from "./path-form/components/form/PathFormField";

interface PathFormProps {
  pathData?: Path;
}

const PathForm = ({ pathData }: PathFormProps) => {
  const navigate = useNavigate();
  const { form, steps, submit, isEditMode, formLoading, clearFormData } = usePathForm({ pathData });
  const [openDraftDialog, setOpenDraftDialog] = useState(false);

  const handleCancel = useCallback(() => {
    clearFormData();
    if (!isEditMode) {
      form.reset();
    }
    navigate(`/${Routes.ADMIN}/${Pages.PATHS}`);
  }, [clearFormData, isEditMode, form, navigate]);

  const handleClearDraft = useCallback(() => {
    setOpenDraftDialog(true);
  }, []);

  const confirmClearDraft = useCallback(() => {
    clearFormData();
    form.reset();
    setOpenDraftDialog(false);
    toast.success("تم حذف المسودة بنجاح");
  }, [clearFormData, form]);

  const getStepTitle = useCallback(() => {
    if (isEditMode) return "تعديل المسار التعليمي";
    switch (steps.currentStep) {
      case 1:
        return "انشاء مسار تعليمي جديد";
      case 2:
        return "إضافة تفاصيل المسار التعليمي";
      default:
        return "";
    }
  }, [isEditMode, steps.currentStep]);

  const getStepDescription = useCallback(() => {
    if (isEditMode) return "قم بتعديل بيانات المسار التعليمي.";
    switch (steps.currentStep) {
      case 1:
        return "املأ التفاصيل الأساسية للمسار التعليمي.";
      case 2:
        return "أضف صورة ورابط للمسار التعليمي.";
      default:
        return "";
    }
  }, [isEditMode, steps.currentStep]);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <PathFormSteps currentStep={steps.currentStep} totalSteps={steps.totalSteps} />

      <PathFormHeader
        title={getStepTitle()}
        description={getStepDescription()}
        showAutoSave={!isEditMode}
      />

      <Card className="p-8">
        <form
          onSubmit={form.handleSubmit(submit.onSubmit, submit.onInvalid)}
          className="space-y-6"
        >
          {steps.getCurrentFields().map((field) => (
            <div key={field.name} className="mb-6">
              <PathFormField field={field} control={form.control} errors={form.errors} />
            </div>
          ))}

          <PathFormActions
            isEditMode={isEditMode}
            currentStep={steps.currentStep}
            totalSteps={steps.totalSteps}
            formLoading={formLoading}
            onCancel={handleCancel}
            onClearDraft={!isEditMode ? handleClearDraft : undefined}
            onPrevStep={steps.prevStep}
            onNextStep={steps.nextStep}
          />
        </form>
      </Card>

      <ClearDraftDialog
        open={openDraftDialog}
        onOpenChange={setOpenDraftDialog}
        onConfirm={confirmClearDraft}
      />
    </div>
  );
}

export default PathForm;
