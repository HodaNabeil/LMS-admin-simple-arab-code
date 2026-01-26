import { useEffect } from "react";
import { useForm, type Control } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import FormFields from "@/components/shared/form-fields/form-fields";
import { Pages } from "@/constants/enums";

import useFormFields from "@/hooks/useFormFields";
import useFormValidations from "@/hooks/useFormValidations";

import type { basicsSchema, BasicsSchema } from "@/validations/course";

import { useCourseManageStore } from "../../store";
import { CourseDtoLevel } from "@/types/api.generated";

interface BasicsFormProps {
  name?: string;
  slug?: string;
  hours?: number;
  description?: string;
  level?: CourseDtoLevel;
  thumbnailUrl?: File | null;
  previewVideo?: File | null;
}

export default function BasicsForm({
  name,
  slug,
  hours,
  description,
  level,
  thumbnailUrl,
  previewVideo,
}: BasicsFormProps) {


  const { getFormFields } = useFormFields({ slug: Pages.BASICS });
  const { getValidationSchema } = useFormValidations({ slug: Pages.BASICS });



  const {
    control,
    formState: { errors },
    watch,
    reset,
  } = useForm<BasicsSchema>({
    defaultValues: {
      name,
      slug,
      hours,
      description,
      level,
      thumbnailUrl: thumbnailUrl || undefined,
      previewVideo: previewVideo || undefined,
    },
    mode: "onChange",
    resolver: zodResolver(getValidationSchema() as typeof basicsSchema),
  });


  const {
    setTitle,
    setDescription,
    setSlug,
    setLevel,
    setDuration,
    setThumbnail,
    setPreviewVideo,
  } = useCourseManageStore();


  const watchedFields = watch([
    "name",
    "slug",
    "hours",
    "description",
    "level",
    "thumbnailUrl",
    "previewVideo",
  ]);

  const [
    watchedName,
    watchedSlug,
    watchedHours,
    watchedDescription,
    watchedLevel,
    watchedThumbnail,
    watchedPreview,
  ] = watchedFields;


  useEffect(() => {
    if (
      name !== undefined &&
      slug !== undefined &&
      hours !== undefined &&
      description !== undefined &&
      level !== undefined
    ) {
      reset({
        name,
        slug,
        hours,
        description,
        level,
        thumbnailUrl: thumbnailUrl || undefined,
        previewVideo: previewVideo || undefined,
      });
    }
  }, [
    name,
    slug,
    hours,
    description,
    level,
    thumbnailUrl,
    previewVideo,
    reset,
  ]);


  useEffect(() => {
    const timeout = setTimeout(() => {
      setTitle(watchedName || "");
      setDescription(watchedDescription || "");
      setSlug(watchedSlug || "");
      setLevel(watchedLevel || CourseDtoLevel.BEGINNER);
      setDuration(watchedHours || 0);

      if (watchedThumbnail instanceof File) {
        setThumbnail(watchedThumbnail);
      } else {
        setThumbnail(null);
      }

      if (watchedPreview instanceof File) {
        setPreviewVideo(watchedPreview);
      } else {
        setPreviewVideo(null);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [
    watchedName,
    watchedSlug,
    watchedHours,
    watchedDescription,
    watchedLevel,
    watchedThumbnail,
    watchedPreview,
    setTitle,
    setDescription,
    setSlug,
    setLevel,
    setDuration,
    setThumbnail,
    setPreviewVideo,
  ]);



  return (
    <div className="flex flex-col gap-6">
      {getFormFields().map((field, index) => (
        <div key={index} className="mb-4">
          <FormFields
            {...field}
            control={control as Control<BasicsSchema>}
            errors={errors}
          />
        </div>
      ))}
    </div>
  );
}
