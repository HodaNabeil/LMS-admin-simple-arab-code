import { api } from "@/lib/axios";
import { appendFormData } from "@/lib/formdata";
import type { Path, PathResponse } from "@/types/path";

// Types for API requests and responses
export interface PathRequest {
  title: string;
  slug: string;
  summary: string;
  description: string;
  thumbnailUrl?: string;
  parentId?: string;
  icon?: string;
  metatitle?: string;
  metaDescription?: string;
  roadmap?: File | string;
  image?: File | string;
}

export interface PathMutationResponse {
  path: Path;
  message?: string;
}

export const pathApi = {
  // Get all paths
  async getAllPaths(): Promise<{ paths: Path[] }> {
    const response = await api.get<{ paths: Path[] }>("/paths");
    return response.data;
  },

  // Get single path by slug
  async getPath(slug: string): Promise<PathResponse> {
    const response = await api.get<PathResponse>(`/paths/${slug}`);
    return response.data;
  },

  // Create new path
  async createPath(data: PathRequest): Promise<PathMutationResponse> {
    const formData = new FormData();
    appendFormData(formData, {
      ...data,
    });
    const response = await api.post<PathMutationResponse>("/paths", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  // Update existing path
  async updatePath(data: PathRequest): Promise<PathMutationResponse> {
    const formData = new FormData();
    appendFormData(formData, {
      ...data,
    });
    const response = await api.put<PathMutationResponse>(
      `/paths/${data.slug}`,
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
  async deletePath(slug: string): Promise<{ message: string }> {
    const response = await api.delete<{ message: string }>(`/paths/${slug}`, {
      data: slug,
    });
    return response.data;
  },
};
