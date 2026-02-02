import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useDeleteSection } from "../hooks/useCurriculumMutation";

interface DeleteProps {
  sectionId: string;
  Title?: string;
  Description?: string;
}

function Delete({
  sectionId,
  Title,
  Description,
}: DeleteProps) {
  const [open, setOpen] = useState(false);
  const { mutate: deleteSection, isPending } = useDeleteSection();

  const onCancel = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    deleteSection(sectionId, {
      onSuccess: () => setOpen(false),
    });
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
        <DialogTrigger asChild>
          <button className="text-gray-500 hover:text-red-600 transition-colors">
            <Trash2 className="h-4 w-4" />
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="!text-right">
            <DialogTitle className="text-card-foreground text-lg font-semibold">
              {Title || "حذف القسم"}
            </DialogTitle>
            <DialogDescription>
              {Description || "سيتم حذف جميع الدروس المرتبطة بهذا القسم."}
            </DialogDescription>
          </DialogHeader>

          <div className="flex justify-end mt-4 gap-2 items-center">
            <Button
              type="button"
              variant="destructive"
              onClick={handleDelete}
              disabled={isPending}
            >
              {isPending ? 'جاري الحذف...' : 'حذف'}
            </Button>
            <Button type="button" variant="secondary" onClick={onCancel} disabled={isPending}>
              إلغاء
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Delete;
