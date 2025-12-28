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
import { Edit } from "lucide-react";

function EditSection() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
        <DialogTrigger asChild>
          <Button variant="secondary">
            <Edit />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="!text-right">
            <DialogTitle className="text-card-foreground text-lg font-semibold">
              تعديل قسم
            </DialogTitle>
            <DialogDescription className="text-card-foreground text-sm">
              يمكنك تعديل اسم القسم ووصفه من هنا.
            </DialogDescription>
          </DialogHeader>
          <SectionForm
            setOpen={setOpen}
            section={{
              title: "تعديل قسم",
              description: "يمكنك تعديل اسم القسم ووصفه",
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditSection;
