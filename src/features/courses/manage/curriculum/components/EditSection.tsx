import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useState } from "react";
import SectionForm from "./SectionForm";
import { Edit } from "lucide-react";
import type { Section } from "@/types/curriculum";

interface EditSectionProps {
  section: Section;
}

function EditSection({ section }: EditSectionProps) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
        <DialogTrigger asChild>
          <button className="text-gray-500 hover:text-blue-600 transition-colors">
            <Edit className="h-4 w-4" />
          </button>
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
            section={section}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditSection;
