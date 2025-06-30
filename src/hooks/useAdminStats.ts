import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import type { AdminStats } from "@/types/stats";

export function useAdminStats() {
  return useQuery<AdminStats>({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const { data } = await api.get("/stats");
      return data;
    },
  });
}
