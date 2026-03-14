import { api } from "@/lib/axios";
import { TRACKS_ENDPOINTS } from "@/constants/path";
import type {
  CreateTrackRequest,
  CreateTrackResponse,
  UpdateTrackRequest,
  UpdateTrackResponse,
  ListTracksResponse,
  GetTrackResponse,
  DeleteTrackResponse,
} from "@/types/tracks";

export async function getAllTracks(): Promise<ListTracksResponse> {
  const response = await api.get<ListTracksResponse>(TRACKS_ENDPOINTS.LIST);
  return response.data;
}

export async function getTrack(slug: string): Promise<GetTrackResponse> {
  const response = await api.get<GetTrackResponse>(
    TRACKS_ENDPOINTS.DETAIL.replace("{idOrSlug}", slug),
  );
  return response.data;
}

export async function createTrack(data: CreateTrackRequest): Promise<CreateTrackResponse> {
  const response = await api.post<CreateTrackResponse>(
    TRACKS_ENDPOINTS.CREATE,
    data,
  );
  return response.data;
}

export async function updateTrack(
  slug: string,
  data: UpdateTrackRequest,
): Promise<UpdateTrackResponse> {
  const response = await api.patch<UpdateTrackResponse>(
    TRACKS_ENDPOINTS.UPDATE.replace("{idOrSlug}", slug),
    data,
  );
  return response.data;
}

export async function deleteTrack(slug: string): Promise<DeleteTrackResponse> {
  const response = await api.delete<DeleteTrackResponse>(
    TRACKS_ENDPOINTS.DELETE.replace("{idOrSlug}", slug),
  );
  return response.data;
}
