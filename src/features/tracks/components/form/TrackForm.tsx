import { Pages } from "@/constants/enums";
import { useNavigate } from "react-router-dom";
import { useForm, type Control } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useMemo } from "react";
import FormFields from "@/components/shared/form-fields/form-fields";
import { Loader } from "@/components/shared/loader";
import useFormFields from "@/hooks/useFormFields";
import useFormValidations from "@/hooks/useFormValidations";
import { createTrackSchema, type ITrackForm } from "@/validations/track";
import { useCreateTrack, useUpdateTrack } from "../../hooks/useTracksMutations";
import { usePaths } from "@/features/paths/hooks/usePathsQueries";
import type { GetTrackResponse, UpdateTrackRequest } from "@/types/tracks";

interface TrackFormProps {
    trackData?: GetTrackResponse;
}

export default function TrackForm({ trackData }: TrackFormProps) {
    const isEditMode = !!trackData;
    const track = trackData?.track;

    const { getFormFields } = useFormFields({ slug: Pages.CREATE_TRACKS });
    const { getValidationSchema } = useFormValidations({
        slug: Pages.CREATE_TRACKS,
    });
    const navigate = useNavigate();
    const { data: pathsData, isPending: isLoadingPaths } = usePaths();

    // Map paths to select options
    const pathOptions = useMemo(() => {
        if (!pathsData?.data?.paths) return [];
        return pathsData.data.paths.map((path) => ({
            value: path.id.toString(),
            label: path.title || path.slug,
        }));
    }, [pathsData]);

    const { mutateAsync: createTrack } = useCreateTrack();
    const { mutateAsync: updateTrack } = useUpdateTrack();

    const {
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm<ITrackForm>({
        defaultValues: {
            slug: track?.slug || '',
            pathId: track?.pathId || '',
            title: track?.title || '',
            summary: track?.summary || '',
            description: track?.description || '',
            category: track?.category as unknown as ITrackForm['category'], // API returns same category type
        },
        mode: 'onChange',
        resolver: zodResolver(getValidationSchema() as typeof createTrackSchema),
    });

    const [submitError, setSubmitError] = useState<string | null>(null);

    const handleFormSubmit = async (data: ITrackForm) => {
        try {
            setSubmitError(null);

            if (isEditMode && track) {
                // Type-safe update data
                await updateTrack({
                    slug: track.slug,
                    data: {
                        slug: data.slug,
                        pathId: data.pathId,
                        title: data.title,
                        summary: data.summary,
                        description: data.description,
                        category: data.category as unknown as UpdateTrackRequest['category'],
                    }
                });
            } else {
                await createTrack(data);
            }

            navigate('/admin/tracks');
        } catch (error) {
            console.error('Track submission error:', error);
            const errorMessage = error instanceof Error
                ? error.message
                : isEditMode
                    ? 'حدث خطأ أثناء تحديث المسار. يرجى المحاولة مرة أخرى.'
                    : 'حدث خطأ أثناء إنشاء المسار. يرجى المحاولة مرة أخرى.';
            setSubmitError(errorMessage);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-card rounded-lg border shadow-sm my-6">
            <form
                onSubmit={handleSubmit(handleFormSubmit)}
                className="flex flex-col gap-4"
            >
                {getFormFields().map((field) => {
                    // Inject dynamic path options into the pathId field
                    const fieldWithOptions = field.name === 'pathId'
                        ? { ...field, options: pathOptions }
                        : field;

                    return (
                        <FormFields
                            key={field.name}
                            {...fieldWithOptions}
                            control={control as unknown as Control<Record<string, unknown>>}
                            errors={errors}
                        />
                    );
                })}

                {submitError && (
                    <div className="text-red-500 text-sm text-center p-2 bg-red-50 rounded">
                        {submitError}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isSubmitting || isLoadingPaths}
                    className="bg-primary text-white rounded px-4 py-2 text-sm hover:bg-primary/90 transition disabled:opacity-50 flex items-center justify-center gap-2"
                >
                    {isSubmitting ? <Loader /> : isEditMode ? 'تحديث المسار' : 'إضافة مسار'}
                </button>
            </form>
        </div>
    );
}
