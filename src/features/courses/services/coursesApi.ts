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
  CouponsResponse,
  CreateCouponRequest,
  UpdateCouponRequest,
  Coupon,
} from "@/types/course";

export const coursesApi = {
  // Get all courses
  async getAllCourses(params?: CourseFilters): Promise<GetCoursesResponse> {
    const response = await api.get<GetCoursesResponse>(COURSE_ENDPOINTS.LIST, {
      params,
    });
    return response.data;
  },

  // Get courses by path
  async getCoursesByPath(
    params: GetCoursesByPathParams,
  ): Promise<GetCoursesResponse> {
    const response = await api.get<GetCoursesResponse>("/api/courses/by-path", {
      params,
    });
    return response.data;
  },

  // Get single course by slug
  async getCourse(slug: string): Promise<GetCourseResponse> {
    const response = await api.get<GetCourseResponse>(
      COURSE_ENDPOINTS.DETAIL.replace("{idOrSlug}", slug),
    );
    return response.data;
  },

  // Create new course
  async createCourse(data: CreateCourseRequest): Promise<CreateCourseResponse> {
    const response = await api.post<CreateCourseResponse>(
      COURSE_ENDPOINTS.CREATE,
      data,
    );
    return response.data;
  },

  // Update existing course
  async updateCourse(
    slug: string,
    data: UpdateCourseRequest,
  ): Promise<UpdateCourseResponse> {
    const response = await api.patch<UpdateCourseResponse>(
      COURSE_ENDPOINTS.UPDATE.replace("{idOrSlug}", slug),
      data,
    );
    return response.data;
  },

  // Upload course media
  async uploadCourseMedia(
    slug: string,
    thumbnail: File,
    previewVideo?: File,
  ): Promise<{
    thumbnail: string;
    previewVideo?: string;
  }> {
    const formData = new FormData();
    formData.append("thumbnail", thumbnail);
    if (previewVideo) {
      formData.append("previewVideo", previewVideo);
    }

    const response = await api.patch(
      COURSE_ENDPOINTS.MEDIA.replace("{idOrSlug}", slug),
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  },

  // Delete course
  async deleteCourse(slug: string): Promise<DeleteCourseResponse> {
    const response = await api.delete<DeleteCourseResponse>(
      COURSE_ENDPOINTS.DELETE.replace("{idOrSlug}", slug),
      {
        data: slug, // Some APIs expect data even for delete, mirroring pathApi
      },
    );
    return response.data;
  },

  // ============================================
  // Coupon Methods
  // ============================================

  async getAllCoupons(): Promise<CouponsResponse> {
    const response = await api.get("/api/coupons");
    return response.data;
  },

  async createCoupon(data: CreateCouponRequest): Promise<Coupon> {
    const response = await api.post("/api/coupons/create", data);
    return response.data;
  },

  async updateCoupon(id: string, data: UpdateCouponRequest): Promise<Coupon> {
    const response = await api.patch(`/api/coupons/${id}`, data);
    return response.data;
  },

  async deleteCoupon(id: string): Promise<void> {
    await api.delete(`/api/coupons/${id}`);
  },

};
