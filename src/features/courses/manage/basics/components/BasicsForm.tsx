import MediaField from "./MediaField";
import FormFields from "@/components/shared/form-fields/form-fields";
import { useBasicsForm } from "../hooks/useBasicsForm";
import type { Control } from "react-hook-form";
import type { BasicsSchema } from "@/validations/course";
import type { CourseDtoLevel } from "@/types/api.generated";
import { Form } from "@/components/ui/form";

interface BasicsFormProps {
  title?: string;
  slug?: string;
  hours?: number;
  description?: string;
  level?: CourseDtoLevel;
  thumbnail?: File | string | null;
  previewVideo?: File | string | null;
  shortDescription?: string;
}

export default function BasicsForm(props: BasicsFormProps) {
  const { form, formFields } = useBasicsForm(props);
  const { control, formState: { errors } } = form;

  return (
    <Form {...form}>
      <div className="flex flex-col gap-6">
        {formFields.map((field, index) => {
          if (field.name === "thumbnail") {
            return (
              <MediaField
                key={index}
                name="thumbnail"
                label={field.label || ""}
                placeholder={field.placeholder || ""}
                control={control}
                errors={errors}
                currentValue={props.thumbnail}
                type="image"
              />
            );
          }

          if (field.name === "previewVideo") {
            return (
              <MediaField
                key={index}
                name="previewVideo"
                label={field.label || ""}
                placeholder={field.placeholder || ""}
                control={control}
                errors={errors}
                currentValue={props.previewVideo}
                type="video"
              />
            );
          }

          return (
            <div key={index} className="mb-4">
              <FormFields
                {...field}
                control={control as Control<BasicsSchema>}
                errors={errors}
              />
            </div>
          );
        })}
      </div>
    </Form>
  );
}
