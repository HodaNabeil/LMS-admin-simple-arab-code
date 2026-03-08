import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Loader2, Calculator } from "lucide-react";

// Import utilities
import {
  getCurrencyOptions,
  getCourseOptions,
  getUserOptions,
  getCouponOptions,
} from "../services/orderOptions";

import { useCourses } from "@/features/courses/hooks/useCoursesQueries";
import { useUsers } from "@/features/users/hooks/useUsersQueries";
import { useCoupons } from "@/features/courses/manage/promotions/hooks/useCouponsQueries";
import { cn } from "../../../lib/utils";
import { Pages } from '@/constants/enums';
import useFormFields from '@/hooks/useFormFields';
import { type OrderFormData, orderSchema } from "@/validations/order";
import { useCreateOrder } from '../hooks/useOrdersMutations';
import { useNavigate } from 'react-router-dom';
import { handleApiError } from '@/lib/error-handler';
import FormFields from '@/components/shared/form-fields/form-fields';
import { Form } from "@/components/ui/form";


import type { CreateOrderRequest } from '@/types/orders';

interface OrderFormProps {
  initialData?: OrderFormData;
  onSubmit?: (data: OrderFormData) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export default function
  OrderForm({
    initialData,
    onSubmit,
    onCancel,
    isLoading = false,
  }: OrderFormProps) {
  const { getFormFields } = useFormFields({ slug: Pages.CREATE_ORDERS });
  const navigate = useNavigate();

  const { mutateAsync: createOrder } = useCreateOrder();

  // Initialize form with react-hook-form
  const formMethods = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: initialData ? {
      userId: initialData.userId,
      courseId: initialData.courseId,
      currency: initialData.currency,
      couponId: initialData.couponId,
      coursePriceCents: initialData.coursePriceCents,
      discountCents: initialData.discountCents,
      taxCents: initialData.taxCents,
    } : {
      currency: "EGP",
      discountCents: 0,
      taxCents: 0,
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = formMethods;

  // Watch form values for summary calculation
  const formValues = watch();
  const subtotalCents = formValues.coursePriceCents || 0;
  const totalCents = subtotalCents - (formValues.discountCents || 0) + (formValues.taxCents || 0);

  // Fetch real data from backend
  const { data: coursesData, isPending: isPendingCourses } = useCourses({
    search: "",
    limit: 50,
  });

  const { data: usersData, isPending: isPendingUsers } = useUsers({
    search: "",
  });

  const { data: couponsData, isPending: isPendingCoupons } =
    useCoupons("");

  const currencyOptions = useMemo(() => getCurrencyOptions(), []);
  const courseOptions = useMemo(() => getCourseOptions(coursesData?.data?.courses || []), [coursesData?.data?.courses]);
  const userOptions = useMemo(() => getUserOptions(usersData?.data?.users ?? []), [usersData?.data?.users]);
  const couponOptions = useMemo(() => getCouponOptions(couponsData?.data ?? []), [couponsData?.data]);

  const getCurrencySymbol = (currency: string) => {
    return currency === "EGP" ? "ج.م" : "$";
  };

  // Handle form submission with proper typing
  const onFormSubmit = async (data: OrderFormData) => {
    if (onSubmit) {
      // Use external submit handler if provided
      onSubmit(data);
      return;
    }

    try {
      // Calculate totals
      const subtotalCents = data.coursePriceCents;
      const totalCents = subtotalCents - data.discountCents + data.taxCents;

      // Transform to API format
      const orderData: CreateOrderRequest = {
        userId: data.userId,
        subtotalCents,
        discountCents: data.discountCents,
        taxCents: data.taxCents,
        totalCents,
        currency: data.currency as CreateOrderRequest["currency"],
        couponId: data.couponId || undefined,
        items: [{
          courseId: data.courseId,
          priceCents: data.coursePriceCents,
          currency: data.currency as unknown as CreateOrderRequest["items"][number]["currency"],
        }],
      };

      await createOrder(orderData);

      navigate('/admin/orders');
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <Form {...formMethods}>
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className={cn('flex', 'flex-col', 'gap-4', "pt-4")}
      >
        {getFormFields({
          userId: userOptions.map(o => ({ ...o, value: String(o.value) })),
          currency: currencyOptions.map(o => ({ ...o, value: String(o.value) })),
          courseId: courseOptions.map(o => ({ ...o, value: String(o.value) })),
          couponId: couponOptions.map(o => ({ ...o, value: String(o.value) })),
        }).map((field) => {
          // Inject dynamic options into select fields
          const fieldWithOptions =
            field.name === 'userId'
              ? { ...field, options: userOptions.map(o => ({ ...o, value: String(o.value) })) }
              : field.name === 'currency'
                ? { ...field, options: currencyOptions.map(o => ({ ...o, value: String(o.value) })) }
                : field.name === 'courseId'
                  ? { ...field, options: courseOptions.map(o => ({ ...o, value: String(o.value) })) }
                  : field.name === 'couponId'
                    ? { ...field, options: couponOptions.map(o => ({ ...o, value: String(o.value) })) }
                    : field;

          return (
            <FormFields
              key={field.name}
              {...fieldWithOptions}
              control={control}
              errors={errors}
            />
          );
        })}

        {/* Summary Card */}
        <div className={cn('bg-blue-50', 'border', 'border-blue-200', 'rounded-lg', 'p-4')}>
          <h4 className={cn('font-bold', 'text-blue-900', 'mb-3', 'flex', 'items-center', 'gap-2')}>
            <Calculator className={cn('h-4', 'w-4')} />
            ملخص الطلب
          </h4>
          <div className={cn('space-y-2', 'text-sm')}>
            <div className={cn('flex', 'justify-between')}>
              <span className="text-gray-700">المبلغ الفرعي:</span>
              <span className={cn('font-medium', 'text-gray-900')}>
                {(subtotalCents / 100).toFixed(2)} {getCurrencySymbol(formValues.currency || "EGP")}
              </span>
            </div>
            <div className={cn('flex', 'justify-between', 'text-red-600')}>
              <span>التخفيض:</span>
              <span className="font-medium">
                -{((formValues.discountCents || 0) / 100).toFixed(2)} {getCurrencySymbol(formValues.currency || "EGP")}
              </span>
            </div>
            <div className={cn('flex', 'justify-between', 'text-gray-700')}>
              <span>الضريبة:</span>
              <span className="font-medium">
                +{((formValues.taxCents || 0) / 100).toFixed(2)} {getCurrencySymbol(formValues.currency || "EGP")}
              </span>
            </div>
            <div className={cn('flex', 'justify-between', 'pt-2', 'border-t', 'border-blue-300')}>
              <span className={cn('font-bold', 'text-blue-900')}>الإجمالي:</span>
              <span className={cn('font-bold', 'text-blue-900', 'text-lg')}>
                {(totalCents / 100).toFixed(2)} {getCurrencySymbol(formValues.currency || "EGP")}
              </span>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || isLoading || isPendingUsers || isPendingCourses || isPendingCoupons}
          className={cn('bg-primary', 'text-white', 'rounded', 'px-4', 'py-2', 'text-sm', 'hover:bg-primary/90', 'transition', 'disabled:opacity-50', 'flex', 'items-center', 'justify-center', 'gap-2')}
        >
          {isSubmitting || isLoading ? (
            <Loader2 className={cn('h-4', 'w-4', 'animate-spin')} />
          ) : initialData ? (
            'تحديث الطلب'
          ) : (
            'إنشاء طلب'
          )}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting || isLoading}
            className={cn('bg-secondary', 'text-secondary-foreground', 'rounded', 'px-4', 'py-2', 'text-sm', 'hover:bg-secondary/90', 'transition', 'disabled:opacity-50', 'flex', 'items-center', 'justify-center', 'gap-2')}
          >
            إلغاء
          </button>
        )}
      </form>
    </Form>
  );
}
