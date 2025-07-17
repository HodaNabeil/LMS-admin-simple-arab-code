"use client";
import Select from "react-select";
import { useState } from "react";
import TagsInput from "@/components/shared/tags-input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button"; // تأكد أنك مستورد زر من مكتبة UI

type OptionType = { value: string; label: string };

const courseOptions: OptionType[] = [
  { value: "react", label: "Mastering ReactJS: Build Dynamic Web Apps" },
  { value: "nodejs", label: "NodeJS" },
  { value: "html", label: "Learn HTML in 5 mins" },
  { value: "hoda", label: "Hoda Course" },
];

const Goals = ({ goals }: { goals: string }) => {
  const [formData, setFormData] = useState({
    selectedCourses: [] as OptionType[],
    audienceTags: [] as string[],
    learnTags: (() => {
      try {
        return goals ? JSON.parse(goals)?.data ?? [] : [];
      } catch {
        return [];
      }
    })(),
    rawGoals: goals,
  });

  const handleChange = (key: keyof typeof formData, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // بناء البيانات الجاهزة للإرسال
    const payload = {
      whatWillStudentsLearn: formData.learnTags,
      prerequisites: formData.rawGoals,
      recommendedCourses: formData.selectedCourses.map(
        (course) => course.value
      ),
      targetAudience: formData.audienceTags,
    };

    console.log("بيانات الفورم للإرسال:", payload);

    // هنا تقدر تستخدمي axios أو fetch لإرسال البيانات للسيرفر
    // api.post('/endpoint', payload)
  };

  return (
    <form className="" onSubmit={handleSubmit}>
      <h4 className="text-2xl font-extrabold text-blue-800 mb-8">الأهداف</h4>

      {/* ماذا سيتعلم الطلاب */}
      <div className="mb-6">
        <Label className="text-base font-semibold text-gray-700 mb-2 block">
          ماذا سيتعلم الطلاب في هذا الكورس؟
        </Label>
        <TagsInput
          tags={formData.learnTags}
          setTags={(tags) => handleChange("learnTags", tags)}
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
          onChange={(e) => {
            handleChange("rawGoals", e.target.value);
            try {
              const parsed = JSON.parse(e.target.value).data;
              handleChange("learnTags", parsed);
            } catch {
              handleChange("learnTags", []);
            }
          }}
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
          setTags={(tags) => handleChange("audienceTags", tags)}
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
};

export default Goals;
