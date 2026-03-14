import { api } from "@/lib/axios";
import { COUPON_ENDPOINTS } from "@/constants/coupons";
import type { CouponsResponse, CreateCouponRequest, UpdateCouponRequest, Coupon } from "@/types/course";

export async function getAllCoupons(): Promise<CouponsResponse> {
    const response = await api.get(COUPON_ENDPOINTS.LIST);
    return response.data;
}

export async function getCouponById(id: string): Promise<Coupon> {
    const url = COUPON_ENDPOINTS.UPDATE.replace("{id}", id);
    const response = await api.get(url);
    return response.data.data;
}

export async function createCoupon(data: CreateCouponRequest): Promise<Coupon> {
    const response = await api.post(COUPON_ENDPOINTS.CREATE, data);
    return response.data;
}

export async function updateCoupon(id: string, data: UpdateCouponRequest): Promise<Coupon> {
    const response = await api.patch(COUPON_ENDPOINTS.UPDATE.replace("{id}", id), data);
    return response.data;
}

export async function deleteCoupon(id: string): Promise<void> {
    await api.delete(COUPON_ENDPOINTS.DELETE.replace("{id}", id));
}
