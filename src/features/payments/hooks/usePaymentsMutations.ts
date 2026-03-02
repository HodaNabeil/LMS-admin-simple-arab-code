import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import { toast } from 'sonner';
import { handleApiError } from '@/lib/error-handler';
import type {
    CreatePaymentRequest,
    CreatePaymentResponse,
    UpdatePaymentRequest,
    UpdatePaymentResponse,
    RefundPaymentResponse,
} from '@/types/payments';
import { paymentApi } from '../services/paymentApi';

export function useCreatePayment() {
    const queryClient = useQueryClient();
    return useMutation<CreatePaymentResponse, Error, CreatePaymentRequest>({
        mutationFn: async (data: CreatePaymentRequest): Promise<CreatePaymentResponse> => {
            return await paymentApi.createPayment(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.payments.all });
            queryClient.invalidateQueries({ queryKey: queryKeys.payments.all });
            toast.success('تم إنشاء طلب الدفع بنجاح');
        },
        onError: (error) => {
            handleApiError(error);
        },
    });
}

export function useUpdatePayment() {
    const queryClient = useQueryClient();
    return useMutation<
        UpdatePaymentResponse,
        Error,
        { id: string; data: UpdatePaymentRequest }
    >({
        mutationFn: async ({ id, data }): Promise<UpdatePaymentResponse> => {
            return await paymentApi.updatePayment(id, data);
        },
        onSuccess: (res, variables) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.payments.all });
            queryClient.invalidateQueries({
                queryKey: queryKeys.payments.detail(variables.id),
            });
            toast.success(res.message || 'تم تحديث بيانات الدفع بنجاح');
        },
        onError: (error) => {
            handleApiError(error);
        },
    });
}

export function useRefundPayment() {
    const queryClient = useQueryClient();
    return useMutation<RefundPaymentResponse, Error, string>({
        mutationFn: async (id: string): Promise<RefundPaymentResponse> => {
            return await paymentApi.refundPayment(id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.payments.all });
            toast.success('تم طلب استرداد المبلغ بنجاح');
        },
        onError: (error) => {
            handleApiError(error);
        },
    });
}
