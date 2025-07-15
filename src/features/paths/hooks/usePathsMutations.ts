import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import { queryKeys } from "@/lib/query-keys";
import type { Path } from "@/types/path";
import { toast } from "sonner";

// Types for mutation operations
type PathMutationResponse = { path: Path; message?: string };

export function useCreatePath() {
  const queryClient = useQueryClient();
  return useMutation<PathMutationResponse, Error, Path>({
    mutationFn: async (path: Path): Promise<PathMutationResponse> => {
      const { data } = await api.post<PathMutationResponse>("/paths", {
        data: path,
      });
      return data;
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.paths.all });
      toast.success(res.message || "Path created successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Error creating path");
      console.error("Error creating path:", error);
    },
  });
}

export function useUpdatePath() {
  const queryClient = useQueryClient();
  return useMutation<PathMutationResponse, Error, Path>({
    mutationFn: async (path: Path): Promise<PathMutationResponse> => {
      const { data } = await api.put<PathMutationResponse>("/paths", path);
      return data;
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.paths.all });
      toast.success(res.message || "Path updated successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Error updating path");
      console.error("Error updating path:", error);
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
