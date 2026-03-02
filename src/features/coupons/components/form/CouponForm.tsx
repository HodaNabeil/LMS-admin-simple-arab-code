import { Pages, CreateCouponDtoType } from '@/constants/enums';
import { useNavigate } from 'react-router-dom';
import { useForm, type Control } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo } from 'react';
import FormFields from '@/components/shared/form-fields/form-fields';
import { Loader } from '@/components/shared/loader';
import useFormFields from '@/hooks/useFormFields';
import { couponSchema, type CouponSchema } from '@/validations/coupon';
import { useCreateCoupon, useUpdateCoupon } from '../../hooks/useCouponsMutation';
import { useCourses } from '@/features/courses/hooks/useCoursesQueries';
import type { CreateCouponRequest, Coupon, UpdateCouponRequest } from '@/types/course';
import type { UseMutationResult } from '@tanstack/react-query';
import { handleApiError } from '@/lib/error-handler';
import { cn } from "../../../../lib/utils";

interface CouponFormProps {
  coupon?: Coupon;
  setCouponMenu?: React.Dispatch<React.SetStateAction<boolean>>;
  mutation?: UseMutationResult<Coupon, Error, { id: string; data: UpdateCouponRequest }, unknown>;
}

export default function CouponForm({ coupon, setCouponMenu, mutation }: CouponFormProps) {
  const isEditMode = !!coupon;

  const { getFormFields } = useFormFields({ slug: Pages.CREATE_COUPONS });
  const navigate = useNavigate();
  const { data: coursesData, isPending: isLoadingCourses } = useCourses();

  const courseOptions = useMemo(() => {
    if (!coursesData?.data?.courses) return [];
    return coursesData.data.courses.map((course) => ({
      value: course.id.toString(),
      label: course.title,
      id: course.id,
    }));
  }, [coursesData]);

  const { mutateAsync: createCoupon } = useCreateCoupon();
  const defaultUpdateMutation = useUpdateCoupon();
  const updateMutation = mutation || defaultUpdateMutation;

  const useFormReturn = useForm<CouponSchema>({
    defaultValues: {
      code: '',
      value: 0,
      type: CreateCouponDtoType.PERCENTAGE,
      description: '',
      startsAt: '',
      expiresAt: '',
      maxUses: 100,
      maxUsesPerUser: 1,
      minOrderAmount: 0,
      courseIds: [],
      isActive: true,
    },
    mode: 'onChange',
    resolver: zodResolver(couponSchema),
  });

  const { reset } = useFormReturn;

  // Initialize form with API data when it arrives
  useEffect(() => {
    if (coupon) {
      reset({
        code: coupon.code || '',
        value: coupon.value || 0,
        type: (coupon.type as unknown as CreateCouponDtoType) || CreateCouponDtoType.PERCENTAGE,
        description: (coupon.description as unknown as string) || '',
        startsAt: coupon.startsAt && typeof coupon.startsAt === 'string' ? new Date(coupon.startsAt).toISOString().split('T')[0] : '',
        expiresAt: coupon.expiresAt && typeof coupon.expiresAt === 'string' ? new Date(coupon.expiresAt).toISOString().split('T')[0] : '',
        maxUses: (coupon.maxUses as unknown as number) || 100,
        maxUsesPerUser: coupon.maxUsesPerUser || 1,
        minOrderAmount: (coupon.minOrderAmount as unknown as number) || 0,
        courseIds: coupon.courseIds || [],
        isActive: coupon.isActive ?? true,
      });
    }
  }, [coupon, reset]);

  const handleFormSubmit = async (data: CouponSchema) => {
    try {
      if (isEditMode && coupon) {
        const updateData = {
          code: data.code,
          value: data.value,
          type: data.type,
          description: data.description,
          startsAt: data.startsAt ? new Date(data.startsAt).toISOString() : undefined,
          expiresAt: data.expiresAt ? new Date(data.expiresAt).toISOString() : undefined,
          maxUses: data.maxUses,
          maxUsesPerUser: data.maxUsesPerUser,
          minOrderAmount: data.minOrderAmount,
          courseIds: data.courseIds,
          isActive: data.isActive,
        };

        await updateMutation.mutateAsync({ id: coupon.id, data: { ...updateData, id: coupon.id } as UpdateCouponRequest });

        if (setCouponMenu) {
          setCouponMenu(false);
        }

        // Navigate to coupons list after successful update
        navigate('/admin/coupons');
      } else {
        const createData: CreateCouponRequest = {
          code: data.code,
          value: data.value,
          type: data.type,
          description: data.description,
          startsAt: data.startsAt ? new Date(data.startsAt).toISOString() : undefined,
          expiresAt: data.expiresAt ? new Date(data.expiresAt).toISOString() : undefined,
          maxUses: data.maxUses,
          maxUsesPerUser: data.maxUsesPerUser,
          minOrderAmount: data.minOrderAmount,
          courseIds: data.courseIds,
          isActive: data.isActive,
        };
        await createCoupon(createData);
        navigate('/admin/coupons');
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  const { handleSubmit, control, formState: { errors, isSubmitting } } = useFormReturn;

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className={cn('flex', 'flex-col', 'gap-4')}
    >
      {getFormFields().map((field) => {
        // Inject dynamic course options into the courseIds field
        const fieldWithOptions =
          field.name === 'courseIds'
            ? { ...field, options: courseOptions }
            : field;

        return (
          <FormFields
            key={field.name}
            {...fieldWithOptions}
            control={control as unknown as Control<Record<string, unknown>>}
            errors={errors}
          />
        );
      })}

      <button
        type="submit"
        disabled={isSubmitting || isLoadingCourses}
        className={cn(
          'w-full',
          'bg-primary',
          'text-white',
          'rounded-lg',
          'px-6',
          'py-3',
          'text-base',
          'font-medium',
          'hover:bg-primary/90',
          'transition-colors',
          'disabled:opacity-50',
          'disabled:cursor-not-allowed',
          'flex',
          'items-center',
          'justify-center',
          'gap-2',
          'shadow-sm'
        )}
      >
        {isSubmitting || isLoadingCourses ? (
          <Loader />
        ) : isEditMode ? (
          'تحديث الكوبون'
        ) : (
          'إنشاء كوبون'
        )}
      </button>
    </form>
  );
}
