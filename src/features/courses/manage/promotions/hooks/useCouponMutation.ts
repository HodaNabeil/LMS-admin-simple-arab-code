import { useMutation, useQueryClient } from "@tanstack/react-query";
import { couponsKeys } from "@/lib/query-keys";
import { toast } from "sonner";
import { handleApiError } from "@/lib/error-handler";
import type {
    CreateCouponRequest,
    UpdateCouponRequest,
    Coupon
} from "@/types/course";
import { createCoupon, updateCoupon, deleteCoupon } from "@/features/coupons/services/couponApi";

export function useCreateCoupon() {
    const queryClient = useQueryClient();
    return useMutation<Coupon, Error, CreateCouponRequest>({
        mutationFn: async (data: CreateCouponRequest): Promise<Coupon> => {
            return await createCoupon(data);
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
            return await updateCoupon(id, data);
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
            return await deleteCoupon(id);
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


