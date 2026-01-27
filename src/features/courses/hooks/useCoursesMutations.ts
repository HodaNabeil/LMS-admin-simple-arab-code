import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys, couponsKeys } from "@/lib/query-keys";
import { coursesApi } from "../services/coursesApi";
import { toast } from "sonner";
import { handleApiError } from "@/lib/error-handler";
import type {
    CreateCourseRequest,
    CreateCourseResponse,
    DeleteCourseResponse,
    UpdateCourseRequest,
    UpdateCourseResponse,
    CreateCouponRequest,
    UpdateCouponRequest,
    Coupon
} from "@/types/course";

export function useCreateCoupon() {
    const queryClient = useQueryClient();
    return useMutation<Coupon, Error, CreateCouponRequest>({
        mutationFn: async (data: CreateCouponRequest): Promise<Coupon> => {
            return await coursesApi.createCoupon(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: couponsKeys.all });
            toast.success("تم إنشاء الكوبون بنجاح");
        },
        onError: (error) => {
            handleApiError(error, "فشل إنشاء الكوبون");
        },
    });
}

export function useUpdateCoupon() {
    const queryClient = useQueryClient();
    return useMutation<Coupon, Error, { id: string; data: UpdateCouponRequest }>({
        mutationFn: async ({ id, data }): Promise<Coupon> => {
            return await coursesApi.updateCoupon(id, data);
        },
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: couponsKeys.all });
            queryClient.invalidateQueries({ queryKey: couponsKeys.detail(id) });
            toast.success("تم تحديث الكوبون بنجاح");
        },
        onError: (error) => {
            handleApiError(error, "فشل تحديث الكوبون");
        },
    });
}

export function useDeleteCouponMutation() { // Renamed to avoid confusion with useDeleteCourse if needed, but useDeleteCoupon is better
    const queryClient = useQueryClient();
    return useMutation<void, Error, string>({
        mutationFn: async (id: string): Promise<void> => {
            return await coursesApi.deleteCoupon(id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: couponsKeys.all });
            toast.success("تم حذف الكوبون بنجاح");
        },
        onError: (error) => {
            handleApiError(error, "فشل حذف الكوبون");
        },
    });
}

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
            queryClient.invalidateQueries({
                queryKey: queryKeys.courses.detail(slug),
            });
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


