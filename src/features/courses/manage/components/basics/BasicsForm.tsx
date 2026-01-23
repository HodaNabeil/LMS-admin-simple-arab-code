import FormFields from "@/components/shared/form-fields/form-fields";
import { Pages } from "@/constants/enums";
import useFormFields from "@/hooks/useFormFields";
import useFormValidations from "@/hooks/useFormValidations";
import type { basicsSchema, BasicsSchema } from "@/validations/course";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type Control } from "react-hook-form";
import { useCourseManageStore } from "../../store";
import { useEffect } from "react";

export default function BasicsForm() {
  const { getFormFields } = useFormFields({ slug: Pages.BASICS });
  const { getValidationSchema } = useFormValidations({ slug: Pages.BASICS });

  const {
    control,
    formState: { errors },
    watch,
  } = useForm<BasicsSchema>({
    defaultValues: {
      name: "",
      slug: "",
      hours: 0,
      description: "",
      level: "",
      thumbnail: undefined,
      previewVideo: undefined,
    },
    mode: "onChange",
    resolver: zodResolver(getValidationSchema() as typeof basicsSchema),
  });

  const setTitle = useCourseManageStore((state) => state.setTitle);
  const setDescription = useCourseManageStore((state) => state.setDescription);
  const setSlug = useCourseManageStore((state) => state.setSlug);
  const setLevel = useCourseManageStore((state) => state.setLevel);
  const setDuration = useCourseManageStore((state) => state.setDuration);
  const setThumbnail = useCourseManageStore((state) => state.setThumbnail);
  const setPreviewVideo = useCourseManageStore((state) => state.setPreviewVideo);

  const formValues = watch();

  useEffect(() => {
    setTitle(formValues.name || "");
    setDescription(formValues.description || "");
    setSlug(formValues.slug || "");
    setLevel(formValues.level || "");
    setDuration(formValues.hours || 0);

    if (formValues.thumbnail) {
      setThumbnail(formValues.thumbnail as unknown as File);
    } else {
      setThumbnail(null);
    }

    if (formValues.previewVideo) {
      setPreviewVideo(formValues.previewVideo as unknown as File);
    } else {
      setPreviewVideo(null);
    }
  }, [formValues, setTitle, setDescription, setSlug, setLevel, setDuration, setThumbnail, setPreviewVideo]);

  return (
    <div className="flex flex-col gap-6">
      {getFormFields().map((field, index) => (
        <div key={index} className="mb-4">
          <FormFields
            {...field}
            control={control as unknown as Control<Record<string, unknown>>}
            errors={errors}
          />
        </div>
      ))}
    </div>
  );

}
