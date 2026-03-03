
import { useNavigate } from 'react-router-dom';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo } from 'react';
import FormFields from '@/components/shared/form-fields/form-fields';
import { Loader } from '@/components/shared/loader';
import useFormFields from '@/hooks/useFormFields';
import { createReviewSchema, createCourseReviewSchema } from '@/validations/review';
import { useCreateReview, useCreateCourseReview, useUpdateReview } from '../../hooks/useReviewsMutations';
import type { Review, CreateReviewRequest } from '@/types/reviews';
import { handleApiError } from '@/lib/error-handler';
import { cn } from '@/lib/utils';
import { Pages } from '@/constants/enums';
import { useCourses } from '@/features/courses/hooks/useCoursesQueries';
import { useUsers } from '@/features/users/hooks/useUsersQueries';
import type { User } from '@/types/user';
import { Save, XCircle, User as UserIcon, BookOpen, Star } from 'lucide-react';
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
  studentId: string;
  courseId: string;
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
      studentId: review?.student?.id || '',
      courseId: courseSlug || (review?.course?.id || ''),
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

  const selectedStudentId = useWatch({ control, name: 'studentId' });
  const selectedCourseId = useWatch({ control, name: 'courseId' });

  const selectedStudent = useMemo(() => {
    return userOptions.find(opt => opt.value === selectedStudentId);
  }, [selectedStudentId, userOptions]);

  const selectedCourse = useMemo(() => {
    return courseOptions.find(opt => opt.value === selectedCourseId);
  }, [selectedCourseId, courseOptions]);

  // Initialize form with API data when it arrives
  useEffect(() => {
    if (review) {
      reset({
        studentId: review.student?.id || '',
        courseId: review.course?.id || '',
        rating: review.rating || 5,
        status: review.status || 'approved',
        comment: review.comment || '',
      });
    }
  }, [review, reset]);

  const { mutateAsync: updateReview } = useUpdateReview();

  const handleFormSubmit = async (data: ReviewFormValues) => {
    try {
      if (isEditMode && review) {
        await updateReview({
          idOrSlug: review.id,
          data: {
            rating: data.rating,
            comment: data.comment,
            status: data.status,
          }
        });
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
          studentId: data.studentId,
          courseId: data.courseId,
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

  const fields = getFormFields();

  return (
    <Card className="border-none bg-background overflow-hidden rounded-2xl shadow-none">
      <CardHeader className="bg-gradient-to-r from-primary/5 via-primary/5 to-transparent border-b border-border/50 p-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-2xl">
            <Star className="w-6 h-6 text-primary" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-foreground">
              {isEditMode ? 'تعديل المراجعة' : 'إنشاء مراجعة جديدة'}
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground mt-1">
              {isEditMode ? 'قم بتحديث تفاصيل المراجعة الحالية.' : 'املأ النموذج أدناه لإضافة مراجعة جديدة للمنصة.'}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-8">
        <Form {...useFormReturn}>
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-10">
            {/* Main Selection Area */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Student Field */}
              {!isCourseSpecific && (
                <div className="space-y-4">
                  <FormFields
                    {...fields.find(f => f.name === 'studentId')!}
                    options={userOptions}
                    control={control}
                    errors={errors}
                    disabled={isEditMode}
                  />

                  {/* Selected Student Details Panel */}
                  <div className={cn(
                    "overflow-hidden transition-all duration-500 ease-in-out border rounded-2xl",
                    selectedStudent
                      ? "max-h-40 opacity-100 p-4 bg-secondary/30 border-secondary-foreground/10"
                      : "max-h-0 opacity-0 border-transparent"
                  )}>
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-primary/20 rounded-xl">
                        <UserIcon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-bold text-foreground">{selectedStudent?.label || 'طالب غير معروف'}</p>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <span className="font-semibold text-primary">solution:</span>
                            <span className="bg-primary/10 px-1.5 py-0.5 rounded text-[10px]">مكتمل</span>
                          </span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <span className="font-semibold text-primary">input:</span>
                            <span className="bg-primary/10 px-1.5 py-0.5 rounded text-[10px]">نظري وعملي</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Course Field */}
              {!isCourseSpecific && (
                <div className="space-y-4">
                  <FormFields
                    {...fields.find(f => f.name === 'courseId')!}
                    options={courseOptions}
                    control={control}
                    errors={errors}
                    disabled={isEditMode}
                  />

                  {/* Selected Course Details Panel */}
                  <div className={cn(
                    "overflow-hidden transition-all duration-500 ease-in-out border rounded-2xl",
                    selectedCourse
                      ? "max-h-40 opacity-100 p-4 bg-secondary/30 border-secondary-foreground/10"
                      : "max-h-0 opacity-0 border-transparent"
                  )}>
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-primary/20 rounded-xl">
                        <BookOpen className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-bold text-foreground">{selectedCourse?.label || 'دورة غير معروفة'}</p>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <span className="font-semibold text-primary">التصنيف:</span>
                            <span className="text-[10px]">تعليمي</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Rating & Status Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-secondary/10 p-6 rounded-2xl border border-border/50 space-y-2">
                <FormFields
                  {...fields.find(f => f.name === 'rating')!}
                  control={control}
                  errors={errors}
                />
              </div>

              <div className="bg-secondary/10 p-6 rounded-2xl border border-border/50 space-y-2">
                <FormFields
                  {...fields.find(f => f.name === 'status')!}
                  control={control}
                  errors={errors}
                />
              </div>
            </div>

            {/* Comment Section */}
            <div className="bg-secondary/5 p-6 rounded-2xl border border-border/50">
              <FormFields
                {...fields.find(f => f.name === 'comment')!}
                control={control}
                errors={errors}
              />
            </div>

            {/* Actions */}
            <div className="flex flex-col-reverse sm:flex-row justify-end items-center gap-4 pt-8 border-t border-border/50">
              {onCancel && (
                <Button
                  type="button"
                  onClick={onCancel}
                  variant="outline"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto h-12 px-8 rounded-2xl border-2 hover:bg-secondary font-bold transition-all"
                >
                  <XCircle className="w-5 h-5 ml-2 rtl:mr-2 rtl:ml-0" />
                  إلغاء
                </Button>
              )}

              <Button
                type="submit"
                disabled={isSubmitting || (!isCourseSpecific && (isLoadingCourses || isLoadingUsers))}
                className="w-full sm:w-auto h-12 px-10 rounded-2xl bg-primary text-primary-foreground font-bold hover:scale-105 active:scale-95 transition-all"
              >
                {isSubmitting ? (
                  <Loader className="text-white" />
                ) : (
                  <>
                    <Save className="w-5 h-5 ml-2 rtl:mr-2 rtl:ml-0" />
                    {isEditMode ? 'تحديث المراجعة' : 'إنشاء المراجعة'}
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
