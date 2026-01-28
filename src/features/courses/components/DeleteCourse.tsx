import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDeleteEntity } from "@/hooks/useDeleteEntity";
import { useDeleteCourse } from "../hooks/useCoursesMutations";

export interface DeleteCourseProps {
    courseSlug: string;
    courseTitle: string;
}

export default function DeleteCourse({ courseSlug, courseTitle }: DeleteCourseProps) {
    const deleteCourseMutation = useDeleteCourse();

    const { isOpen, setIsOpen, handleDelete, isPending } = useDeleteEntity({
        mutation: deleteCourseMutation,
        successMessage: "تم حذف الدورة بنجاح",
    });

    return (
        <ConfirmDialog
            trigger={
                <Button variant="link" className="text-red-600 hover:text-red-800 p-0 h-auto">
                    <Trash2 className="h-4 w-4" />
                </Button>
            }
            title="حذف الدورة"
            description={`هل أنت متأكد من حذف الدورة "${courseTitle}"؟`}
            actionLabel="حذف الدورة"
            onConfirm={() => handleDelete(courseSlug)}
            isLoading={isPending}
            open={isOpen}
            onOpenChange={setIsOpen}
            variant="destructive"
        />
    );
}
