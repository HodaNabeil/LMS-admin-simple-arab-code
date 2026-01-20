import { Button } from "@/components/ui/button";
import { Save, Trash2 } from "lucide-react";

interface TrackFormActionsProps {
    isEditMode: boolean;
    formLoading: boolean;
    onCancel: () => void;
    onClearDraft?: () => void;
}

export const TrackFormActions = ({
    isEditMode,
    formLoading,
    onCancel,
    onClearDraft,
}: TrackFormActionsProps) => {
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
            </div>

            <div className="flex space-x-4 rtl:space-x-reverse">
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
            </div>
        </div>
    );
};
