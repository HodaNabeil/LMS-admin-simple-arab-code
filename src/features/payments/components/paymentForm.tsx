import { Pages } from '@/constants/enums';
import { useNavigate } from 'react-router-dom';
import { useForm, type Control } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import FormFields from '@/components/shared/form-fields/form-fields';
import { Loader } from '@/components/shared/loader';
import useFormFields from '@/hooks/useFormFields';
import useFormValidations from '@/hooks/useFormValidations';
import { createPaymentSchema, type IPaymentForm } from '@/validations/payment';
import { useCreatePayment } from '../hooks/usePaymentsMutations';
import { useOrders } from '@/features/orders/hooks/useOrdersQueries';
import type { CreatePaymentRequest } from '@/types/payments';
import type { Order } from '@/types/orders';
import { handleApiError } from '@/lib/error-handler';
import { CreatePaymentDtoProvider, CreatePaymentDtoStatus } from '@/types';
import { cn } from "../../../lib/utils";
import { Form } from "@/components/ui/form";


interface PaymentFormProps {
  onSuccess?: () => void;
}

const PaymentForm = ({ onSuccess }: PaymentFormProps) => {
  const { getFormFields } = useFormFields({ slug: Pages.CREATE_PAYMENTS });
  const { getValidationSchema } = useFormValidations({
    slug: Pages.CREATE_PAYMENTS,
  });
  const navigate = useNavigate();
  const { data: ordersData, isPending: isLoadingOrders } = useOrders();

  const orderOptions = useMemo(() => {
    if (!ordersData?.data?.orders) return [];
    return ordersData.data.orders.map((order: Order) => ({
      value: order.id,
      label: `${order.orderNumber} - ${order.email} - ${order.total} ${order.currency || 'EGP'}`
    }));
  }, [ordersData]);

  const { mutateAsync: createPayment } = useCreatePayment();

  const useFormReturn = useForm<IPaymentForm>({
    defaultValues: {
      orderId: '',
      provider: CreatePaymentDtoProvider.PAYMOB,
      status: CreatePaymentDtoStatus.PENDING,
    },
    mode: 'onChange',
    resolver: zodResolver(getValidationSchema() as typeof createPaymentSchema),
  });

  const handleFormSubmit = async (data: IPaymentForm) => {
    try {
      const createData: CreatePaymentRequest = {
        orderId: data.orderId,
        provider: data.provider,
        status: data.status,
      };

      await createPayment(createData);
      onSuccess?.();
      navigate('/admin/settings/payment');
    } catch (error) {
      handleApiError(error);
    }
  };

  const { handleSubmit, control, formState: { errors, isSubmitting } } = useFormReturn;

  return (
    <Form {...useFormReturn}>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className={cn('flex', 'flex-col', 'gap-4')}
      >
        {getFormFields().map((field) => {
          // Inject dynamic order options into the orderId field
          const fieldWithOptions =
            field.name === 'orderId'
              ? { ...field, options: orderOptions }
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
          disabled={isSubmitting || isLoadingOrders}
          className={cn('bg-primary', 'text-white', 'rounded', 'px-4', 'py-2', 'text-sm', 'hover:bg-primary/90', 'transition', 'disabled:opacity-50', 'flex', 'items-center', 'justify-center', 'gap-2')}
        >
          {isSubmitting ? (
            <Loader />
          ) : (
            'إنشاء الدفع'
          )}
        </button>
      </form>
    </Form>
  );
};

export default PaymentForm;
