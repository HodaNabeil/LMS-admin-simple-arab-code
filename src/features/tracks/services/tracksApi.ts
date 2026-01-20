import { api } from "@/lib/axios";
import { appendFormData } from "@/lib/formdata";
import { TRACKS_ENDPOINTS } from "@/constants/path";
import type {
  CreateTrackRequest,
  CreateTrackResponse,
  UpdateTrackRequest,
  UpdateTrackResponse,
  GetTracksResponse,
  GetTrackResponse,
  DeleteTrackResponse,
  ApiResponse,
} from "@/types/tracks";

export const tracksApi = {
  async getAllTracks(): Promise<GetTracksResponse['data']['tracks']> {
    const response = await api.get<GetTracksResponse>(TRACKS_ENDPOINTS.LIST);
    return response.data.data.tracks;
  },

  async getTrack(slug: string): Promise<GetTrackResponse> {
    const response = await api.get<ApiResponse<GetTrackResponse>>(
      TRACKS_ENDPOINTS.DETAIL.replace("{idOrSlug}", slug)
    );
    return response.data.data;
  },

  async createTrack(data: CreateTrackRequest): Promise<CreateTrackResponse> {
    const formData = new FormData();
    appendFormData(formData, {
      ...data,
    });
    const response = await api.post<CreateTrackResponse>(
      TRACKS_ENDPOINTS.CREATE,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  },

  async updateTrack(
    slug: string,
    data: UpdateTrackRequest
  ): Promise<UpdateTrackResponse> {
    const formData = new FormData();
    appendFormData(formData, {
      ...data,
    });
    const response = await api.put<UpdateTrackResponse>(
      TRACKS_ENDPOINTS.UPDATE.replace("{idOrSlug}", slug),
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
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
