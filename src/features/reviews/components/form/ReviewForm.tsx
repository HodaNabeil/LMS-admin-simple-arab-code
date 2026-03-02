
import { useNavigate } from 'react-router-dom';
import { useForm, type Control } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import FormFields from '@/components/shared/form-fields/form-fields';
import { Loader } from '@/components/shared/loader';
import useFormFields from '@/hooks/useFormFields';
import useFormValidations from '@/hooks/useFormValidations';
import { createReviewSchema, type CreateReviewRequest } from '@/validations/review';
import { useCreateReview } from '../../hooks/useReviewsMutations';
import type { Review } from '@/types/reviews';
import { handleApiError } from '@/lib/error-handler';
import { cn } from '../../../../lib/utils';
import { Pages } from '@/constants/enums';

interface ReviewFormProps {
  reviewData?: Review;
}

export default function ReviewForm({ reviewData }: ReviewFormProps) {
  const review = reviewData;
  const isEditMode = !!review;

  const { getFormFields } = useFormFields({ slug: Pages.CREATE_REVIEWS });
  const { getValidationSchema } = useFormValidations({
    slug: Pages.CREATE_REVIEWS,
  });
  const navigate = useNavigate();

  const { mutateAsync: createReview } = useCreateReview();

  const useFormReturn = useForm<CreateReviewRequest>({
    defaultValues: {
      studentId: review?.student?.id || '',
      courseId: review?.course?.id || '',
      rating: review?.rating || 5,
      status: review?.status || 'pending',
      comment: review?.comment || '',
    },
    mode: 'onChange',
    resolver: zodResolver(getValidationSchema() as unknown as typeof createReviewSchema),
  });

  const { reset } = useFormReturn;

  // Initialize form with API data when it arrives
  useEffect(() => {
    if (review) {
      reset({
        studentId: review.student?.id || '',
        courseId: review.course?.id || '',
        rating: review.rating || 5,
        status: review.status || 'pending',
        comment: review.comment || '',
      });
    }
  }, [review, reset]);

  const handleFormSubmit = async (data: CreateReviewRequest) => {
    try {
      if (isEditMode && review) {
        // TODO: Add update mutation when needed
        // await updateReview({ id: review.id, data });
      } else {
        await createReview(data);
      }

      navigate('/admin/reviews');
    } catch (error) {
      handleApiError(error);
    }
  };

  const { handleSubmit, control, formState: { errors, isSubmitting } } = useFormReturn;

  return (
    <div className={cn('max-w-3xl', 'mx-auto', 'p-6', 'bg-card', 'rounded-lg', 'border', 'shadow-sm', 'my-6')}>
      <form onSubmit={handleSubmit(handleFormSubmit)} className={cn('flex', 'flex-col', 'gap-4')}>
        {getFormFields().map((field) => (
          <FormFields
            key={field.name}
            {...field}
            control={control as unknown as Control<Record<string, unknown>>}
            errors={errors}
          />
        ))}

        <button
          type="submit"
          disabled={isSubmitting}
          className={cn('bg-primary', 'text-white', 'rounded', 'px-4', 'py-2', 'text-sm', 'hover:bg-primary/90', 'transition', 'disabled:opacity-50', 'flex', 'items-center', 'justify-center', 'gap-2')}
        >
          {isSubmitting ? (
            <Loader />
          ) : isEditMode ? (
            'تحديث المراجعة'
          ) : (
            'إنشاء مراجعة'
          )}
        </button>
      </form>
    </div>
  );
}
