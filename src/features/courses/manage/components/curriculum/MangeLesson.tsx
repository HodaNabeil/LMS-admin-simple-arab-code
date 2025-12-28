import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import ManageFormLesson from "./ManageFormLesson";
import { Plus } from "lucide-react";
function MangeLesson({
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
          <Button
            variant={"secondary"}
            className=" bg-gray-100 p-2 my-1  hover:bg-gray-200"
          >
            اضافة درس
            <Plus className="h-4 w-4 ml-2" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="!text-right">
            <DialogTitle className="text-card-foreground text-lg font-semibold">
              {title}
            </DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <ManageFormLesson mode="add" setOpen={setOpen} open={open} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default MangeLesson;
