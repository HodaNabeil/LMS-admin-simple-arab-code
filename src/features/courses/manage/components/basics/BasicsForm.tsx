import { useEffect, useState } from "react";
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
  thumbnail?: File | string | null;
  previewVideo?: File | string | null;
  shortDescription?: string;

}

export default function BasicsForm({
  title,
  slug,
  hours,
  description,
  level,
  thumbnail,
  previewVideo,
  shortDescription,
}: BasicsFormProps) {
  // State to track if user wants to replace existing media
  const [isReplacingThumbnail, setIsReplacingThumbnail] = useState(false);
  const [isReplacingVideo, setIsReplacingVideo] = useState(false);


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
      thumbnail: thumbnail || undefined,
      previewVideo: previewVideo instanceof File ? previewVideo : undefined,
      shortDescription,










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
    setShortDescription,
  } = useCourseManageStore();


  const watchedFields = watch([
    "title",
    "slug",
    "hours",
    "description",
    "level",
    "thumbnail",
    "previewVideo",
    "shortDescription",
  ]);

  const [
    watchedTitle,
    watchedSlug,
    watchedHours,
    watchedDescription,
    watchedLevel,
    watchedThumbnail,
    watchedPreview,
    watchedShortDescription,
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
        thumbnail: thumbnail || undefined,
        previewVideo: previewVideo instanceof File ? previewVideo : undefined,
        shortDescription,
      });
    }
  }, [
    title,
    slug,
    hours,
    description,
    level,
    thumbnail,
    previewVideo,
    shortDescription,
    reset,
  ]);


  useEffect(() => {
    const timeout = setTimeout(() => {
      setTitle(watchedTitle || "");
      setDescription(watchedDescription || "");
      setSlug(watchedSlug || "");
      setLevel(watchedLevel || CourseDtoLevel.BEGINNER);
      setHours(watchedHours || 0);
      setShortDescription(watchedShortDescription || "");

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
      {/* Render all form fields with custom handling for media fields */}
      {getFormFields().map((field, index) => {
        // Handle thumbnail display and replacement
        if (field.name === "thumbnail") {
          const hasExistingThumbnail = thumbnail && typeof thumbnail === "string";

          // If there's an existing thumbnail and not in replacement mode
          if (hasExistingThumbnail && !isReplacingThumbnail) {
            return (
              <div key={index} className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  {field.label}
                </label>
                <div className="border rounded-lg p-4 bg-gray-50">
                  <img
                    src={thumbnail}
                    alt="Course Thumbnail"
                    className="max-w-full h-auto max-h-64 rounded-lg object-cover mb-3"
                  />
                  <button
                    type="button"
                    onClick={() => setIsReplacingThumbnail(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    استبدال الصورة
                  </button>
                </div>
              </div>
            );
          }

          // If in replacement mode or no existing thumbnail, show upload field
          if (!hasExistingThumbnail || isReplacingThumbnail) {
            return (
              <div key={index} className="mb-4">
                <FormFields
                  {...field}
                  control={control as Control<BasicsSchema>}
                  errors={errors}
                />
                {/* Show cancel button only if replacing existing image */}
                {hasExistingThumbnail && isReplacingThumbnail && (
                  <button
                    type="button"
                    onClick={() => setIsReplacingThumbnail(false)}
                    className="mt-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    إلغاء
                  </button>
                )}
              </div>
            );
          }
        }

        // Handle preview video display and replacement
        if (field.name === "previewVideo") {
          const hasExistingVideo = previewVideo && typeof previewVideo === "string";

          // If there's an existing video and not in replacement mode
          if (hasExistingVideo && !isReplacingVideo) {
            return (
              <div key={index} className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  {field.label}
                </label>
                <div className="border rounded-lg p-4 bg-gray-50">
                  <video
                    src={previewVideo}
                    controls
                    className="max-w-full h-auto max-h-96 rounded-lg mb-3"
                  >
                    متصفحك لا يدعم تشغيل الفيديو
                  </video>
                  <button
                    type="button"
                    onClick={() => setIsReplacingVideo(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    استبدال الفيديو
                  </button>
                </div>
              </div>
            );
          }

          // If in replacement mode or no existing video, show upload field
          if (!hasExistingVideo || isReplacingVideo) {
            return (
              <div key={index} className="mb-4">
                <FormFields
                  {...field}
                  control={control as Control<BasicsSchema>}
                  errors={errors}
                />
                {/* Show cancel button only if replacing existing video */}
                {hasExistingVideo && isReplacingVideo && (
                  <button
                    type="button"
                    onClick={() => setIsReplacingVideo(false)}
                    className="mt-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    إلغاء
                  </button>
                )}
              </div>
            );
          }
        }

        // Render all other fields normally
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
  );
}
