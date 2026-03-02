
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo } from 'react';
import FormFields from '@/components/shared/form-fields/form-fields';
import { Loader } from '@/components/shared/loader';
import useFormFields from '@/hooks/useFormFields';
import { createReviewSchema, createCourseReviewSchema } from '@/validations/review';
import { useCreateReview, useCreateCourseReview } from '../../hooks/useReviewsMutations';
import type { Review, CreateReviewRequest } from '@/types/reviews';
import { handleApiError } from '@/lib/error-handler';
import { cn } from '../../../../lib/utils';
import { Pages } from '@/constants/enums';
import { useCourses } from '@/features/courses/hooks/useCoursesQueries';
import { useUsers } from '@/features/users/hooks/useUsersQueries';
import type { User } from '@/types/user';
import { Save, XCircle } from 'lucide-react';
import { Form } from '@/components/ui/form';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Resolver } from 'react-hook-form';

interface ReviewFormProps {
  reviewData?: Review;
  courseSlug?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

type ReviewFormValues = {
  studentId?: string[];
  courseId?: string[];
  rating: number;
  status: 'pending' | 'approved' | 'rejected';
  comment: string;
};

export default function ReviewForm({ reviewData, courseSlug, onSuccess, onCancel }: ReviewFormProps) {
  const review = reviewData;
  const isEditMode = !!review;
  const isCourseSpecific = !!courseSlug;

  const { getFormFields } = useFormFields({ slug: Pages.CREATE_REVIEWS });

  const navigate = useNavigate();

  const { mutateAsync: createReview } = useCreateReview();
  const { mutateAsync: createCourseReview } = useCreateCourseReview();
  const { data: coursesData, isPending: isLoadingCourses } = useCourses();
  const { data: usersData, isPending: isLoadingUsers } = useUsers();

  const courseOptions = useMemo(() => {
    if (!coursesData?.data?.courses) return [];
    return coursesData.data.courses.map((course) => ({
      value: course.id.toString(),
      label: course.title,
      id: course.id,
    }));
  }, [coursesData]);

  const userOptions = useMemo(() => {
    if (!usersData?.data?.users) return [];
    return usersData.data.users.map((user: User) => ({
      value: user.id.toString(),
      label: user.email || `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.email,
      id: user.id,
    }));
  }, [usersData]);

  const useFormReturn = useForm<ReviewFormValues>({
    defaultValues: {
      studentId: review?.student?.id ? [review.student.id] : [],
      courseId: courseSlug ? [courseSlug] : (review?.course?.id ? [review.course.id] : []),
      rating: review?.rating || 5,
      status: (review?.status as ReviewFormValues['status']) || 'approved',
      comment: review?.comment || '',
    },
    mode: 'onChange',
    resolver: zodResolver(
      isCourseSpecific
        ? createCourseReviewSchema
        : createReviewSchema
    ) as unknown as Resolver<ReviewFormValues>,
  });

  const { reset, handleSubmit, control, formState: { errors, isSubmitting } } = useFormReturn;

  // Initialize form with API data when it arrives
  useEffect(() => {
    if (review) {
      reset({
        studentId: review.student?.id ? [review.student.id] : [],
        courseId: review.course?.id ? [review.course.id] : [],
        rating: review.rating || 5,
        status: review.status || 'approved',
        comment: review.comment || '',
      });
    }
  }, [review, reset]);

  const handleFormSubmit = async (data: ReviewFormValues) => {
    try {
      if (isEditMode && review) {
        // TODO: Add update mutation when needed
        // await updateReview({ id: review.id, data });
      } else if (isCourseSpecific) {
        await createCourseReview({
          courseSlug,
          data: {
            rating: data.rating,
            comment: data.comment,
          }
        });
      } else {
        const submissionData: CreateReviewRequest = {
          rating: data.rating,
          comment: data.comment,
          studentId: Array.isArray(data.studentId) ? data.studentId[0] : (data.studentId || ''),
          courseId: Array.isArray(data.courseId) ? data.courseId[0] : (data.courseId || ''),
        };
        await createReview(submissionData);
      }

      if (onSuccess) {
        onSuccess();
      } else {
        navigate('/admin/reviews');
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  const filteredFields = getFormFields().filter(field => {
    if (isCourseSpecific) {
      return field.name !== 'studentId' && field.name !== 'courseId';
    }
    return true;
  });

  return (
    <Card className='shadow-none'>
      <CardHeader className="bg-primary/5 border-b border-border">
        <CardTitle className="text-xl font-bold text-foreground">
          {isEditMode ? 'تعديل المراجعة' : 'إنشاء مراجعة جديدة'}
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground mt-1">
          {isEditMode ? 'قم بتحديث تفاصيل المراجعة الحالية.' : 'املأ النموذج أدناه لإضافة مراجعة جديدة.'}
        </CardDescription>
      </CardHeader>

      <CardContent className="p-8">
        <Form {...useFormReturn}>
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredFields.map((field) => {
                let fieldWithOptions = field;

                if (field.name === 'courseId') {
                  fieldWithOptions = { ...field, options: courseOptions };
                } else if (field.name === 'studentId') {
                  fieldWithOptions = { ...field, options: userOptions };
                }

                return (
                  <div
                    key={field.name}
                    className={cn(
                      "relative group transition-all duration-300",
                      (field.name === 'comment' || field.name === 'studentId' || field.name === 'courseId') ? "md:col-span-2" : ""
                    )}
                  >
                    <FormFields
                      {...fieldWithOptions}
                      control={control}
                      errors={errors}
                    />
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col-reverse sm:flex-row justify-end items-center gap-4 pt-6 mt-8 border-t border-border">
              {onCancel && (
                <Button
                  type="button"
                  onClick={onCancel}
                  variant="secondary"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl px-8 py-3 text-sm font-semibold transition-all active:scale-95"
                >
                  <XCircle className="w-4 h-4" />
                  إلغاء
                </Button>
              )}

              <Button
                type="submit"
                disabled={isSubmitting || (!isCourseSpecific && (isLoadingCourses || isLoadingUsers))}
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 hover:bg-primary/90 hover:shadow-primary/40 transition-all active:scale-95"
              >
                {isSubmitting ? (
                  <Loader className="text-white" />
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    {isEditMode ? 'تحديث المراجعة' : 'إنشاء مراجعة'}
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
