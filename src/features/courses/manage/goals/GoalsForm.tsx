import { Label } from "@/components/ui/label";
import Select from "react-select";
import { useEffect, useMemo } from "react";

import {
  useCourseManageStore,
  type OptionType,
} from "@/features/courses/manage/store";

import TagsInput from "@/components/shared/tags-input";
import { useCoursesByPath } from "@/features/courses/hooks/useCoursesQueries";

import { CourseType } from "@/types/course";



interface GoalsFormProps {
  objectives: string[];
  courseRequirements: string[];
  targetAudience: string[];
  pathId: string;
  courseId: string;
  courseType?: CourseType;
  prerequisiteIds?: string[];
}

export default function GoalsForm({
  objectives,
  courseRequirements,
  targetAudience,
  pathId,
  courseId,
  courseType,
  prerequisiteIds = [],
}: GoalsFormProps) {

  const { data: courses, isLoading } = useCoursesByPath({
    pathId,
    excludeCourseId: courseId,
  });

  const {
    learningObjectives,
    requirements,
    targetAudience: storeTargetAudience,
    prerequisiteCourseIds,

    setLearningObjectives,
    setRequirements,
    setTargetAudience,
    setPrerequisiteCourseIds,
  } = useCourseManageStore();

  useEffect(() => {
    setLearningObjectives(objectives ?? []);
    setRequirements(courseRequirements ?? []);
    setTargetAudience(targetAudience ?? []);
    setPrerequisiteCourseIds(prerequisiteIds);
  }, [
    objectives,
    courseRequirements,
    targetAudience,
    prerequisiteIds,
    setLearningObjectives,
    setRequirements,
    setTargetAudience,
    setPrerequisiteCourseIds,
  ]);

  const courseMap = useMemo(() => {
    return new Map(
      courses?.data?.courses?.map((course) => [course.id, course]) || []
    );
  }, [courses]);

  const selectedPrerequisites: OptionType[] = useMemo(() => {
    return prerequisiteCourseIds
      .map((id) => {
        const course = courseMap.get(id);

        if (!course) return null;

        return {
          value: course.id,
          label: course.title,
        };
      })
      .filter(Boolean) as OptionType[];
  }, [prerequisiteCourseIds, courseMap]);

  const courseOptions: OptionType[] = useMemo(() => {
    return (
      courses?.data?.courses?.map((course) => ({
        value: course.id,
        label: course.title,
      })) || []
    );
  }, [courses]);

  if (isLoading) {
    return (
      <div className="py-6 text-center text-sm text-muted-foreground">
        جاري تحميل الدورات...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="mb-6">
        <Label className="text-sm font-medium text-card-foreground mb-2 block">
          ما ستتعلمه
        </Label>

        <TagsInput
          tags={learningObjectives}
          setTags={setLearningObjectives}
        />
      </div>

      <div className="mb-6">
        <Label className="text-sm font-medium text-card-foreground mb-2 block">
          ما ينبغي عليك معرفته
        </Label>

        <TagsInput tags={requirements} setTags={setRequirements} />
      </div>

      <div className="mb-2">
        <Label className="text-sm font-medium text-card-foreground block">
          {courseType === CourseType.BUNDLE
            ? "اختر الدورات المضمنة في الحزمة"
            : "اختر دورة يجب تعلمها أولًا"}
        </Label>
      </div>

      <SelectCourse
        options={courseOptions}
        value={selectedPrerequisites}
        onChange={setPrerequisiteCourseIds}
      />

      <div className="mb-4 mt-6">
        <Label className="text-sm font-medium text-card-foreground mb-2 block">
          لمن هذه الدورة
        </Label>

        <TagsInput
          tags={storeTargetAudience}
          setTags={setTargetAudience}
        />
      </div>
    </div>
  );
}

interface SelectCourseProps {
  options: OptionType[];
  value: OptionType[];
  onChange: (ids: string[]) => void;
}

function SelectCourse({
  options,
  value,
  onChange,
}: SelectCourseProps) {
  return (
    <Select<OptionType, true>
      options={options}
      isMulti
      value={value}
      onChange={(newValue) => {
        const selected = newValue || [];

        onChange(selected.map((opt) => opt.value));
      }}
      className="react-select-container"
      classNamePrefix="react-select"
      placeholder="اختر..."
      noOptionsMessage={() => "لا توجد دورات متاحة"}
    />
  );
}
