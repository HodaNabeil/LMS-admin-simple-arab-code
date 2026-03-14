import { api } from "@/lib/axios";

import { COURSE_ENDPOINTS } from "@/constants/course";
import type {
  CreateCourseRequest,
  CreateCourseResponse,
  UpdateCourseRequest,
  UpdateCourseResponse,
  GetCoursesResponse,
  GetCourseResponse,
  DeleteCourseResponse,
  CourseFilters,
  GetCoursesByPathParams,

} from "@/types/course";

// Get all courses
export async function getAllCourses(params?: CourseFilters): Promise<GetCoursesResponse> {
  const response = await api.get<GetCoursesResponse>(COURSE_ENDPOINTS.LIST, {
    params,
  });
  return response.data;
}

// Get courses by path
export async function getCoursesByPath(
  params: GetCoursesByPathParams,
): Promise<GetCoursesResponse> {
  const response = await api.get<GetCoursesResponse>("/api/courses/by-path", {
    params,
  });
  return response.data;
}

// Get single course by slug
export async function getCourse(slug: string): Promise<GetCourseResponse> {
  const response = await api.get<GetCourseResponse>(
    COURSE_ENDPOINTS.DETAIL.replace("{idOrSlug}", slug),
  );
  return response.data;
}

// Create new course
export async function createCourse(data: CreateCourseRequest): Promise<CreateCourseResponse> {
  const response = await api.post<CreateCourseResponse>(
    COURSE_ENDPOINTS.CREATE,
    data,
  );
  return response.data;
}

// Update existing course
export async function updateCourse(
  slug: string,
  data: UpdateCourseRequest,
): Promise<UpdateCourseResponse> {
  const response = await api.patch<UpdateCourseResponse>(
    COURSE_ENDPOINTS.UPDATE.replace("{idOrSlug}", slug),
    data,
  );
  return response.data;
}

// Upload course media
export async function uploadCourseMedia(
  slug: string,
  thumbnail: File,
  previewVideo?: File,
): Promise<{
  thumbnail: File;
  previewVideo?: File;
}> {
  const formData = new FormData();
  formData.append("thumbnail", thumbnail);
  if (previewVideo) {
    formData.append("previewVideo", previewVideo);
  }

  const response = await api.patch<{
    thumbnail: File;
    previewVideo?: File;
  }>(
    COURSE_ENDPOINTS.MEDIA.replace("{idOrSlug}", slug),
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return response.data;
}

// Delete course
export async function deleteCourse(slug: string): Promise<DeleteCourseResponse> {
  const response = await api.delete<DeleteCourseResponse>(
    COURSE_ENDPOINTS.DELETE.replace("{idOrSlug}", slug),
    {
      data: slug, // Some APIs expect data even for delete, mirroring pathApi
    },
  );
  return response.data;
}
