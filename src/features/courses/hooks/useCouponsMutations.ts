import api from "@/lib/axios";
import type { Coupon } from "@/types/course";





  // إنشاء كوبون جديد
 export const createCoupon = async (couponData: Omit<Coupon, 'id' | 'createdAt' | 'uses' | 'isActive'>): Promise<Coupon> => {
  const response = await api.post("/coupons", couponData);
  return response.data;
}

  // حذف كوبون
 export const deleteCoupon = async (id: string): Promise<void> => {
    await api.delete(`/coupons/${id}`);
  }

  // تحديث كوبون
 export const updateCoupon = async (id: string, couponData: Partial<Coupon>): Promise<Coupon> => {
    const response = await api.put(`/coupons/${id}`, couponData);
    return response.data;
  }






  