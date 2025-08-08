import SectionContent from "../../../../features/courses/manage/components/curriculum/SectionContent";
import MangeSection from "@/features/courses/manage/components/curriculum/MangeSection";
import { useState } from "react";

export default function Curriculum() {
  const [open, setOpen] = useState(false);
  return (
    <div className=" flex flex-col items-center  h-[calc(100vh-200px)] bg-gray-50 p-8 ">
      <h2 className="text-xl font-bold mb-8 text-[#3c45aa] self-start text-right">
        مقرر الدورة
      </h2>
      <main className=" p-6 bg-white rounded-lg shadow-md w-full max-w-3xl">
        <MangeSection
          title="اضافة قسم جديد"
          description="يمكنك اضافة قسم جديد من هنا"
          open={open}
          setOpen={setOpen}
          key={1}
        />
        <div className=" mt-6 space-y-4">
          <SectionContent />
        </div>
      </main>
    </div>
  );
}
