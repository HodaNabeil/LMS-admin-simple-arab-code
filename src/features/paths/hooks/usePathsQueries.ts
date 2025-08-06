import api from "@/lib/axios";
import { pathsKeys } from "@/lib/query-keys";
import type { PathResponse, Path } from "@/types/path";
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

export function usePath(slug: string | undefined) {
  return useQuery<Path>({
    queryKey: pathsKeys.detail(slug || ""),
    queryFn: async (): Promise<Path> => {
      const { data } = await api.get<Path>(`/paths/${slug}`);
      return data;
    },
    enabled: !!slug,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}
