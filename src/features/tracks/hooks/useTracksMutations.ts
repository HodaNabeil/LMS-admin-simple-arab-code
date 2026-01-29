import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import { toast } from 'sonner';
import { handleApiError } from '@/lib/error-handler';
import type {
  CreateTrackRequest,
  CreateTrackResponse,
  DeleteTrackResponse,
  UpdateTrackRequest,
  UpdateTrackResponse,
} from '@/types/tracks';
import { tracksApi } from '../services/tracksApi';

export function useCreateTrack() {
  const queryClient = useQueryClient();
  return useMutation<CreateTrackResponse, Error, CreateTrackRequest>({
    mutationFn: async (
      data: CreateTrackRequest,
    ): Promise<CreateTrackResponse> => {
      return await tracksApi.createTrack(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tracks.all });
      toast.success('تم إنشاء التراك بنجاح');
    },
    onError: (error) => {
      handleApiError(error);
    },
  });
}

export function useUpdateTrack() {
  const queryClient = useQueryClient();
  return useMutation<
    UpdateTrackResponse,
    Error,
    { slug: string; data: UpdateTrackRequest }
  >({
    mutationFn: async ({ slug, data }): Promise<UpdateTrackResponse> => {
      return await tracksApi.updateTrack(slug, data);
    },
    onSuccess: (res, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tracks.all });
      queryClient.invalidateQueries({
        queryKey: queryKeys.tracks.detail(variables.slug),
      });
      toast.success(res.message || 'تم تحديث التراك بنجاح');
    },
    onError: (error) => {
      handleApiError(error);
    },
  });
}
export function useDeleteTrack() {
  const queryClient = useQueryClient();
  return useMutation<DeleteTrackResponse, Error, string>({
    mutationFn: async (slug: string): Promise<DeleteTrackResponse> => {
      return await tracksApi.deleteTrack(slug);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tracks.all });
      toast.success('تم حذف التراك بنجاح');
    },
    onError: (error) => {
      handleApiError(error);
    },
  });
}
