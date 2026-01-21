import { useState } from "react";
import { toast } from "sonner";
import { handleApiError } from "@/lib/error-handler";
import type { UseMutationResult } from "@tanstack/react-query";

export interface UseDeleteEntityOptions<TData, TVariables> {
    mutation: UseMutationResult<TData, Error, TVariables, unknown>;
    successMessage: string;
    onError?: (error: unknown) => void;
    onSuccess?: () => void;
}

export interface UseDeleteEntityReturn<TVariables> {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    handleDelete: (variables: TVariables) => Promise<void>;
    isPending: boolean;
}


export function useDeleteEntity<TData = void, TVariables = string>({
    mutation,
    successMessage,
    onError,
    onSuccess,
}: UseDeleteEntityOptions<TData, TVariables>): UseDeleteEntityReturn<TVariables> {
    const [isOpen, setIsOpen] = useState(false);
    const { mutateAsync, isPending } = mutation;

    const handleDelete = async (variables: TVariables) => {
        try {
            await mutateAsync(variables);
            toast.success(successMessage);
            setIsOpen(false);
            onSuccess?.();
        } catch (error) {
            if (onError) {
                onError(error);
            } else {
                handleApiError(error);
            }
        }
    };

    return {
        isOpen,
        setIsOpen,
        handleDelete,
        isPending,
    };
}
