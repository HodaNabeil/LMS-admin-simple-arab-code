import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDeleteEntity } from "@/hooks/useDeleteEntity";
import { useDeleteTrack } from "../hooks/useTracksMutations";

export interface DeleteTrackProps {
  trackSlug: string;
}


export default function DeleteTrack({ trackSlug }: DeleteTrackProps) {
  const deleteTrackMutation = useDeleteTrack();

  const { isOpen, setIsOpen, handleDelete, isPending } = useDeleteEntity({
    mutation: deleteTrackMutation,
    successMessage: "تم حذف المسار بنجاح",
  });

  return (
    <ConfirmDialog
      trigger={
        <Button variant="link" className="text-red-600 hover:text-red-800">
          <Trash2 className="h-4 w-4" />
        </Button>
      }
      title="حذف المسار"
      description="هل أنت متأكد من حذف المسار؟"
      actionLabel="حذف المسار"
      onConfirm={() => handleDelete(trackSlug)}
      isLoading={isPending}
      open={isOpen}
      onOpenChange={setIsOpen}
      variant="destructive"
    />
  );
}
