import { api } from "@/lib/axios";
import { appendFormData } from "@/lib/formdata";
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
    const formData = new FormData();
    appendFormData(formData, {
      ...data,
    });
    const response = await api.post<CreatePathResponse>(
      PATH_ENDPOINTS.CREATE,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  },

  // Update existing path
  async updatePath(
    slug: string,
    data: UpdatePathRequest
  ): Promise<UpdatePathResponse> {
    const formData = new FormData();
    appendFormData(formData, {
      ...data,
    });
    const response = await api.patch<UpdatePathResponse>(
      PATH_ENDPOINTS.UPDATE.replace("{idOrSlug}", slug),
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
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
