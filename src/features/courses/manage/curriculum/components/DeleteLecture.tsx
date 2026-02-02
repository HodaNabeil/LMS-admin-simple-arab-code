import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { Trash2 } from "lucide-react";
import { useDeleteEntity } from "@/hooks/useDeleteEntity";
import { useDeleteLecture } from "../hooks/useCurriculumMutation";

export interface DeleteLectureProps {
    lectureId: string;
    lectureTitle: string;
}

/**
 * Delete lecture component with confirmation dialog
 * Following the "path" pattern for consistent deletion behavior
 */
export default function DeleteLecture({ lectureId, lectureTitle }: DeleteLectureProps) {
    const deleteLectureMutation = useDeleteLecture();

    const { isOpen, setIsOpen, handleDelete, isPending } = useDeleteEntity<void, string>({
        mutation: deleteLectureMutation,
        successMessage: "تم حذف الدرس بنجاح",
    });

    return (
        <ConfirmDialog
            trigger={
                <button className="text-gray-400 hover:text-red-500 transition-colors">
                    <Trash2 className="h-3.5 w-3.5" />
                </button>
            }
            title="حذف الدرس"
            description={`هل أنت متأكد من حذف الدرس "${lectureTitle}"؟`}
            actionLabel="حذف الدرس"
            onConfirm={() => handleDelete(lectureId)}
            isLoading={isPending}
            open={isOpen}
            onOpenChange={setIsOpen}
            variant="destructive"
        />
    );
}
