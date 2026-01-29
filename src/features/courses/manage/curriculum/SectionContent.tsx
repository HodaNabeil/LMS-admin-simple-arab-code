import { Card } from "@/components/ui/card";
import { useState } from "react";
import EditSection from "@/features/courses/manage/curriculum/EditSection";
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
            <EditSection />
            <Delete />
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
