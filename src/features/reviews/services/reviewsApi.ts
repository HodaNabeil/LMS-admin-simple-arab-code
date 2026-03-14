import { api } from "@/lib/axios";
import { REVIEWS_ENDPOINTS } from "@/constants/path";
import type {
  CreateReviewRequest,
  CreateReviewResponse,
  DeleteReviewResponse,
  GetReviewResponse,
  ListReviewsResponse,
  UpdateReviewRequest,
  UpdateReviewResponse,
} from "@/types/reviews";

export interface GetCourseReviewsParams {
  page?: number;
  limit?: number;
  rating?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

/** Fetch all reviews across all courses (admin global list) */
export async function getAllReviews(): Promise<ListReviewsResponse> {
  const response = await api.get<ListReviewsResponse>(
    REVIEWS_ENDPOINTS.LIST_ALL,
  );
  return response.data;
}

/** Fetch reviews for a specific course by slug or id */
export async function getCourseReviews(
  idOrSlug: string,
  params?: GetCourseReviewsParams,
): Promise<ListReviewsResponse> {
  const url = REVIEWS_ENDPOINTS.LIST.replace("{idOrSlug}", idOrSlug);
  const response = await api.get<ListReviewsResponse>(url, { params });
  return response.data;
}

export async function getReview(idOrSlug: string): Promise<GetReviewResponse> {
  const response = await api.get<GetReviewResponse>(
    REVIEWS_ENDPOINTS.DETAIL.replace("{idOrSlug}", idOrSlug),
  );
  return response.data;
}

export async function createReview(data: CreateReviewRequest): Promise<CreateReviewResponse> {
  const response = await api.post<CreateReviewResponse>(
    REVIEWS_ENDPOINTS.CREATE.replace("{idOrSlug}", data.courseId),
    { userId: data.studentId, rating: data.rating, comment: data.comment },
  );
  return response.data;
}

export async function createCourseReview(
  courseSlug: string,
  data: { rating: number; comment: string },
): Promise<CreateReviewResponse> {
  const response = await api.post<CreateReviewResponse>(
    REVIEWS_ENDPOINTS.CREATE_BY_COURSE.replace("{idOrSlug}", courseSlug),
    data,
  );
  return response.data;
}

export async function updateReview(
  idOrSlug: string,
  data: UpdateReviewRequest,
): Promise<UpdateReviewResponse> {
  const response = await api.put<UpdateReviewResponse>(
    REVIEWS_ENDPOINTS.UPDATE.replace("{idOrSlug}", idOrSlug),
    data,
  );
  return response.data;
}

export async function deleteReview(idOrSlug: string): Promise<DeleteReviewResponse> {
  const response = await api.delete<DeleteReviewResponse>(
    REVIEWS_ENDPOINTS.DELETE.replace("{idOrSlug}", idOrSlug),
  );
  return response.data;
}
