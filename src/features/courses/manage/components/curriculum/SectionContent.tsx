import { Card } from "@/components/ui/card";
import { Edit3 } from "lucide-react";
import { useState } from "react";
import MangeSection from "@/features/courses/manage/components/curriculum/MangeSection";
import Delete from "./Delete";
import MangeLesson from "./MangeLesson";

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

              {/*الزرار لتعديل */}
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
        {/* زرار اضافة درس */}
        <MangeLesson
          open={open}
          setOpen={setOpen} //اضافة درس
          title="اضافة درس جديد"
          description="يمكنك اضافة درس جديد لهذا القسم"
        />
      </Card>
    </>
  );
}
