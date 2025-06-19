import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";

export function useAnnualRevenue() {
  return useQuery({
    queryKey: ["annual-revenue"],
    queryFn: async () => {
      const { data } = await api.get("/revenue/annual");
      return data;
    },
  });
}
