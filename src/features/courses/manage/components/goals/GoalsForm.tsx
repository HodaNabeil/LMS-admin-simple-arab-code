import TagsInput from "@/components/shared/tags-input";
import { Label } from "@/components/ui/label";
import Select from "react-select";
import { useState } from "react";
import FormFields from "@/components/shared/form-fields/form-fields";
import useFormFields from "@/hooks/useFormFields";
import { Pages } from "@/constants/enums";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { goalsSchema, type GoalsSchema } from "@/validations/course";

type OptionType = { value: string; label: string };

const courseOptions: OptionType[] = [
  { value: "react", label: "Mastering ReactJS: Build Dynamic Web Apps" },
  { value: "nodejs", label: "NodeJS" },
  { value: "html", label: "Learn HTML in 5 mins" },
  { value: "hoda", label: "Hoda Course" },
];

type FormDataType = {
  whatYouWillLearn: string[];
  whoIsThisFor: string[];
  prerequisites: string[];
  selectedCourses: OptionType[];
  audienceTags: string[];
};

export default function GoalsForm() {
  const { getFormFields } = useFormFields({ slug: Pages.GOALS });
  const [formData, setFormData] = useState<FormDataType>({
    whatYouWillLearn: [],
    whoIsThisFor: [],
    prerequisites: [],
    selectedCourses: [],
    audienceTags: [],
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<GoalsSchema>({
    resolver: zodResolver(goalsSchema),
    defaultValues: {
      knowledgeNeeded: "",
    },
    mode: "onChange",
  });
  const onSubmit = (data: GoalsSchema) => {
    console.log("Form submitted with data:", data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-1">
      <div className="mb-6">
        <Label className="text-sm font-medium text-card-foreground mb-2 block">
          ما ستتعلمه
        </Label>
        <TagsInput
          tags={formData.whatYouWillLearn}
          setTags={(tags) =>
            setFormData({ ...formData, whatYouWillLearn: tags })
          }
        />
      </div>

      {getFormFields().map((field) => (
        <div className="mb-3" key={field.name}>
          <FormFields {...field} control={control} errors={errors} />
        </div>
      ))}

      <div className="mb-6">
        <Label className="text-sm font-medium text-card-foreground mb-2 block">
          اختر دورة يجب تعلمها أولًا
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
      <div className="mb-4">
        <Label className="text-sm font-medium text-card-foreground mb-2 block">
          لمن هذه الدورة
        </Label>
        <TagsInput
          tags={formData.audienceTags}
          setTags={(tags) => handleChange("audienceTags", tags as string[])}
        />
      </div>
    </form>
  );
}
