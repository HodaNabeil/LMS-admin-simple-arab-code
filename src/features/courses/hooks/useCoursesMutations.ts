import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { coursesApi } from "../services/coursesApi";
import { toast } from "sonner";
import { handleApiError } from "@/lib/error-handler";
import type { CreateCourseRequest, CreateCourseResponse, DeleteCourseResponse, UpdateCourseRequest, UpdateCourseResponse } from "@/types/course";

export function useCreateCourse() {
    const queryClient = useQueryClient();
    return useMutation<CreateCourseResponse, Error, CreateCourseRequest>({
        mutationFn: async (data: CreateCourseRequest): Promise<CreateCourseResponse> => {
            return await coursesApi.createCourse(data);
        },
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.courses.all });
            toast.success(res.message || "تم إنشاء الدورة بنجاح");
        },
        onError: (error) => {
            handleApiError(error, "فشل إنشاء الدورة");
        },
    });
}

export function useUpdateCourse({ slug }: { slug: string }) {
    const queryClient = useQueryClient();
    return useMutation<UpdateCourseResponse, Error, UpdateCourseRequest>({
        mutationFn: async (data: UpdateCourseRequest): Promise<UpdateCourseResponse> => {
            return await coursesApi.updateCourse(slug, data);
        },
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.courses.all });
            queryClient.invalidateQueries({ queryKey: queryKeys.courses.detail(slug) });
            toast.success(res.message || "تم تحديث الدورة بنجاح");
        },
        onError: (error) => {
            handleApiError(error, "فشل تحديث الدورة");
        },
    });
}

export function useDeleteCourse() {
    const queryClient = useQueryClient();
    return useMutation<DeleteCourseResponse, Error, string>({
        mutationFn: async (slug: string): Promise<DeleteCourseResponse> => {
            return await coursesApi.deleteCourse(slug);
        },
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.courses.all });
            toast.success(res.message || "تم حذف الدورة بنجاح");
        },
        onError: (error) => {
            handleApiError(error, "فشل حذف الدورة");
        },
    });
}

export function useUploadCourseMedia({ slug }: { slug: string }) {
    const queryClient = useQueryClient();
    return useMutation<any, Error, { thumbnailUrl: File; previewVideo?: File }>({
        mutationFn: async ({ thumbnailUrl, previewVideo }) => {
            return await coursesApi.uploadCourseMedia(slug, thumbnailUrl, previewVideo);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.courses.detail(slug) });
            // toast.success("تم رفع الوسائط بنجاح"); // Optional, handled by main flow
        },
        onError: (error) => {
            handleApiError(error, "فشل رفع الوسائط");
        },
    });
}
