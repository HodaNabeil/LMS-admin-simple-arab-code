import { useMutation, useQueryClient } from "@tanstack/react-query";
import { curriculumKeys } from "@/lib/query-keys";
import { toast } from "sonner";
import { handleApiError } from "@/lib/error-handler";
import type {
    CreateSectionRequest,
    UpdateSectionRequest,
    Section,
    Lecture,
    CreateLectureRequest,
    UpdateLectureRequest
} from "@/types/curriculum";
import { curriculumApi } from "@/features/courses/services/curriculumApi";
import { useParams } from "react-router-dom";

export function useCreateSection() {
    const queryClient = useQueryClient();
    const { slug } = useParams<{ slug: string }>();
    const courseSlug = slug as string;

    return useMutation<Section, Error, CreateSectionRequest>({
        mutationFn: async (data: CreateSectionRequest): Promise<Section> => {
            return await curriculumApi.createSection(courseSlug, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: curriculumKeys.sections(courseSlug) });
            toast.success("تم إنشاء القسم بنجاح");
        },
        onError: (error) => {
            handleApiError(error);
        },
    });
}

export function useUpdateSection() {
    const queryClient = useQueryClient();
    const { slug } = useParams<{ slug: string }>();
    const courseSlug = slug as string;

    return useMutation<Section, Error, { id: string; data: UpdateSectionRequest }>({
        mutationFn: async ({ id, data }): Promise<Section> => {
            return await curriculumApi.updateSection(courseSlug, id, data);
        },
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: curriculumKeys.sections(courseSlug) });
            queryClient.invalidateQueries({ queryKey: curriculumKeys.sectionDetail(courseSlug, id) });
            toast.success("تم تحديث القسم بنجاح");
        },
        onError: (error) => {
            handleApiError(error);
        },
    });
}

export function useDeleteSection() {
    const queryClient = useQueryClient();
    const { slug } = useParams<{ slug: string }>();
    const courseSlug = slug as string;

    return useMutation<void, Error, string>({
        mutationFn: async (id: string): Promise<void> => {
            return await curriculumApi.deleteSection(courseSlug, id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: curriculumKeys.sections(courseSlug) });
            toast.success("تم حذف القسم بنجاح");
        },
        onError: (error) => {
            handleApiError(error);
        },
    });
}


// lectures
export function useCreateLecture() {
    const queryClient = useQueryClient();
    const { slug } = useParams<{ slug: string }>();
    const courseSlug = slug as string;

    return useMutation<Lecture, Error, { sectionId: string; data: CreateLectureRequest }>({
        mutationFn: async ({ sectionId, data }) => {
            return await curriculumApi.createLecture(sectionId, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: curriculumKeys.sections(courseSlug) });
            toast.success("تم إنشاء الدرس بنجاح");
        },
        onError: (error) => {
            handleApiError(error);
        },
    });
}

export function useUpdateLecture() {
    const queryClient = useQueryClient();
    const { slug } = useParams<{ slug: string }>();
    const courseSlug = slug as string;

    return useMutation<Lecture, Error, { id: string; data: UpdateLectureRequest }>({
        mutationFn: async ({ id, data }) => {
            return await curriculumApi.updateLecture(id, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: curriculumKeys.sections(courseSlug) });
            toast.success("تم تحديث الدرس بنجاح");
        },
        onError: (error) => {
            handleApiError(error);
        },
    });
}

export function useDeleteLecture() {
    const queryClient = useQueryClient();
    const { slug } = useParams<{ slug: string }>();
    const courseSlug = slug as string;

    return useMutation<void, Error, string>({
        mutationFn: async (id: string) => {
            return await curriculumApi.deleteLecture(id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: curriculumKeys.sections(courseSlug) });
            toast.success("تم حذف الدرس بنجاح");
        },
        onError: (error) => {
            handleApiError(error);
        },
    });
}


