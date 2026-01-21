import { useCallback } from "react";
import type { FieldErrors } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import type { CreatePathDto, UpdatePathDto } from "@/validations/path";
import type { UpdatePathRequest } from "@/types/path";
import { Pages, Routes } from "@/constants/enums";
import { useCreatePath, useUpdatePath } from "./usePathsMutations";

interface UsePathFormSubmitParams {
    isEditMode: boolean;
    pathSlug?: string;
    clearFormData: () => void;
}

interface UsePathFormSubmitReturn {
    onSubmit: (data: CreatePathDto | UpdatePathDto) => Promise<void>;
    onInvalid: (errors: FieldErrors) => void;
    isSubmitting: boolean;
}


export function usePathFormSubmit({
    isEditMode,
    pathSlug = "",
    clearFormData,
}: UsePathFormSubmitParams): UsePathFormSubmitReturn {
    const navigate = useNavigate();
    const createMutation = useCreatePath();
    const updateMutation = useUpdatePath({ slug: pathSlug });
    const mutation = isEditMode ? updateMutation : createMutation;

    const onSubmit = useCallback(
        async (data: CreatePathDto | UpdatePathDto) => {
            try {
                if (isEditMode) {
                    // UpdatePathDto requires isPublished and sortOrder
                    const updateData: UpdatePathRequest = {
                        ...data,
                        isPublished: (data as UpdatePathDto).isPublished ?? true,
                        sortOrder: (data as UpdatePathDto).sortOrder ?? 0,
                    } as UpdatePathRequest;
                    await updateMutation.mutateAsync(updateData);
                } else {
                    await createMutation.mutateAsync(data as CreatePathDto);
                }
                clearFormData();
                toast.success(
                    isEditMode ? "تم تحديث المسار بنجاح" : "تم إنشاء المسار بنجاح"
                );
                navigate(`/${Routes.ADMIN}/${Pages.PATHS}`);
            } catch (error) {
                console.error("Error details:", {
                    error,
                    isEditMode,
                    data,
                });
            }
        },
        [updateMutation, createMutation, clearFormData, isEditMode, navigate]
    );

    const onInvalid = useCallback((errors: FieldErrors) => {
        console.error("Validation Errors:", errors);
        const missingFields = Object.keys(errors).join(", ");
        toast.error(`يرجى التحقق من الحقول المطلوبة: ${missingFields}`);
    }, []);

    return {
        onSubmit,
        onInvalid,
        isSubmitting: mutation.isPending,
    };
}
