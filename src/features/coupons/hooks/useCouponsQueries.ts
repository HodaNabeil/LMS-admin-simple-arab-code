import { useQuery } from "@tanstack/react-query";
import { couponsKeys } from "@/lib/query-keys";
import type {
    CouponsResponse,
    Coupon,
} from "@/types/course";
import { getAllCoupons, getCouponById } from "../services/couponApi";

/**
 * Hook to fetch all coupons with optional search filtering
 * Supports client-side search by coupon code
 */
export function useCoupons(search?: string) {
    return useQuery<CouponsResponse>({
        queryKey: couponsKeys.lists(),
        queryFn: async (): Promise<CouponsResponse> => {
            const response = await getAllCoupons();

            // If search is provided, filter coupons client-side
            if (search && search.trim()) {
                const searchLower = search.toLowerCase().trim();
                const filteredCoupons = response.data.filter((coupon: Coupon) =>
                    coupon.code.toLowerCase().includes(searchLower)
                );

                return {
                    ...response,
                    data: filteredCoupons,
                };
            }

            return response;
        },
    });
}

/**
 * Hook to fetch a single coupon by ID
 */
export function useCoupon(id?: string) {
    return useQuery<Coupon>({
        queryKey: couponsKeys.detail(id || ""),
        queryFn: () => getCouponById(id || ""),
        enabled: !!id,
    });
}
