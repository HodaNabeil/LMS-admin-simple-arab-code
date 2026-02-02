import axios, { AxiosError } from "axios";
import { toast } from "sonner";

/* =====================================
   API Error Response Shape
===================================== */

export interface ApiErrorResponse {
    message?: string;
    statusCode?: number;
    error?: string;

    errors?: Array<{
        field: string;
        message: string;
    }>;
}

/* =====================================
   Validation Errors (Multiple Messages)
===================================== */

export type ValidationErrors = {
    [field: string]: string[];
};

/* =====================================
   Extract Error Message
===================================== */

export function getErrorMessage(error: unknown): string {
    /* Axios Errors */
    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiErrorResponse>;

        const data = axiosError.response?.data;

        /* Backend Message */
        if (data?.message) return data.message;

        /* Backend Generic Error */
        if (data?.error) return data.error;

        /* Network Error */
        if (axiosError.message === "Network Error") {
            return "فشل الاتصال بالخادم. تحقق من الإنترنت.";
        }

        /* Timeout */
        if (axiosError.code === "ECONNABORTED") {
            return "انتهت مهلة الطلب. حاول مرة أخرى.";
        }

        /* Fallback */
        return axiosError.message || "حدث خطأ غير متوقع";
    }

    /* Native JS Error */
    if (error instanceof Error) {
        return error.message;
    }

    /* String Error */
    if (typeof error === "string") {
        return error;
    }

    return "حدث خطأ غير متوقع";
}

/* =====================================
   Extract Validation Errors
===================================== */

export function getValidationErrors(
    error: unknown
): ValidationErrors | null {
    if (!axios.isAxiosError(error)) return null;

    const data = error.response?.data as ApiErrorResponse | undefined;

    if (!data?.errors || !Array.isArray(data.errors)) {
        return null;
    }

    const validationErrors: ValidationErrors = {};

    data.errors.forEach(({ field, message }) => {
        if (!validationErrors[field]) {
            validationErrors[field] = [];
        }

        validationErrors[field].push(message);
    });

    return validationErrors;
}

/* =====================================
   Get Status Code
===================================== */

export function getErrorStatusCode(
    error: unknown
): number | null {
    if (!axios.isAxiosError(error)) return null;

    return error.response?.status ?? null;
}

/* =====================================
   Status Helpers
===================================== */

export const isValidationError = (error: unknown) =>
    getErrorStatusCode(error) === 422;

export const isUnauthorizedError = (error: unknown) =>
    getErrorStatusCode(error) === 401;

export const isForbiddenError = (error: unknown) =>
    getErrorStatusCode(error) === 403;

export const isNotFoundError = (error: unknown) =>
    getErrorStatusCode(error) === 404;

export const isServerError = (error: unknown) => {
    const status = getErrorStatusCode(error);
    return status !== null && status >= 500;
};

/* =====================================
   Auth Auto Handler
===================================== */

function handleAuthError(error: unknown) {
    if (!isUnauthorizedError(error)) return;

    /*
      Example:
      localStorage.removeItem("token");
      window.location.href = "/login";
    */

    toast.error("انتهت الجلسة. يرجى تسجيل الدخول مرة أخرى.");
}

/* =====================================
   Dev Logger
===================================== */

function logError(error: unknown) {
    if (import.meta.env.DEV) {
        console.error("API Error:", error);
    }
}

/* =====================================
   Global API Error Handler
===================================== */

export function handleApiError(
    error: unknown,
    options?: {
        customMessage?: string;
        silent?: boolean;
    }
) {
    const message =
        options?.customMessage || getErrorMessage(error);

    /* Auth Handling */
    handleAuthError(error);

    /* Toast */
    if (!options?.silent) {
        toast.error(message);
    }

    /* Logging */
    logError(error);
}

/* =====================================
   Form Error Handler
===================================== */

export function handleFormError(
    error: unknown
): ValidationErrors | null {
    const validationErrors = getValidationErrors(error);

    /* Validation Errors */
    if (validationErrors) {
        const firstField = Object.keys(validationErrors)[0];

        if (firstField) {
            const firstMessage =
                validationErrors[firstField][0];

            toast.error(firstMessage);
        }

        logError(error);

        return validationErrors;
    }

    /* General Errors */
    handleApiError(error);

    return null;
}

/* =====================================
   React Query / TanStack Support
===================================== */

export function createQueryErrorHandler() {
    return (error: unknown) => {
        handleApiError(error);
    };
}
