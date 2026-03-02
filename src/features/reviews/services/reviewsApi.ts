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

export const reviewsApi = {
  async getAllReviews(): Promise<ListReviewsResponse> {
    const response = await api.get<ListReviewsResponse>(REVIEWS_ENDPOINTS.LIST);
    return response.data;
  },

  async getReview(idOrSlug: string): Promise<GetReviewResponse> {
    const response = await api.get<GetReviewResponse>(
      REVIEWS_ENDPOINTS.DETAIL.replace("{idOrSlug}", idOrSlug),
    );
    return response.data;
  },

  async createReview(data: CreateReviewRequest): Promise<CreateReviewResponse> {
    const response = await api.post<CreateReviewResponse>(
      REVIEWS_ENDPOINTS.CREATE,
      data,
    );
    return response.data;
  },

  async createCourseReview(
    courseSlug: string,
    data: { rating: number; comment: string },
  ): Promise<CreateReviewResponse> {
    const response = await api.post<CreateReviewResponse>(
      REVIEWS_ENDPOINTS.CREATE_BY_COURSE.replace("{courseSlug}", courseSlug),
      data,
    );
    return response.data;
  },

  async updateReview(
    idOrSlug: string,
    data: UpdateReviewRequest,
  ): Promise<UpdateReviewResponse> {
    const response = await api.put<UpdateReviewResponse>(
      REVIEWS_ENDPOINTS.UPDATE.replace("{idOrSlug}", idOrSlug),
      data,
    );
    return response.data;
  },

  async deleteReview(idOrSlug: string): Promise<DeleteReviewResponse> {
    const response = await api.delete<DeleteReviewResponse>(
      REVIEWS_ENDPOINTS.DELETE.replace("{idOrSlug}", idOrSlug),
      {
        data: idOrSlug,
      },
    );
    return response.data;
  },
};
