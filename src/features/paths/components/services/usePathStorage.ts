import { useCallback } from "react";
import { type CreatePathDto, type UpdatePathDto } from "@/validations/path";
import { FORM_DATA_KEY, FORM_STEP_KEY } from "../services/constants";

export const usePathStorage = () => {
    const saveToLocalStorage = useCallback((key: string, data: Partial<CreatePathDto | UpdatePathDto> | number) => {
        try {
            if (key === FORM_DATA_KEY && typeof data === "object") {
                const dataToSave = { ...data };


                localStorage.setItem(key, JSON.stringify(dataToSave));
            } else {
                localStorage.setItem(key, JSON.stringify(data));
            }
        } catch (error) {
            console.warn("Failed to save to localStorage:", error);
        }
    }, []);

    const getFromLocalStorage = useCallback((key: string) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.warn("Failed to read from localStorage:", error);
            return null;
        }
    }, []);

    const removeFromLocalStorage = useCallback((key: string) => {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.warn("Failed to remove from localStorage:", error);
        }
    }, []);

    const clearDraftData = useCallback(() => {
        removeFromLocalStorage(FORM_DATA_KEY);
        removeFromLocalStorage(FORM_STEP_KEY);
    }, [removeFromLocalStorage]);

    return {
        saveToLocalStorage,
        getFromLocalStorage,
        removeFromLocalStorage,
        clearDraftData,
    };
};
