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

export const tracksApi = {
  async getAllTracks(): Promise<ListTracksResponse> {
    const response = await api.get<ListTracksResponse>(TRACKS_ENDPOINTS.LIST);
    return response.data;
  },

  async getTrack(slug: string): Promise<GetTrackResponse> {
    const response = await api.get<GetTrackResponse>(
      TRACKS_ENDPOINTS.DETAIL.replace("{idOrSlug}", slug)
    );
    return response.data;
  },

  async createTrack(data: CreateTrackRequest): Promise<CreateTrackResponse> {
    const response = await api.post<CreateTrackResponse>(
      TRACKS_ENDPOINTS.CREATE,
      data
    );
    return response.data;
  },

  async updateTrack(
    slug: string,
    data: UpdateTrackRequest
  ): Promise<UpdateTrackResponse> {
    const response = await api.put<UpdateTrackResponse>(
      TRACKS_ENDPOINTS.UPDATE.replace("{idOrSlug}", slug),
      data
    );
    return response.data;
  },

  async deleteTrack(slug: string): Promise<DeleteTrackResponse> {
    const response = await api.delete<DeleteTrackResponse>(
      TRACKS_ENDPOINTS.DELETE.replace("{idOrSlug}", slug),
      {
        data: slug,
      }
    );
    return response.data;
  },
};
