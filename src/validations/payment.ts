import * as z from 'zod';
import { 
  CreatePaymentDtoProvider,
  CreatePaymentDtoStatus 
} from '@/types';

// Schema for creating new payments
export const createPaymentSchema = z.object({
  orderId: z
    .string()
    .trim()
    .min(1, { message: 'اختر الطلب مطلوب' }),

  provider: z.nativeEnum(CreatePaymentDtoProvider, {
    errorMap: () => ({ message: 'مزود الدفع مطلوب' }),
  }),

  status: z.nativeEnum(CreatePaymentDtoStatus, {
    errorMap: () => ({ message: 'حالة الدفع مطلوبة' }),
  }),
});

// Type exports
export type IPaymentForm = z.infer<typeof createPaymentSchema>;
