import { useCallback } from "react";
import type { CreatePathDto, UpdatePathDto, PathCategory } from "@/validations/path";
import { PathCategory as PathCategoryEnum } from "@/validations/path";
import type { Path } from "@/types/path";
import { usePathStorage } from "../components/services/usePathStorage";
import { FORM_DATA_KEY } from "../components/services/constants";

interface UsePathFormDataParams {
    pathData?: Path;
    isEditMode: boolean;
}

interface UsePathFormDataReturn {
    defaultValues: CreatePathDto | UpdatePathDto;
    saveFormData: (data: CreatePathDto | UpdatePathDto) => void;
    clearFormData: () => void;
}


export function usePathFormData({
    pathData,
    isEditMode,
}: UsePathFormDataParams): UsePathFormDataReturn {
    const { saveToLocalStorage, getFromLocalStorage, clearDraftData } = usePathStorage();

    const getDefaultValues = useCallback((): CreatePathDto | UpdatePathDto => {
        // Edit mode: initialize from pathData
        if (isEditMode && pathData) {
            return {
                title: pathData.title || "",
                slug: pathData.slug || "",
                summary: pathData.summary || "",
                description: pathData.description || "",
                icon: pathData.icon || "",
                metaTitle: pathData.metaTitle || "",
                metaDescription: pathData.metaDescription || "",
                category: (pathData.category as unknown as PathCategory) || PathCategoryEnum.WEB,
                trackIds: (pathData as { tracks?: Array<{ id: string }> }).tracks?.map((t) => t.id) || [],
            };
        }

        // Create mode: try to load from localStorage or use defaults
        const savedData = getFromLocalStorage(FORM_DATA_KEY);
        return (
            savedData || {
                title: "",
                slug: "",
                summary: "",
                description: "",
                icon: "",
                metaTitle: "",
                metaDescription: "",
                category: PathCategoryEnum.WEB,
                trackIds: [],
            }
        );
    }, [isEditMode, pathData, getFromLocalStorage]);

    const saveFormData = useCallback(
        (data: CreatePathDto | UpdatePathDto) => {
            if (!isEditMode) {
                saveToLocalStorage(FORM_DATA_KEY, data);
            }
        },
        [isEditMode, saveToLocalStorage]
    );

    const clearFormData = useCallback(() => {
        clearDraftData();
    }, [clearDraftData]);

    return {
        defaultValues: getDefaultValues(),
        saveFormData,
        clearFormData,
    };
}
