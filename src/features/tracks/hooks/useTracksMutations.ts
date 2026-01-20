import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { toast } from "sonner";
import { handleApiError } from "@/lib/error-handler";
import type { CreateTrackRequest, CreateTrackResponse, DeleteTrackResponse, UpdateTrackRequest, UpdateTrackResponse } from "@/types/tracks";
import { tracksApi } from "../services/tracksApi";

export function useCreateTrack() {
    const queryClient = useQueryClient();
    return useMutation<CreateTrackResponse, Error, CreateTrackRequest>({
        mutationFn: async (data: CreateTrackRequest): Promise<CreateTrackResponse> => {
            return await tracksApi.createTrack(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.tracks.all });
            toast.success("تم إنشاء المسار بنجاح");
        },
        onError: (error) => {
            handleApiError(error, "فشل إنشاء المسار");
        },
    });
}

export function useUpdateTrack({ slug }: { slug: string }) {
    return useMutation<UpdateTrackResponse, Error, UpdateTrackRequest>({
        mutationFn: async (data: UpdateTrackRequest): Promise<UpdateTrackResponse> => {
            return await tracksApi.updateTrack(slug, data);
        },
        onSuccess: () => {
            toast.success("تم تحديث المسار بنجاح");
        },
        onError: (error) => {
            handleApiError(error, "فشل تحديث المسار");
        },
    });
}

export function useDeleteTrack() {
    return useMutation<DeleteTrackResponse, Error, string>({
        mutationFn: async (slug: string): Promise<DeleteTrackResponse> => {
            return await tracksApi.deleteTrack(slug);
        },
        onSuccess: () => {
            toast.success("تم حذف المسار بنجاح");
        },
        onError: (error) => {
            handleApiError(error, "فشل حذف المسار");
        },
    });
}
