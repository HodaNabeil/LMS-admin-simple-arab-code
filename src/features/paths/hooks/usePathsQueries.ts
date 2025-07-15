import api from "@/lib/axios";
import { pathKeys } from "@/lib/query-keys";
import type { PathResponse } from "@/types/path";
import { useQuery } from "@tanstack/react-query";

export function usePaths() {
  return useQuery<PathResponse>({
    queryKey: pathKeys.all,
    queryFn: async (): Promise<PathResponse> => {
      const { data } = await api.get<PathResponse>("/paths");
      return data;
    },
  });
}
