import { api } from "@/lib/axios";
import { COUPON_ENDPOINTS } from "@/constants/coupons";
import type { CouponsResponse, CreateCouponRequest, UpdateCouponRequest, Coupon } from "@/types/course";

export const couponApi = {
  async getAllCoupons(): Promise<CouponsResponse> {
    const response = await api.get(COUPON_ENDPOINTS.LIST);
    return response.data;
  },

  async createCoupon(data: CreateCouponRequest): Promise<Coupon> {
    const response = await api.post(COUPON_ENDPOINTS.CREATE, data);
    return response.data;
  },

  async updateCoupon(id: string, data: UpdateCouponRequest): Promise<Coupon> {
    const response = await api.patch(COUPON_ENDPOINTS.UPDATE.replace("{id}", id), data);
    return response.data;
  },

  async deleteCoupon(id: string): Promise<void> {
    await api.delete(COUPON_ENDPOINTS.DELETE.replace("{id}", id));
  },
};
