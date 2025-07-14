import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import { queryKeys } from "@/lib/query-keys";
import type { UserResponse } from "@/types/user";

export function useUsers() {
  return useQuery({
    queryKey: queryKeys.users.all,
    queryFn: async (): Promise<UserResponse> => {
      const { data } = await api.get("/users");
      return data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes // how long cached data is considered "fresh" before React Query marks it as stale.
    gcTime: 10 * 60 * 1000, // 10 minutes how long inactive cached data stays in memory before being garbage collected.
  });
}
