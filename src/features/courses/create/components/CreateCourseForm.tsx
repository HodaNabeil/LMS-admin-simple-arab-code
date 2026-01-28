import FormFields from "@/components/shared/form-fields/form-fields";
import { Loader } from "@/components/shared/loader";
import { Pages } from "@/constants/enums";
import useFormFields from "@/hooks/useFormFields";
import useFormValidations from "@/hooks/useFormValidations";
import {
  createCourseSchema,
  type ICreateCourseForm,
} from "@/validations/createcourse";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type Control } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { useTracks } from "@/features/tracks/hooks/useTracksQueries";

import { useCreateCourse } from "../../hooks/useCoursesMutations";
import { usePaths } from "@/features/paths/hooks/usePathsQueries";

export default function CreateCourseForm() {
  const { getFormFields } = useFormFields({ slug: Pages.CREATE_COURSES });
  const { getValidationSchema } = useFormValidations({
    slug: Pages.CREATE_COURSES,
  });
  const navigate = useNavigate();
  const { data: tracksData, isLoading: isLoadingTracks } = useTracks();
  const { data: pathsData, isLoading: isLoadingPaths } = usePaths();
  const { mutateAsync: createCourse } = useCreateCourse();

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ICreateCourseForm>({
    defaultValues: {
      slug: "",
      trackId: "",
      pathId: "",
    },
    mode: "onChange",
    resolver: zodResolver(getValidationSchema() as typeof createCourseSchema),
  });

  const trackOptions = useMemo(() => {
    if (!tracksData?.data?.tracks) return [];

    return tracksData.data.tracks.map((track) => ({
      value: track.id.toString(),
      label: track.title || track.slug,
    }));
  }, [tracksData]);

  const pathOptions = useMemo(() => {
    if (!pathsData?.data?.paths) return [];

    return pathsData.data.paths.map((path) => ({
      value: path.id.toString(),
      label: path.title || path.slug,
    }));
  }, [pathsData]);


  const handleFormSubmit = async (data: ICreateCourseForm) => {
    try {
      await createCourse({
        slug: data.slug,
        trackId: data.trackId,
        pathId: data.pathId,
      });
      navigate(`/admin/${Pages.COURSES}/${data.slug}/${Pages.GOALS}`);
    } catch (error) {
      console.error("Course creation error:", error);
    }
  };

  const isLoading = isLoadingTracks || isLoadingPaths;

  return (
    <div className="flex flex-col gap-4 w-full max-w-2xl  p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h1 className="text-xl font-bold text-gray-600 mb-4 text-center border-b border-gray-200 pb-4 w-full">
        إضافة دورة جديدة
      </h1>



      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <Loader />
          <span className="mr-2">جاري تحميل البيانات...</span>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="flex flex-col gap-4"
        >
          {getFormFields().map((field) => {
            let fieldWithOptions = field;

            if (field.name === "trackId") {
              fieldWithOptions = { ...field, options: trackOptions };
            }

            if (field.name === "pathId") {
              fieldWithOptions = { ...field, options: pathOptions };
            }

            return (
              <FormFields
                key={field.name}
                {...fieldWithOptions}
                control={control as unknown as Control<Record<string, unknown>>}
                errors={errors}
              />
            );
          })}

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary text-white rounded px-4 py-2 text-sm hover:bg-primary/90 transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isSubmitting ? <Loader /> : "إضافة دورة"}
          </button>
        </form>
      )}
    </div>
  );
}
