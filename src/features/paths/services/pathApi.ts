import { api } from "@/lib/axios";
import { PATH_ENDPOINTS } from "@/constants/path";
import type {
  CreatePathRequest,
  CreatePathResponse,
  UpdatePathRequest,
  UpdatePathResponse,
  GetPathsResponse,
  GetPathResponse,
  DeletePathResponse,
} from "@/types/path";

export const pathApi = {
  // Get all paths
  async getAllPaths(): Promise<GetPathsResponse> {
    const response = await api.get<GetPathsResponse>(PATH_ENDPOINTS.LIST);
    return response.data;
  },

  // Get single path by slug
  async getPath(slug: string): Promise<GetPathResponse> {
    const response = await api.get<GetPathResponse>(
      PATH_ENDPOINTS.DETAIL.replace("{idOrSlug}", slug)
    );
    return response.data;
  },

  // Create new path
  async createPath(data: CreatePathRequest): Promise<CreatePathResponse> {
    const response = await api.post<CreatePathResponse>(
      PATH_ENDPOINTS.CREATE,
      data
    );
    return response.data;
  },

  // Update existing path
  async updatePath(
    slug: string,
    data: UpdatePathRequest
  ): Promise<UpdatePathResponse> {
    const response = await api.patch<UpdatePathResponse>(
      PATH_ENDPOINTS.UPDATE.replace("{idOrSlug}", slug),
      data
    );
    return response.data;
  },

  // Delete path
  async deletePath(slug: string): Promise<DeletePathResponse> {
    const response = await api.delete<DeletePathResponse>(
      PATH_ENDPOINTS.DELETE.replace("{idOrSlug}", slug),
      {
        data: slug,
      }
    );
    return response.data;
  },
};
