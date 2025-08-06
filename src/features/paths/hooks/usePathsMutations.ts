import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import {
  pathApi,
  type PathMutationResponse,
  type PathRequest,
} from "@/features/paths/services/pathApi";
import { toast } from "sonner";
import type { AxiosError } from "axios";

export function useCreatePath() {
  const queryClient = useQueryClient();
  return useMutation<PathMutationResponse, Error, PathRequest>({
    mutationFn: async (data: PathRequest): Promise<PathMutationResponse> => {
      return await pathApi.createPath(data);
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.paths.all });
      toast.success(res.message || "Path created successfully");
    },
    onError: (error) => {
      if (error instanceof Error) {
        const axiosError = error as AxiosError<{ message: string }>;
        if (axiosError.response?.data?.message) {
          toast.error(axiosError.response.data.message);
        } else {
          toast.error("An error occurred");
        }
      } else {
        toast.error("An unexpected error occurred");
      }
    },
  });
}

export function useUpdatePath({ slug }: { slug: string }) {
  const queryClient = useQueryClient();
  return useMutation<PathMutationResponse, Error, PathRequest>({
    mutationFn: async (data: PathRequest): Promise<PathMutationResponse> => {
      return await pathApi.updatePath(data);
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.paths.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.paths.detail(slug) });
      toast.success(res.message || "Path updated successfully");
    },
    onError: (error) => {
      if (error instanceof Error) {
        const axiosError = error as AxiosError<{ message: string }>;
        if (axiosError.response?.data?.message) {
          toast.error(axiosError.response.data.message);
        } else {
          toast.error("An error occurred");
        }
      } else {
        toast.error("An unexpected error occurred");
      }
    },
  });
}

export function useDeletePath() {
  const queryClient = useQueryClient();
  return useMutation<{ message: string }, Error, string>({
    mutationFn: async (slug: string): Promise<{ message: string }> => {
      return await pathApi.deletePath(slug);
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.paths.all });
      toast.success(res.message || "Path deleted successfully");
    },
    onError: (error) => {
      const axiosError = error as AxiosError<{ message: string }>;
      if (axiosError.response?.data?.message) {
        toast.error(axiosError.response.data.message);
      } else {
        toast.error(error.message || "Error deleting path");
      }
      console.error("Error deleting path:", error);
    },
  });
}
