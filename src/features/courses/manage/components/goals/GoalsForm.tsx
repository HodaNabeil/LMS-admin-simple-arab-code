import { Label } from "@/components/ui/label";
import Select from "react-select";
import { useEffect } from "react";
import {
  useCourseManageStore,
  type OptionType,
} from "@/features/courses/manage/store";
import TagsInput from "@/components/shared/tags-input";
import { useCoursesByPath } from "@/features/courses/hooks/useCoursesQueries";

export default function GoalsForm({
  objectives,
  courseRequirements,
  targetAudience,
  pathId,
  courseId,
}: {
  objectives: string[];
  courseRequirements: string[];
  targetAudience: string[];
  pathId: string;
  courseId: string;
}) {
  const { data: courses } = useCoursesByPath({
    pathId,
    excludeCourseId: courseId,
  });
  const {
    whatYouWillLearn,
    selectedCourses,
    whoIsThisFor,
    setRequirements,
    setWhatYouWillLearn,
    setSelectedCourses,
    setWhoIsThisFor,
    requirements,
  } = useCourseManageStore();

  useEffect(() => {
    setWhatYouWillLearn(objectives);
    setRequirements(courseRequirements);
    setWhoIsThisFor(targetAudience);
  }, [
    objectives,
    courseRequirements,
    targetAudience,
    setRequirements,
    setWhatYouWillLearn,
    setWhoIsThisFor,
  ]);
  console.log("courses", courses?.data.courses);

  return (
    <div className="flex flex-col gap-1">
      <div className="mb-6">
        <Label className="text-sm font-medium text-card-foreground mb-2 block">
          ما ستتعلمه
        </Label>
        <TagsInput tags={whatYouWillLearn} setTags={setWhatYouWillLearn} />
      </div>

      <div className="mb-6">
        <Label className="text-sm font-medium text-card-foreground mb-2 block">
          ما ينبغي عليك معرفته
        </Label>
        <TagsInput tags={requirements} setTags={setRequirements} />
      </div>

      <div className="mb-6">
        <Label className="text-sm font-medium text-card-foreground mb-2 block">
          اختر دورة يجب تعلمها أولًا
        </Label>
      </div>
      <SelectCourse
        courseOptions={
          courses?.data.courses?.map((course) => ({
            value: course.id,
            label: course.title,
          })) || []
        }
        selectedCourses={selectedCourses}
        setSelectedCourses={setSelectedCourses}
      />
      <div className="mb-4">
        <Label className="text-sm font-medium text-card-foreground mb-2 block">
          لمن هذه الدورة
        </Label>
        <TagsInput tags={whoIsThisFor} setTags={setWhoIsThisFor} />
      </div>
    </div>
  );
}

function SelectCourse({
  courseOptions,
  selectedCourses,
  setSelectedCourses,
}: {
  courseOptions: OptionType[];
  selectedCourses: OptionType[];
  setSelectedCourses: (newValue: OptionType[]) => void;
}) {
  return (
    <Select
      options={courseOptions}
      isMulti
      value={selectedCourses}
      onChange={(newValue, actionMeta) => {
        let updatedOptions = newValue as OptionType[];
        if (actionMeta.action === "select-option" && actionMeta.option) {
          const newOption = actionMeta.option as OptionType;
          updatedOptions = [
            newOption,
            ...updatedOptions.filter((o) => o.value !== newOption.value),
          ];
        }
        setSelectedCourses(updatedOptions);
      }}
      className="react-select-container"
      classNamePrefix="react-select"
      placeholder="اختر..."
    />
  );
}
