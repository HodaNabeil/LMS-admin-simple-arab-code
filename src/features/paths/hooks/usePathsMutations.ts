import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import {
  createPath,
  updatePath,
  deletePath
} from "@/features/paths/services/pathApi";
import { toast } from "sonner";
import { handleApiError } from "@/lib/error-handler";
import type { CreatePathRequest, CreatePathResponse, DeletePathResponse, UpdatePathRequest, UpdatePathResponse } from "@/types/path";

export function useCreatePath() {
  const queryClient = useQueryClient();
  return useMutation<CreatePathResponse, Error, CreatePathRequest>({
    mutationFn: async (data: CreatePathRequest): Promise<CreatePathResponse> => {
      return await createPath(data);
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.paths.all });
      toast.success(res.message || "تم إنشاء المسار بنجاح");
    },
    onError: (error) => {
      handleApiError(error);
    },
  });
}

export function useUpdatePath({ slug }: { slug: string }) {
  const queryClient = useQueryClient();
  return useMutation<UpdatePathResponse, Error, UpdatePathRequest>({
    mutationFn: async (data: UpdatePathRequest): Promise<UpdatePathResponse> => {
      return await updatePath(slug, data);
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.paths.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.paths.detail(slug) });
      toast.success(res.message || "تم تحديث المسار بنجاح");
    },
    onError: (error) => {
      handleApiError(error);
    },
  });
}

export function useDeletePath() {
  const queryClient = useQueryClient();
  return useMutation<DeletePathResponse, Error, string>({
    mutationFn: async (slug: string): Promise<DeletePathResponse> => {
      return await deletePath(slug);
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.paths.all });
      toast.success(res.message || "تم حذف المسار بنجاح");
    },
    onError: (error) => {
      handleApiError(error);
    },
  });
}
