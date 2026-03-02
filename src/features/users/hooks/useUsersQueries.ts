import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { userApi } from "../services/userApi";
import type { UserFilters } from "@/types/user";

/**
 * Hook to fetch users list with optional filters
 * Supports search by name/email, role filtering, pagination, and sorting
 */
export function useUsers(filters?: UserFilters) {
  return useQuery({
    queryKey: queryKeys.users.list(filters),
    queryFn: () => userApi.getAllUsers(filters),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}
