import { useState, useCallback } from "react";
import type { UseFormTrigger } from "react-hook-form";
import type { CreatePathDto, UpdatePathDto } from "@/validations/path";
import { usePathStorage } from "../components/services/usePathStorage";
import { FORM_STEP_KEY, step1Fields, step2Fields } from "../components/services/constants";
import type { IFormField } from "@/types/app";

interface UsePathFormStepsParams {
    isEditMode: boolean;
    trigger: UseFormTrigger<CreatePathDto | UpdatePathDto>;
}

interface UsePathFormStepsReturn {
    currentStep: number;
    totalSteps: number;
    canGoNext: boolean;
    canGoPrev: boolean;
    nextStep: () => Promise<void>;
    prevStep: () => void;
    getFieldsForStep: (step: number) => Array<keyof UpdatePathDto>;
    getCurrentFields: () => IFormField[];
}

export function usePathFormSteps({
    isEditMode,
    trigger,
}: UsePathFormStepsParams): UsePathFormStepsReturn {
    const { saveToLocalStorage, getFromLocalStorage } = usePathStorage();

    const totalSteps = isEditMode ? 1 : 2;

    const [currentStep, setCurrentStep] = useState<number>(() => {
        if (isEditMode) {
            return 1;
        }
        const savedStep = getFromLocalStorage(FORM_STEP_KEY);
        return savedStep || 1;
    });

    const getFieldsForStep = useCallback(
        (step: number): Array<keyof UpdatePathDto> => {
            if (isEditMode) {
                return [
                    "title",
                    "slug",
                    "summary",
                    "description",
                    "icon",
                    "metaTitle",
                    "metaDescription",
                    "category",
                ];
            }

            switch (step) {
                case 1:
                    return ["title", "slug", "summary", "description", "icon", "metaTitle", "metaDescription"];
                case 2:
                    return ["category"];
                default:
                    return [];
            }
        },
        [isEditMode]
    );

    const getCurrentFields = useCallback((): IFormField[] => {
        if (isEditMode) {
            return [...step1Fields, ...step2Fields];
        }
        switch (currentStep) {
            case 1:
                return step1Fields;
            case 2:
                return step2Fields;
            default:
                return [];
        }
    }, [isEditMode, currentStep]);

    const nextStep = useCallback(async () => {
        const fieldsToValidate = getFieldsForStep(currentStep);
        const isValid = await trigger(fieldsToValidate);

        if (isValid && currentStep < totalSteps) {
            const newStep = currentStep + 1;
            setCurrentStep(newStep);
            if (!isEditMode) {
                saveToLocalStorage(FORM_STEP_KEY, newStep);
            }
        }
    }, [currentStep, totalSteps, isEditMode, getFieldsForStep, trigger, saveToLocalStorage]);

    const prevStep = useCallback(() => {
        if (currentStep > 1) {
            const newStep = currentStep - 1;
            setCurrentStep(newStep);
            if (!isEditMode) {
                saveToLocalStorage(FORM_STEP_KEY, newStep);
            }
        }
    }, [currentStep, isEditMode, saveToLocalStorage]);

    return {
        currentStep,
        totalSteps,
        canGoNext: currentStep < totalSteps,
        canGoPrev: currentStep > 1,
        nextStep,
        prevStep,
        getFieldsForStep,
        getCurrentFields,
    };
}
