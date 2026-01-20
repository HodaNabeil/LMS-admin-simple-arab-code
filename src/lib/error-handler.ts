import { toast } from "sonner";
import type { AxiosError } from "axios";

/**
 * Standard API error response structure
 */
export interface ApiErrorResponse {
    message: string;
    statusCode?: number;
    error?: string;
    errors?: Array<{
        field: string;
        message: string;
    }>;
}

/**
 * Validation error structure for form fields
 */
export interface ValidationErrors {
    [field: string]: string;
}

/**
 * Extract error message from various error types
 */
export function getErrorMessage(error: unknown): string {
    // Handle AxiosError
    if (isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiErrorResponse>;

        // Check for response data message
        if (axiosError.response?.data?.message) {
            return axiosError.response.data.message;
        }

        // Check for generic error message
        if (axiosError.response?.data?.error) {
            return axiosError.response.data.error;
        }

        // Check for network errors
        if (axiosError.message === "Network Error") {
            return "فشل الاتصال بالخادم. يرجى التحقق من اتصال الإنترنت.";
        }

        // Handle timeout
        if (axiosError.code === "ECONNABORTED") {
            return "انتهت مهلة الطلب. يرجى المحاولة مرة أخرى.";
        }

        // Return general axios error message
        return axiosError.message || "حدث خطأ غير متوقع";
    }

    // Handle standard Error
    if (error instanceof Error) {
        return error.message;
    }

    // Handle string errors
    if (typeof error === "string") {
        return error;
    }

    // Fallback for unknown error types
    return "حدث خطأ غير متوقع";
}

/**
 * Extract validation errors from API response
 */
export function getValidationErrors(error: unknown): ValidationErrors | null {
    if (isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiErrorResponse>;

        if (axiosError.response?.data?.errors && Array.isArray(axiosError.response.data.errors)) {
            const validationErrors: ValidationErrors = {};
            axiosError.response.data.errors.forEach((err) => {
                validationErrors[err.field] = err.message;
            });
            return validationErrors;
        }
    }

    return null;
}

/**
 * Check if error is an AxiosError
 */
function isAxiosError(error: unknown): boolean {
    return (
        typeof error === "object" &&
        error !== null &&
        "isAxiosError" in error &&
        (error as AxiosError).isAxiosError === true
    );
}

/**
 * Handle API errors with toast notifications
 */
export function handleApiError(error: unknown, customMessage?: string): void {
    const errorMessage = customMessage || getErrorMessage(error);
    toast.error(errorMessage);

    // Log error for debugging
    console.error("API Error:", error);
}

/**
 * Handle form submission errors
 * Returns validation errors if any, otherwise shows toast
 */
export function handleFormError(error: unknown): ValidationErrors | null {
    const validationErrors = getValidationErrors(error);

    if (validationErrors) {
        // Show first validation error as toast
        const firstError = Object.values(validationErrors)[0];
        if (firstError) {
            toast.error(firstError);
        }
        return validationErrors;
    }

    // No validation errors, show general error
    handleApiError(error);
    return null;
}

/**
 * Get HTTP status code from error
 */
export function getErrorStatusCode(error: unknown): number | null {
    if (isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiErrorResponse>;
        return axiosError.response?.status || null;
    }
    return null;
}

/**
 * Check if error is a specific HTTP status code
 */
export function isErrorStatus(error: unknown, statusCode: number): boolean {
    return getErrorStatusCode(error) === statusCode;
}

/**
 * Check if error is a validation error (422)
 */
export function isValidationError(error: unknown): boolean {
    return isErrorStatus(error, 422);
}

/**
 * Check if error is unauthorized (401)
 */
export function isUnauthorizedError(error: unknown): boolean {
    return isErrorStatus(error, 401);
}

/**
 * Check if error is forbidden (403)
 */
export function isForbiddenError(error: unknown): boolean {
    return isErrorStatus(error, 403);
}

/**
 * Check if error is not found (404)
 */
export function isNotFoundError(error: unknown): boolean {
    return isErrorStatus(error, 404);
}

/**
 * Check if error is a server error (500-599)
 */
export function isServerError(error: unknown): boolean {
    const statusCode = getErrorStatusCode(error);
    return statusCode !== null && statusCode >= 500 && statusCode < 600;
}
