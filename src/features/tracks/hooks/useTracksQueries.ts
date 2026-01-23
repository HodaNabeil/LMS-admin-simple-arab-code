import { tracksApi } from "../services/tracksApi";
import { tracksKeys } from "@/lib/query-keys";
import type { GetTrackResponse, ListTracksResponse } from "@/types/tracks";
import { useQuery } from "@tanstack/react-query";

export function useTracks() {
  return useQuery<ListTracksResponse>({
    queryKey: tracksKeys.all,
    queryFn: async (): Promise<ListTracksResponse> => {
      return tracksApi.getAllTracks();
    },
  });
}

export function useAllTracks() {
  return useTracks();
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
