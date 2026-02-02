import { useQuery } from "@tanstack/react-query";
import { couponsKeys } from "@/lib/query-keys";
import type {
  CouponsResponse,
} from "@/types/course";
import { couponApi } from "../../../services/cuponApi";

export function useCoupons() {
  return useQuery<CouponsResponse>({
    queryKey: couponsKeys.lists(),
    queryFn: async (): Promise<CouponsResponse> => {
      return await couponApi.getAllCoupons();
    },
  });
}

