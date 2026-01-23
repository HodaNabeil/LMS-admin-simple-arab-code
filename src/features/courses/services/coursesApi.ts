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
} from "@/types/course";

export const coursesApi = {
    // Get all courses
    async getAllCourses(): Promise<GetCoursesResponse> {
        const response = await api.get<GetCoursesResponse>(COURSE_ENDPOINTS.LIST);
        return response.data;
    },

    // Get single course by slug
    async getCourse(slug: string): Promise<GetCourseResponse> {
        const response = await api.get<GetCourseResponse>(
            COURSE_ENDPOINTS.DETAIL.replace("{idOrSlug}", slug)
        );
        return response.data;
    },

    // Create new course
    async createCourse(data: CreateCourseRequest): Promise<CreateCourseResponse> {

        const response = await api.post<CreateCourseResponse>(
            COURSE_ENDPOINTS.CREATE,
            data
        );
        return response.data;
    },

    // Update existing course
    async updateCourse(
        slug: string,
        data: UpdateCourseRequest
    ): Promise<UpdateCourseResponse> {
        const response = await api.patch<UpdateCourseResponse>(
            COURSE_ENDPOINTS.UPDATE.replace("{idOrSlug}", slug),
            data
        );
        return response.data;
    },

    // Upload course media
    async uploadCourseMedia(slug: string, thumbnail: File, previewVideo?: File): Promise<any> {
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
            }
        );
        return response.data;
    },

    // Delete course
    async deleteCourse(slug: string): Promise<DeleteCourseResponse> {
        const response = await api.delete<DeleteCourseResponse>(
            COURSE_ENDPOINTS.DELETE.replace("{idOrSlug}", slug),
            {
                data: slug, // Some APIs expect data even for delete, mirroring pathApi
            }
        );
        return response.data;
    },
};
