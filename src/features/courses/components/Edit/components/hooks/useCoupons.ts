import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { couponsService } from "../services/couponsService";
import type { Coupon } from "@/types/course";
import { toast } from "sonner";

export const useCoupons = () => {
  const queryClient = useQueryClient();

  // جلب جميع الكوبونات
  const {
    data: coupons,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ["coupons"],
    queryFn: couponsService.getAllCoupons,
  });

  // إنشاء كوبون جديد
  const createCouponMutation = useMutation({
    mutationFn: couponsService.createCoupon,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
      toast.success("تم إنشاء الكوبون بنجاح");
    },
    onError: (error) => {
      toast.error("فشل في إنشاء الكوبون");
      console.error("Create coupon error:", error);
    },
  });

  // حذف كوبون
  const deleteCouponMutation = useMutation({
    mutationFn: couponsService.deleteCoupon,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
      toast.success("تم حذف الكوبون بنجاح");
    },
    onError: (error) => {
      toast.error("فشل في حذف الكوبون");
      console.error("Delete coupon error:", error);
    },
  });

  // تحديث كوبون
  const updateCouponMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Coupon> }) =>
      couponsService.updateCoupon(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
      toast.success("تم تحديث الكوبون بنجاح");
    },
    onError: (error) => {
      toast.error("فشل في تحديث الكوبون");
      console.error("Update coupon error:", error);
    },
  });

  return {
    coupons,
    isLoading,
    error,
    refetch,
    createCoupon: createCouponMutation.mutate,
    deleteCoupon: deleteCouponMutation.mutate,
    updateCoupon: updateCouponMutation.mutate,
    isCreating: createCouponMutation.isPending,
    isDeleting: deleteCouponMutation.isPending,
    isUpdating: updateCouponMutation.isPending,
  };
}; 