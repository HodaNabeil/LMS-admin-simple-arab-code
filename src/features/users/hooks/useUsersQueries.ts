import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import { queryKeys } from "@/lib/query-keys";
import type {
  UserListResponse,
  UserListData,
  UserFilters,
} from "@/types/user";

/**
 * Hook to fetch users list with optional filters
 * Supports search by name/email, role filtering, pagination, and sorting
 */
export function useUsers(filters?: UserFilters) {
  return useQuery({
    queryKey: queryKeys.users.list(filters),
    queryFn: async (): Promise<UserListData> => {
      const { data } = await api.get<UserListResponse>("/api/users", {
        params: filters,
      });
      return data.data; // Extract the data property from the wrapped response
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}
