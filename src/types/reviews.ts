export type ReviewStatus = 'approved' | 'pending' | 'rejected';

export type Review = {
  id: string;
  rating: number;
  comment: string;
  status: ReviewStatus;
  createdAt: string;
  student: {
    id: string;
    name: string;
    avatar: string | null;
  };
  course: {
    id: string;
    title: string;
  };
  instructorReply: {
    message: string;
    createdAt: string;
  } | null;
  meta: {
    completionRate: number;
    source: string;
    flagged?: boolean;
  };
};

export type CreateReviewRequest = {
  rating: number;
  comment: string;
  status?: ReviewStatus;
  courseId: string;
  studentId: string;
};

export type UpdateReviewRequest = Partial<CreateReviewRequest>;

export type WrappedResponseReviewListDto = {
  success: boolean;
  message?: string;
  data?: Review[];
};

export type WrappedResponseReviewDto = {
  success: boolean;
  message?: string;
  data?: Review;
};

export type DeleteReviewResponse = {
  success: boolean;
  message?: string;
};

export type ListReviewsResponse = WrappedResponseReviewListDto;
export type GetReviewResponse = WrappedResponseReviewDto;
export type CreateReviewResponse = WrappedResponseReviewDto;
export type UpdateReviewResponse = WrappedResponseReviewDto;
