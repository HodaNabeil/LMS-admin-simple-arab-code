
import { useQuery } from "@tanstack/react-query";
import { reviewsKeys } from "@/lib/query-keys";
import type { GetReviewResponse, ListReviewsResponse } from "@/types/reviews";
import { reviewsApi } from "../services/reviewsApi";

export function useReviews() {
  return useQuery<ListReviewsResponse>({
    queryKey: reviewsKeys.lists(),
    queryFn: async (): Promise<ListReviewsResponse> => {
      return await reviewsApi.getAllReviews();
    },
  });
}

export function useAllReviews() {
  return useReviews();
}

export function useReview(idOrSlug: string | undefined) {
  return useQuery<GetReviewResponse>({
    queryKey: reviewsKeys.detail(idOrSlug || ""),
    queryFn: async (): Promise<GetReviewResponse> => {
      if (!idOrSlug) throw new Error("idOrSlug is required");
      return await reviewsApi.getReview(idOrSlug);
    },
    enabled: !!idOrSlug,
  });
}
