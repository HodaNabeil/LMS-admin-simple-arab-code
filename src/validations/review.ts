import * as z from 'zod';

export const createReviewSchema = z.object({
  studentId: z.array(z.string()).min(1, { message: 'At least one student must be selected' }),
  courseId: z.array(z.string()).min(1, { message: 'At least one course must be selected' }),
  rating: z.number().min(1, { message: 'Rating must be at least 1' }).max(5, { message: 'Rating must be at most 5' }),
  status: z.enum(['pending', 'approved', 'rejected'], {
    errorMap: () => ({ message: 'Status must be one of: pending, approved, rejected' }),
  }),
  comment: z.string().trim().min(1, { message: 'Comment is required' }).max(1000, { message: 'Comment must be less than 1000 characters' }),
});

export const createCourseReviewSchema = z.object({
  rating: z.number().min(1, { message: 'التقييم يجب أن يكون بين 1 و 5' }).max(5, { message: 'التقييم يجب أن يكون بين 1 و 5' }),
  comment: z.string().trim().min(1, { message: 'التعليق مطلوب' }).max(1000, { message: 'التعليق يجب أن يكون أقل من 1000 حرف' }),
  status: z.enum(['pending', 'approved', 'rejected']).optional().default('pending'),
});

export type CreateCourseReviewRequest = z.infer<typeof createCourseReviewSchema>;

export type CreateReviewRequest = z.infer<typeof createReviewSchema>;

export const editReviewSchema = z.object({
  studentId: z.string().trim().optional(),
  courseId: z.array(z.string()).optional(),
  rating: z.number().min(1).max(5).optional(),
  status: z.enum(['pending', 'approved', 'rejected']).optional(),
  comment: z.string().trim().optional(),
});

export type UpdateReviewRequest = z.infer<typeof editReviewSchema>;
