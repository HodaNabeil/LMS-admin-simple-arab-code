import api from "@/lib/axios";
import type { CouponsResponse } from "@/types/course";

export const getAllCoupons = async (): Promise<CouponsResponse> => {
  const response = await api.get("/coupons");
  return response.data;
}




