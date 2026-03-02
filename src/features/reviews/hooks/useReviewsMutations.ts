
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reviewsKeys } from "@/lib/query-keys";
import { toast } from "sonner";
import { handleApiError } from "@/lib/error-handler";
import type {
  CreateReviewRequest,
  CreateReviewResponse,
  DeleteReviewResponse,
  UpdateReviewRequest,
  UpdateReviewResponse,
} from "@/types/reviews";
import { reviewsApi } from "../services/reviewsApi";

export function useCreateReview() {
  const queryClient = useQueryClient();

  return useMutation<CreateReviewResponse, Error, CreateReviewRequest>({
    mutationFn: async (data: CreateReviewRequest): Promise<CreateReviewResponse> => {
      return await reviewsApi.createReview(data);
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: reviewsKeys.all });
      toast.success(res.message || "تم إنشاء المراجعة بنجاح");
    },
    onError: (error) => {
      handleApiError(error);
    },
  });
}

export function useCreateCourseReview() {
  const queryClient = useQueryClient();

  return useMutation<
    CreateReviewResponse,
    Error,
    { courseSlug: string; data: { rating: number; comment: string } }
  >({
    mutationFn: async ({ courseSlug, data }): Promise<CreateReviewResponse> => {
      return await reviewsApi.createCourseReview(courseSlug, data);
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: reviewsKeys.all });
      toast.success(res.message || "تم إنشاء مراجعة الدورة بنجاح");
    },
    onError: (error) => {
      handleApiError(error);
    },
  });
}

export function useUpdateReview() {
  const queryClient = useQueryClient();

  return useMutation<
    UpdateReviewResponse,
    Error,
    { idOrSlug: string; data: UpdateReviewRequest }
  >({
    mutationFn: async ({ idOrSlug, data }): Promise<UpdateReviewResponse> => {
      return await reviewsApi.updateReview(idOrSlug, data);
    },
    onSuccess: (res, variables) => {
      queryClient.invalidateQueries({ queryKey: reviewsKeys.all });
      queryClient.invalidateQueries({
        queryKey: reviewsKeys.detail(variables.idOrSlug),
      });
      toast.success(res.message || "تم تحديث المراجعة بنجاح");
    },
    onError: (error) => {
      handleApiError(error);
    },
  });
}

export function useDeleteReview() {
  const queryClient = useQueryClient();

  return useMutation<DeleteReviewResponse, Error, string>({
    mutationFn: async (idOrSlug: string): Promise<DeleteReviewResponse> => {
      return await reviewsApi.deleteReview(idOrSlug);
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: reviewsKeys.all });
      toast.success(res.message || "تم حذف المراجعة بنجاح");
    },
    onError: (error) => {
      handleApiError(error);
    },
  });
}
