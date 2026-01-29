import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pages } from "@/constants/enums";
import useFormFields from "@/hooks/useFormFields";
import useFormValidations from "@/hooks/useFormValidations";
import { useCourseManageStore } from "../../store";
import type { BasicsSchema } from "@/validations/course";
import { CourseDtoLevel } from "@/types/api.generated";

interface UseBasicsFormProps {
    title?: string;
    slug?: string;
    hours?: number;
    description?: string;
    level?: CourseDtoLevel;
    thumbnail?: File | string | null;
    previewVideo?: File | string | null;
    shortDescription?: string;
}

export function useBasicsForm(initialValues: UseBasicsFormProps) {
    const { getFormFields } = useFormFields({ slug: Pages.BASICS });
    const { getValidationSchema } = useFormValidations({ slug: Pages.BASICS });

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

    const form = useForm<BasicsSchema>({
        defaultValues: {
            title: initialValues.title,
            slug: initialValues.slug,
            hours: initialValues.hours,
            description: initialValues.description,
            level: initialValues.level,
            thumbnail: initialValues.thumbnail || undefined,
            previewVideo:
                initialValues.previewVideo instanceof File
                    ? initialValues.previewVideo
                    : undefined,
            shortDescription: initialValues.shortDescription,
        },
        mode: "onChange",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        resolver: zodResolver(getValidationSchema() as any),
    });

    const { watch, reset } = form;

    // Sync initial values when they change (e.g. from API load)
    useEffect(() => {
        if (
            initialValues.title !== undefined &&
            initialValues.slug !== undefined &&
            initialValues.hours !== undefined &&
            initialValues.description !== undefined &&
            initialValues.level !== undefined
        ) {
            reset({
                title: initialValues.title,
                slug: initialValues.slug,
                hours: initialValues.hours,
                description: initialValues.description,
                level: initialValues.level,
                thumbnail: initialValues.thumbnail || undefined,
                previewVideo:
                    initialValues.previewVideo instanceof File
                        ? initialValues.previewVideo
                        : undefined,
                shortDescription: initialValues.shortDescription,
            });
        }
    }, [
        initialValues.title,
        initialValues.slug,
        initialValues.hours,
        initialValues.description,
        initialValues.level,
        initialValues.thumbnail,
        initialValues.previewVideo,
        initialValues.shortDescription,
        reset,
    ]);

    // Watch for changes to update specific store fields
    // Optimization: Watch individual fields to avoid re-renders or unnecessary logic?
    // The original code watched all fields once.
    const watchedValues = watch();

    useEffect(() => {
        const timeout = setTimeout(() => {
            setTitle(watchedValues.title || "");
            setDescription(watchedValues.description || "");
            setSlug(watchedValues.slug || "");
            setLevel(watchedValues.level || CourseDtoLevel.BEGINNER);
            setHours(watchedValues.hours || 0);
            setShortDescription(watchedValues.shortDescription || "");

            if (watchedValues.thumbnail instanceof File) {
                setThumbnail(watchedValues.thumbnail);
            } else {
                setThumbnail(null);
            }

            if (watchedValues.previewVideo instanceof File) {
                setPreviewVideo(watchedValues.previewVideo);
            } else {
                setPreviewVideo(null);
            }
        }, 300);

        return () => clearTimeout(timeout);
    }, [
        watchedValues.title,
        watchedValues.slug,
        watchedValues.hours,
        watchedValues.description,
        watchedValues.level,
        watchedValues.thumbnail,
        watchedValues.previewVideo,
        watchedValues.shortDescription,
        setTitle,
        setDescription,
        setSlug,
        setLevel,
        setHours,
        setThumbnail,
        setPreviewVideo,
        setShortDescription,
    ]);

    return {
        form,
        formFields: getFormFields(),
    };
}
