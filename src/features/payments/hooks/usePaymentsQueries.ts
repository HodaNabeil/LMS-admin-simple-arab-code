


import { ordersKeys } from "@/lib/query-keys";
import { useQuery } from "@tanstack/react-query";
import { paymentApi } from "../services/paymentApi";
import type { ListPaymentsResponse, GetPaymentResponse } from "@/types/payments";

export function usePayments() {
    return useQuery<ListPaymentsResponse>({
        queryKey: ordersKeys.all,
        queryFn: async (): Promise<ListPaymentsResponse> => {
            return await paymentApi.getAllPayments();
        },

    });
}

export function usePayment(id: string | undefined) {
    return useQuery<GetPaymentResponse>({
        queryKey: ordersKeys.detail(id || ""),
        queryFn: async (): Promise<GetPaymentResponse> => {
            if (!id) throw new Error("ID is required");
            return await paymentApi.getPayment(id);
        },
        enabled: !!id,

    });
}
