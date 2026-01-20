import { tracksApi } from "../services/tracksApi";
import { tracksKeys } from "@/lib/query-keys";
import type { GetTrackResponse, GetTracksResponse } from "@/types/tracks";
import { useQuery } from "@tanstack/react-query";

export function useAllTracks() {
  return useQuery<GetTracksResponse['data']['tracks']>({
    queryKey: tracksKeys.all,
    queryFn: async (): Promise<GetTracksResponse['data']['tracks']> => {
      return tracksApi.getAllTracks();
    },
  });
}

export function useTrack(slug: string | undefined) {
  return useQuery<GetTrackResponse>({
    queryKey: tracksKeys.detail(slug || ""),
    queryFn: async (): Promise<GetTrackResponse> => {
      if (!slug) throw new Error("Slug is required");
      return await tracksApi.getTrack(slug);
    },
    enabled: !!slug,

  });
}
