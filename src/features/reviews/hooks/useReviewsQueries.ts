import { useQuery } from "@tanstack/react-query";
import { reviewsKeys } from "@/lib/query-keys";
import type { GetReviewResponse, ListReviewsResponse } from "@/types/reviews";
import {
  getAllReviews,
  getCourseReviews,
  getReview,
  type GetCourseReviewsParams
} from "../services/reviewsApi";

/** Fetch all reviews globally (admin list – uses /api/reviews) */
export function useReviews() {
  return useQuery<ListReviewsResponse>({
    queryKey: reviewsKeys.lists(),
    queryFn: async (): Promise<ListReviewsResponse> => {
      return await getAllReviews();
    },
  });
}

/** Fetch reviews for a specific course (uses /api/courses/{idOrSlug}/reviews) */
export function useCourseReviews(
  idOrSlug: string | undefined,
  params?: GetCourseReviewsParams,
) {
  return useQuery<ListReviewsResponse>({
    queryKey: ["reviews", "course", idOrSlug, params],
    queryFn: async (): Promise<ListReviewsResponse> => {
      if (!idOrSlug) throw new Error("idOrSlug is required");
      return await getCourseReviews(idOrSlug, params);
    },
    enabled: !!idOrSlug,
  });
}

export function useReview(idOrSlug: string | undefined) {
  return useQuery<GetReviewResponse>({
    queryKey: reviewsKeys.detail(idOrSlug || ""),
    queryFn: async (): Promise<GetReviewResponse> => {
      if (!idOrSlug) throw new Error("idOrSlug is required");
      return await getReview(idOrSlug);
    },
    enabled: !!idOrSlug,
  });
}
