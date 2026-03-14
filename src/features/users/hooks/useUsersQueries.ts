import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { getAllUsers } from "../services/userApi";
import type { UserFilters, UserListResponse } from "@/types/user";

/**
 * Hook to fetch users list with optional filters
 * Supports search by name/email, role filtering, pagination, and sorting
 */
export function useUsers(filters?: UserFilters) {
  return useQuery<UserListResponse>({
    queryKey: queryKeys.users.list(filters),
    queryFn: async (): Promise<UserListResponse> => {
      return await getAllUsers(filters);
    },
  });
}
