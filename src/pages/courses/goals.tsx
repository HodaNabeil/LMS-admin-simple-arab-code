"use client";
import Select from "react-select";
import { useState } from "react";
import TagsInput from "@/components/shared/tags-input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

type OptionType = { value: string; label: string };

const courseOptions: OptionType[] = [
  { value: "react", label: "Mastering ReactJS: Build Dynamic Web Apps" },
  { value: "nodejs", label: "NodeJS" },
  { value: "html", label: "Learn HTML in 5 mins" },
  { value: "hoda", label: "Hoda Course" },
];

const Goals = ({ goals }: { goals: string }) => {
  const [selectedCourses, setSelectedCourses] = useState<OptionType[]>([]);

  const [learnTags, setLearnTags] = useState<string[]>(
    (() => {
      try {
        return goals ? JSON.parse(goals)?.data ?? [] : [];
      } catch {
        return [];
      }
    })()
  );

  const [audienceTags, setAudienceTags] = useState<string[]>([]);


  return (
    <form className="">
      <h4 className="text-2xl font-extrabold text-blue-800 mb-8 ">الأهداف</h4>
      <div className="mb-6">
        <Label className="text-base font-semibold text-gray-700 mb-2 block">
          ماذا سيتعلم الطلاب في هذا الكورس؟
        </Label>
        <TagsInput tags={learnTags} setTags={setLearnTags} />
      </div>
      <div className="mb-6">
        <Label className="text-base font-semibold text-gray-700 mb-2 block">
          ما هي المتطلبات أو المعارف السابقة اللازمة لهذا الكورس؟
        </Label>
        <Textarea placeholder="مثال: يفضل معرفة أساسيات البرمجة أو HTML" className="bg-gray-50 border border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 rounded-md p-3 mt-2" />
      </div>
      <div className="mb-6">
        <Label className="text-base font-semibold text-gray-700 mb-2 block">
          اختر الكورسات التي يُنصح بدراستها أولاً
        </Label>
        <Select
          options={courseOptions}
          isMulti
          value={selectedCourses}
          onChange={option => setSelectedCourses(option as OptionType[])}
          className="react-select-container"
          classNamePrefix="react-select"
          placeholder="اختر..."
        />
      </div>
      <div className="mb-2">
        <Label className="text-base font-semibold text-gray-700 mb-2 block">
          لمن هذا الكورس؟
        </Label>
        <TagsInput tags={audienceTags} setTags={setAudienceTags}   />
      </div>
    </form>
  );
};

export default Goals;