import { pathApi } from "../services/pathApi";
import { pathsKeys } from "@/lib/query-keys";
import type { Path, PathResponse } from "@/types/path";
import { useQuery } from "@tanstack/react-query";

export function usePaths() {
  return useQuery<{ paths: Path[] }>({
    queryKey: pathsKeys.all,
    queryFn: async (): Promise<{ paths: Path[] }> => {
      return await pathApi.getAllPaths();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function usePath(slug: string | undefined) {
  return useQuery<PathResponse>({
    queryKey: pathsKeys.detail(slug || ""),
    queryFn: async (): Promise<PathResponse> => {
      if (!slug) throw new Error("Slug is required");
      return await pathApi.getPath(slug);
    },
    enabled: !!slug,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}
