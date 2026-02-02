import api from "@/lib/axios";
import { CURRICULUM_ENDPOINTS } from "@/constants/curriculum";
import type {
    Section,
    SectionResponse,
    CreateSectionRequest,
    UpdateSectionRequest,
    Lecture,
    CreateLectureRequest,
    UpdateLectureRequest
} from "@/types/curriculum";

export const curriculumApi = {
    async getAllSections(courseSlug: string): Promise<SectionResponse> {
        const response = await api.get(
            CURRICULUM_ENDPOINTS.LIST.replace("{courseIdOrSlug}", courseSlug)
        );
        return response.data;
    },

    async createSection(courseSlug: string, data: CreateSectionRequest): Promise<Section> {
        const response = await api.post(
            CURRICULUM_ENDPOINTS.CREATE.replace("{courseIdOrSlug}", courseSlug),
            data
        );
        return response.data;
    },

    async updateSection(courseSlug: string, id: string, data: UpdateSectionRequest): Promise<Section> {
        const response = await api.patch(
            CURRICULUM_ENDPOINTS.UPDATE
                .replace("{courseIdOrSlug}", courseSlug)
                .replace("{id}", id),
            data
        );
        return response.data;
    },

    async deleteSection(courseSlug: string, id: string): Promise<void> {
        await api.delete(
            CURRICULUM_ENDPOINTS.DELETE
                .replace("{courseIdOrSlug}", courseSlug)
                .replace("{id}", id)
        );
    },

    // Lecture Methods
    async createLecture(sectionId: string, data: CreateLectureRequest): Promise<Lecture> {
        const response = await api.post(
            CURRICULUM_ENDPOINTS.LECTURES.CREATE.replace("{sectionId}", sectionId),
            data
        );
        return response.data;
    },

    async updateLecture(id: string, data: UpdateLectureRequest): Promise<Lecture> {
        const response = await api.patch(
            CURRICULUM_ENDPOINTS.LECTURES.UPDATE.replace("{id}", id),
            data
        );
        return response.data;
    },

    async deleteLecture(id: string): Promise<void> {
        await api.delete(
            CURRICULUM_ENDPOINTS.LECTURES.DELETE.replace("{id}", id)
        );
    },
};
