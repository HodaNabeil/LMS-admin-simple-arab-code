import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import SectionForm from "./SectionForm";

function AddSection() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
        <DialogTrigger asChild>
          <Button variant="secondary">اضافة قسم جديد</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="!text-right">
            <DialogTitle className="text-card-foreground text-lg font-semibold">
              إضافة قسم جديد
            </DialogTitle>
            <DialogDescription className="text-card-foreground text-sm">
              يمكنك إضافة قسم جديد إلى المنهج الدراسي من هنا.
            </DialogDescription>
          </DialogHeader>
          <SectionForm setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddSection;
