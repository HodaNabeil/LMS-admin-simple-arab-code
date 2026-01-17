import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import { queryKeys } from "@/lib/query-keys";
import type { Course } from "@/types/course";
import type { AxiosError } from "axios";

export function useCreateCourse() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (course: Partial<Course>): Promise<{ message: string }> => {
            const { data } = await api.post("/courses", course);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.courses.all });
        },
        onError: (error: AxiosError) => {
            console.error("Error creating course:", error);
        },
    });
}

export function useUpdateCourse() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (course: Partial<Course>): Promise<{ message: string }> => {
            const { data } = await api.put("/courses", course);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.courses.all });
        },
        onError: (error: AxiosError) => {
            console.error("Error updating course:", error);
        },
    });
}

export function useDeleteCourse() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (courseId: number): Promise<{ message: string }> => {
            const { data } = await api.delete(`/courses?id=${courseId}`);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.courses.all });
        },
        onError: (error: AxiosError) => {
            console.error("Error deleting course:", error);
        },
    });
}
