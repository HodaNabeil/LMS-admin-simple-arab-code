import { paymentsKeys } from "@/lib/query-keys";
import { useQuery } from "@tanstack/react-query";
import { getAllPayments, getPayment } from "../services/paymentApi";
import type { ListPaymentsResponse, GetPaymentResponse } from "@/types/payments";

export function usePayments() {
    return useQuery<ListPaymentsResponse>({
        queryKey: paymentsKeys.all,
        queryFn: async (): Promise<ListPaymentsResponse> => {
            return await getAllPayments();
        },

    });
}

export function usePayment(id: string | undefined) {
    return useQuery<GetPaymentResponse>({
        queryKey: paymentsKeys.detail(id || ""),
        queryFn: async (): Promise<GetPaymentResponse> => {
            if (!id) throw new Error("ID is required");
            return await getPayment(id);
        },
        enabled: !!id,

    });
}
