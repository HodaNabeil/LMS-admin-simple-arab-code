import { Button } from "@/components/ui/button";
import { ArrowRight, Save, Trash2 } from "lucide-react";

interface PathFormActionsProps {
    isEditMode: boolean;
    currentStep: number;
    totalSteps: number;
    formLoading: boolean;
    onCancel: () => void;
    onClearDraft?: () => void;
    onPrevStep: () => void;
    onNextStep: () => void;
}

export const PathFormActions = ({
    isEditMode,
    currentStep,
    totalSteps,
    formLoading,
    onCancel,
    onClearDraft,
    onPrevStep,
    onNextStep,
}: PathFormActionsProps) => {
    return (
        <div className="flex items-center justify-between pt-6 border-t">
            <div className="flex gap-4">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    disabled={formLoading}
                >
                    إلغاء
                </Button>

                {/* Clear draft button - only show in add mode */}
                {!isEditMode && onClearDraft && (
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={onClearDraft}
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
                        onClick={onPrevStep}
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
                        onClick={(e) => {
                            e.preventDefault();
                            onNextStep();
                        }}
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
                        {isEditMode ? "تعديل" : "انشاء"}
                        {formLoading ? (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <Save className="w-4 h-4" />
                        )}
                    </Button>
                )}
            </div>
        </div>
    );
};
