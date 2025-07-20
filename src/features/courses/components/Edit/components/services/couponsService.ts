import api from "@/lib/axios";
import type { CouponsResponse, Coupon } from "@/types/course";

export const couponsService = {
  // جلب جميع الكوبونات (النشطة والمنتهية)
  getAllCoupons: async (): Promise<CouponsResponse> => {
    const response = await api.get("/coupons");
    return response.data;
  },

  // إنشاء كوبون جديد
  createCoupon: async (couponData: Omit<Coupon, 'id' | 'createdAt' | 'uses' | 'isActive'>): Promise<Coupon> => {
    const response = await api.post("/coupons", couponData);
    return response.data;
  },

  // حذف كوبون
  deleteCoupon: async (id: string): Promise<void> => {
    await api.delete(`/coupons/${id}`);
  },

  // تحديث كوبون
  updateCoupon: async (id: string, couponData: Partial<Coupon>): Promise<Coupon> => {
    const response = await api.put(`/coupons/${id}`, couponData);
    return response.data;
  }
}; 