import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit3, Plus } from "lucide-react";
import { useState } from "react";
import MangeSection from "@/features/courses/manage/components/curriculum/MangeSection";
import Delete from "./Delete";

export default function SectionContent() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card className=" flex flex-col gap-4    bg-white p-4 border border-gray-200 shadow-sm ">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 font-bold"> القسم 1 :</span>
            <span className="text-sm text-gray-600"> اسم القسم</span>
          </div>
          <div className="flex items-center gap-2">
            <div onClick={() => setOpen(true)} className="cursor-pointer">
              <span>
                <Edit3 className="h-4 w-4  " />
              </span>
              {open && (
                <MangeSection
                  open={open}
                  setOpen={setOpen}
                  title="   تعديل قسم"
                  key={1}
                  description="يمكنك تعديل اسم القسم ووصفه"
                />
              )}
            </div>
            <div className="cursor-pointer">
              <Delete />
            </div>
          </div>
        </div>
        <Button
          variant={"secondary"}
          className=" bg-gray-100 p-2 my-1  hover:bg-gray-200"
        >
          اضافة درس
          <Plus className="h-4 w-4 ml-2" />
        </Button>
      </Card>
    </>
  );
}
