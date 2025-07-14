import api from "@/lib/axios";
import type { InvoicesResponse } from "@/types/PaymentHistory";
import { useQuery } from "@tanstack/react-query";

export function useAdminPaymentHistory() {
  return useQuery<InvoicesResponse>({
    queryKey: ["admin-payment-history"],
    queryFn: async () => {
      const { data } = await api.get("/invoices");
      return data;
    },
  });
}
