import { z } from "zod";

export const orderSchema = z.object({
  userId: z.string().min(1, "يجب اختيار المستخدم"),
  currency: z.string().min(1, "يجب اختيار العملة"),
  courseId: z.string().min(1, "يجب اختيار الدورة"),
  coursePriceCents: z.number().min(0, "سعر الدورة يجب أن يكون 0 أو أكبر"),
  couponId: z.string().optional(),
  discountCents: z.number().min(0, "مبلغ التخفيض يجب أن يكون 0 أو أكبر"),
  taxCents: z.number().min(0, "الضريبة يجب أن تكون 0 أو أكبر"),
});

export type IOrderForm = z.infer<typeof orderSchema>;

export const orderFormSchema = orderSchema;
export type OrderFormData = IOrderForm;
