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
  title?: string;
  slug?: string;
  hours?: number;
  description?: string;
  level?: CourseDtoLevel;
  thumbnailUrl?: File | null;
  previewVideo?: File | null;
}

export default function BasicsForm({
  title,
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
      title,
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
    setHours,
    setThumbnail,
    setPreviewVideo,
  } = useCourseManageStore();


  const watchedFields = watch([
    "title",
    "slug",
    "hours",
    "description",
    "level",
    "thumbnailUrl",
    "previewVideo",
  ]);

  const [
    watchedTitle,
    watchedSlug,
    watchedHours,
    watchedDescription,
    watchedLevel,
    watchedThumbnail,
    watchedPreview,
  ] = watchedFields;


  useEffect(() => {
    if (
      title !== undefined &&
      slug !== undefined &&
      hours !== undefined &&
      description !== undefined &&
      level !== undefined
    ) {
      reset({
        title,
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
      setTitle(watchedTitle || "");
      setDescription(watchedDescription || "");
      setSlug(watchedSlug || "");
      setLevel(watchedLevel || CourseDtoLevel.BEGINNER);
      setHours(watchedHours || 0);

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
    watchedTitle,
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
    setHours,
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
