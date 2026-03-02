import * as z from 'zod';

export const createReviewSchema = z.object({
  studentId: z.string().trim().min(1, { message: 'Student ID is required' }),
  courseId: z.string().trim().min(1, { message: 'Course ID is required' }),
  rating: z.number().min(1, { message: 'Rating must be at least 1' }).max(5, { message: 'Rating must be at most 5' }),
  status: z.enum(['pending', 'approved', 'rejected'], {
    errorMap: () => ({ message: 'Status must be one of: pending, approved, rejected' }),
  }),
  comment: z.string().trim().min(1, { message: 'Comment is required' }).max(1000, { message: 'Comment must be less than 1000 characters' }),
});

export type CreateReviewRequest = z.infer<typeof createReviewSchema>;

export const editReviewSchema = z.object({
  studentId: z.string().trim().optional(),
  courseId: z.string().trim().optional(),
  rating: z.number().min(1).max(5).optional(),
  status: z.enum(['pending', 'approved', 'rejected']).optional(),
  comment: z.string().trim().optional(),
});

export type UpdateReviewRequest = z.infer<typeof editReviewSchema>;
