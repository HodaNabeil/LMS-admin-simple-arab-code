import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import {
    createCourse,
    updateCourse,
    deleteCourse,
    uploadCourseMedia
} from "../services/coursesApi";
import { toast } from "sonner";
import { handleApiError } from "@/lib/error-handler";
import type {
    CreateCourseRequest,
    CreateCourseResponse,
    DeleteCourseResponse,
    UpdateCourseRequest,
    UpdateCourseResponse,
} from "@/types/course";


export function useCreateCourse() {
    const queryClient = useQueryClient();
    return useMutation<CreateCourseResponse, Error, CreateCourseRequest>({
        mutationFn: async (data: CreateCourseRequest): Promise<CreateCourseResponse> => {
            return await createCourse(data);
        },
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.courses.all });
            toast.success(res.message || " إنشاء الدورة بنجاح");
        },
        onError: (error) => {
            handleApiError(error);
        },
    });
}

export function useUpdateCourse({ slug }: { slug: string }) {
    const queryClient = useQueryClient();
    return useMutation<UpdateCourseResponse, Error, UpdateCourseRequest>({
        mutationFn: async (data: UpdateCourseRequest): Promise<UpdateCourseResponse> => {
            return await updateCourse(slug, data);
        },
        onSuccess: (res) => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.courses.detail(slug),
            });
            toast.success(res.message || "تم تحديث الدورة بنجاح");
        },
        onError: (error) => {
            handleApiError(error);
        },
    });
}

export function useDeleteCourse() {
    const queryClient = useQueryClient();
    return useMutation<DeleteCourseResponse, Error, string>({
        mutationFn: async (slug: string): Promise<DeleteCourseResponse> => {
            return await deleteCourse(slug);
        },
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.courses.all });
            toast.success(res.message || "تم حذف الدورة بنجاح");
        },
        onError: (error) => {
            handleApiError(error);
        },
    });
}

export function useUploadCourseMedia({ slug }: { slug: string }) {
    const queryClient = useQueryClient();
    return useMutation<{ thumbnail: File; previewVideo?: File }, Error, { thumbnail: File; previewVideo?: File }>({
        mutationFn: async ({ thumbnail, previewVideo }) => {
            return await uploadCourseMedia(slug, thumbnail, previewVideo);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.courses.detail(slug) });
            toast.success("تم رفع الوسائط بنجاح");
        },
        onError: (error) => {
            handleApiError(error);
        },
    });
}


