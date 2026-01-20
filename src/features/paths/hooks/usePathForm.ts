import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPathSchema, editPathSchema, type CreatePathDto, type UpdatePathDto } from "@/validations/path";
import type { Path } from "@/types/path";
import { usePathFormData } from "./usePathFormData";
import { usePathFormSteps } from "./usePathFormSteps";
import { usePathFormSubmit } from "./usePathFormSubmit";

interface UsePathFormParams {
    pathData?: Path;
}


export function usePathForm({ pathData }: UsePathFormParams) {
    const isEditMode = Boolean(pathData);

    const { defaultValues, saveFormData, clearFormData } = usePathFormData({
        pathData,
        isEditMode,
    });

    const form = useForm<CreatePathDto | UpdatePathDto>({
        // @ts-expect-error - zodResolver has issues with conditional schema types
        resolver: zodResolver(isEditMode ? editPathSchema : createPathSchema),
        mode: "onChange",
        defaultValues,
    });

    const { handleSubmit, control, formState, trigger, watch, reset } = form;
    const { errors, isSubmitting } = formState;

    const steps = usePathFormSteps({
        isEditMode,
        trigger,
    });

    const submit = usePathFormSubmit({
        isEditMode,
        pathSlug: pathData?.slug,
        clearFormData,
    });

    const watchedValues = watch();

    useEffect(() => {
        if (!isEditMode) {
            const timeoutId = setTimeout(() => {
                saveFormData(watchedValues);
            }, 500);
            return () => clearTimeout(timeoutId);
        }
    }, [watchedValues, isEditMode, saveFormData]);

    const formLoading = isSubmitting || submit.isSubmitting;

    return {
        form: {
            handleSubmit,
            control,
            errors,
            reset,
        },
        steps,
        submit,
        isEditMode,
        formLoading,
        clearFormData,
    };
}
