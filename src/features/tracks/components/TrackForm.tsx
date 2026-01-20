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
import { useCreateTrack } from "../hooks/useTracksMutations";
import { usePaths } from "@/features/paths/hooks/usePathsQueries";

export default function TrackForm() {
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

    const {
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm<ITrackForm>({
        defaultValues: {
            slug: '',
            pathId: '',
            title: '',
            summary: '',
            description: '',
        },
        mode: 'onChange',
        resolver: zodResolver(getValidationSchema() as typeof createTrackSchema),
    });

    const [submitError, setSubmitError] = useState<string | null>(null);

    const handleFormSubmit = async (data: ITrackForm) => {
        try {
            setSubmitError(null);
            await createTrack(data);
            navigate('/admin/tracks');
        } catch (error) {
            console.error('Track creation error:', error);
            const errorMessage = error instanceof Error
                ? error.message
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
                    {isSubmitting ? <Loader /> : 'إضافة مسار'}
                </button>
            </form>
        </div>
    );
}
