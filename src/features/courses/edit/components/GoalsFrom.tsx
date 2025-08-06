import TagsInput from "@/components/shared/tags-input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Select from "react-select";
import { useState } from "react";

type OptionType = { value: string; label: string };

const courseOptions: OptionType[] = [
  { value: "react", label: "Mastering ReactJS: Build Dynamic Web Apps" },
  { value: "nodejs", label: "NodeJS" },
  { value: "html", label: "Learn HTML in 5 mins" },
  { value: "hoda", label: "Hoda Course" },
];

export default function GoalsFrom() {
  const [formData, setFormData] = useState({
    selectedCourses: [] as OptionType[],
    audienceTags: [] as string[],
    learnTags: [] as string[],
    rawGoals: "",
  });
  const handleChange = <K extends keyof typeof formData>(
    key: K,
    value: (typeof formData)[K]
  ) => {
    setFormData((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    handleChange("rawGoals", value);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-1">
      <h4 className="text-2xl font-extrabold text-blue-800 mb-8">الأهداف</h4>

      {/* ماذا سيتعلم الطلاب */}
      <div className="mb-6">
        <Label className="text-base font-semibold text-gray-700 mb-2 block">
          ماذا سيتعلم الطلاب في هذا الكورس؟
        </Label>
        <TagsInput
          tags={formData.learnTags}
          setTags={(tags) => handleChange("learnTags", tags as string[])}
        />
      </div>

      {/* المتطلبات */}
      <div className="mb-6">
        <Label className="text-base font-semibold text-gray-700 mb-2 block">
          ما هي المتطلبات أو المعارف السابقة اللازمة لهذا الكورس؟
        </Label>
        <Textarea
          rows={5}
          value={formData.rawGoals}
          onChange={handleTextareaChange}
          placeholder="مثال: يفضل معرفة أساسيات البرمجة أو HTML"
          className="bg-gray-50 border border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 rounded-md p-3 mt-2"
        />
      </div>

      {/* كورسات يفضل دراستها أولاً */}
      <div className="mb-6">
        <Label className="text-base font-semibold text-gray-700 mb-2 block">
          اختر الكورسات التي يُنصح بدراستها أولاً
        </Label>
        <Select
          options={courseOptions}
          isMulti
          value={formData.selectedCourses}
          onChange={(option) =>
            handleChange("selectedCourses", option as OptionType[])
          }
          className="react-select-container"
          classNamePrefix="react-select"
          placeholder="اختر..."
        />
      </div>

      {/* لمن هذا الكورس */}
      <div className="mb-4">
        <Label className="text-base font-semibold text-gray-700 mb-2 block">
          لمن هذا الكورس؟
        </Label>
        <TagsInput
          tags={formData.audienceTags}
          setTags={(tags) => handleChange("audienceTags", tags as string[])}
        />
      </div>

      {/* زر الإرسال */}
      <div className="mt-6">
        <Button type="submit" className="bg-blue-700 text-white px-6 py-2">
          إرسال البيانات
        </Button>
      </div>
    </form>
  );
}
