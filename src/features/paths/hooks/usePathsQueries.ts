import { pathApi } from "../services/pathApi";
import { pathsKeys } from "@/lib/query-keys";
import type { GetPathsResponse, GetPathResponse } from "@/types/path";
import { useQuery } from "@tanstack/react-query";

export function usePaths() {
  return useQuery<GetPathsResponse>({
    queryKey: pathsKeys.all,
    queryFn: async (): Promise<GetPathsResponse> => {
      return await pathApi.getAllPaths();
    },

  });
}

export function usePath(slug: string | undefined) {
  return useQuery<GetPathResponse>({
    queryKey: pathsKeys.detail(slug || ""),
    queryFn: async (): Promise<GetPathResponse> => {
      if (!slug) throw new Error("Slug is required");
      return await pathApi.getPath(slug);
    },
    enabled: !!slug,

  });
}
