import { Card } from "@/components/ui/card";
import { useState } from "react";
import EditSection from "@/features/courses/manage/curriculum/components/EditSection";
import Delete from "./Delete";
import ManageFormLesson from "./ManageFormLesson";
import type { Section } from "@/types/curriculum";
import { FileText, Plus, X } from "lucide-react";
import { LectureType } from "@/types/api.generated";
import LectureItem from "./LectureItem";

interface SectionContentProps {
  section: Section;
}

export default function SectionContent({ section }: SectionContentProps) {
  const [showCreationArea, setShowCreationArea] = useState(false);
  const [selectedType, setSelectedType] = useState<"VIDEO" | "QUIZ" | null>(null);

  const handleToggleCreation = () => {
    setShowCreationArea(!showCreationArea);
    setSelectedType(null);
  };

  return (
    <>
      <Card className=" flex flex-col gap-4  bg-[#e5e5e5bd]   px-4 border border-[#535353]  rounded-none py-6" >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-700 font-bold">القسم : {section.position}</span>
            <FileText className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-800 font-medium cursor-pointer flex items-center gap-2">
              {section.title}
            </span>
            <div className="flex items-center gap-2">
              <EditSection section={section} />
              <Delete sectionId={section.id} />
            </div>
          </div>
        </div>

        {/* قائمة الدروس */}
        <div className="flex flex-col gap-2 mt-2">
          {section.lectures?.map((lecture, idx) => (
            <LectureItem
              key={lecture.id}
              lecture={lecture}
              index={idx}
            />
          ))}
        </div>

        {/* زرار اضافة عنصر ومنطقة الاضافة */}
        <div className="mt-4">
          {!showCreationArea ? (
            <button
              onClick={handleToggleCreation}
              className="flex items-center gap-2 px-4 py-2 border-2 border-[#3c45aa] text-[#3c45aa] rounded-lg hover:bg-[#3c45aa]/10 transition-colors font-medium text-sm"
            >
              عنصر المنهج <Plus className="h-4 w-4" />
            </button>
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-white/30 relative">
              <button
                onClick={handleToggleCreation}
                className="absolute top-2 left-2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>

              {!selectedType ? (
                <div className="flex items-center justify-center gap-6">
                  <button
                    onClick={() => setSelectedType("VIDEO")}
                    className="text-[#3c45aa] font-bold text-sm flex items-center gap-1 hover:underline"
                  >
                    محاضرة <Plus className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setSelectedType("QUIZ")}
                    className="text-[#3c45aa] font-bold text-sm flex items-center gap-1 hover:underline"
                  >
                    اختبار <Plus className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="mt-2">
                  <div className="flex items-center gap-2 mb-4 text-gray-600">
                    <span className="font-bold">إضافة {selectedType === "VIDEO" ? "محاضرة" : "اختبار"}</span>
                    <button onClick={() => setSelectedType(null)} className="text-xs text-blue-600 hover:underline">(تغيير النوع)</button>
                  </div>
                  <ManageFormLesson
                    mode="add"
                    sectionId={section.id}
                    type={selectedType === "VIDEO" ? LectureType.VIDEO : LectureType.QUIZ}
                    onClose={() => handleToggleCreation()}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </Card>
    </>
  );
}
