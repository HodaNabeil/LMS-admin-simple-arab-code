import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DialogTitle } from "@radix-ui/react-dialog";
import ManageFormSection from "./ManageFormSection";
import { useState } from "react";

function AddSection() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
        <DialogTrigger asChild>
          <Button variant="default" className="text-right">
            اضافة قسم
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="!text-right">
            <DialogTitle className="text-card-foreground text-lg font-semibold">
              إضافة قسم جديد
            </DialogTitle>
            <DialogDescription>
              أدخل تفاصيل القسم الجديد أدناه. تأكد من ملء جميع الحقول المطلوبة
            </DialogDescription>
          </DialogHeader>

          <ManageFormSection mode="add" setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddSection;
