import api from "@/lib/axios";
import { pathsKeys } from "@/lib/query-keys";
import type { PathResponse } from "@/types/path";
import { useQuery } from "@tanstack/react-query";

export function usePaths() {
  return useQuery<PathResponse>({
    queryKey: pathsKeys.all,
    queryFn: async (): Promise<PathResponse> => {
      const { data } = await api.get<PathResponse>("/paths");
      return data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}
