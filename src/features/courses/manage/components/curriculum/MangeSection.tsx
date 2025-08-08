import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import ManageFormSection from "./ManageFormSection";
import { Button } from "@/components/ui/button";
function MangeSection({
  title,
  open,
  setOpen,
  description,
}: {
  title?: string | null;
  open: boolean;
  setOpen: (open: boolean) => void;
  description?: string;
}) {
  return (
    <div>
      <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
        <DialogTrigger asChild>
          <Button variant="secondary" className="text-right">
            {title || "اضافة قسم جديد"}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="!text-right">
            <DialogTitle className="text-card-foreground text-lg font-semibold">
              {title}
            </DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <ManageFormSection mode="add" setOpen={setOpen} open={open} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default MangeSection;
