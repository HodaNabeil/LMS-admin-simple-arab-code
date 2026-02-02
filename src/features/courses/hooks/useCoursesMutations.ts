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
import { couponApi } from "../services/cuponApi";

export function useCreateCoupon() {
    const queryClient = useQueryClient();
    return useMutation<Coupon, Error, CreateCouponRequest>({
        mutationFn: async (data: CreateCouponRequest): Promise<Coupon> => {
            return await couponApi.createCoupon(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: couponsKeys.all });
            toast.success("تم إنشاء الكوبون بنجاح");
        },
        onError: (error) => {
            handleApiError(error);
        },
    });
}

export function useUpdateCoupon() {
    const queryClient = useQueryClient();
    return useMutation<Coupon, Error, { id: string; data: UpdateCouponRequest }>({
        mutationFn: async ({ id, data }): Promise<Coupon> => {
            return await couponApi.updateCoupon(id, data);
        },
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: couponsKeys.all });
            queryClient.invalidateQueries({ queryKey: couponsKeys.detail(id) });
            toast.success("تم تحديث الكوبون بنجاح");
        },
        onError: (error) => {
            handleApiError(error);
        },
    });
}

export function useDeleteCouponMutation() {
    const queryClient = useQueryClient();
    return useMutation<void, Error, string>({
        mutationFn: async (id: string): Promise<void> => {
            return await couponApi.deleteCoupon(id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: couponsKeys.all });
            toast.success("تم حذف الكوبون بنجاح");
        },
        onError: (error) => {
            handleApiError(error);
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
            return await coursesApi.updateCourse(slug, data);
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
            return await coursesApi.deleteCourse(slug);
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
            return await coursesApi.uploadCourseMedia(slug, thumbnail, previewVideo);
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


