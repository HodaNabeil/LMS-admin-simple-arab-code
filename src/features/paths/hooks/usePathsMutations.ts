import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import { queryKeys } from "@/lib/query-keys";
import type { Path } from "@/types/path";
import { toast } from "sonner";
import type { AxiosError } from "axios";

type CreatePathData = Omit<Path, "id" | "createdAt" | "updatedAt" | "order">;
type UpdatePathData = Omit<Path, "createdAt" | "updatedAt" | "order">;

// Types for mutation operations
type PathMutationResponse = { path: Path; message?: string };

export function useCreatePath() {
  const queryClient = useQueryClient();
  return useMutation<PathMutationResponse, Error, CreatePathData>({
    mutationFn: async (path: CreatePathData): Promise<PathMutationResponse> => {
      const { data } = await api.post<PathMutationResponse>("/paths", path);
      return data;
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

export function useUpdatePath() {
  const queryClient = useQueryClient();
  return useMutation<PathMutationResponse, Error, UpdatePathData>({
    mutationFn: async (path: UpdatePathData): Promise<PathMutationResponse> => {
      const { data } = await api.put<PathMutationResponse>("/paths", path);
      return data;
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.paths.all });
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
    mutationFn: async (pathId: string): Promise<{ message: string }> => {
      const { data } = await api.delete<{ message: string }>("/paths", {
        data: { id: pathId },
      });
      return data;
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.paths.all });
      toast.success(res.message || "Path deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Error deleting path");
      console.error("Error deleting path:", error);
    },
  });
}
