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
function Delete({
  Title,
  Description,
}: {
  Title?: string;
  Description?: string;
}) {
  const [open, setOpen] = useState(false);

  const onCancel = () => {
    setOpen(false);
  };
  return (
    <div>
      <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
        <DialogTrigger asChild>
          <Button variant="secondary" className="text-right">
            <Trash2 className="h-4 w-4" />
          </Button>
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
            <Button type="submit" variant="destructive">
              حذف
            </Button>
            <Button type="button" variant="secondary" onClick={onCancel}>
              إلغاء
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Delete;
