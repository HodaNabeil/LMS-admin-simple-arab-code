import { z } from "zod";

export const orderSchema = z.object({
  userId: z.string().min(1, "الرجاء اختيار المستخدم"),
  courseId: z.string().min(1, "الرجاء اختيار دورة"),
  currency: z.string().min(1, "الرجاء اختيار العملة"),
  coursePriceCents: z.coerce
    .number()
    .int()
    .min(1, "الرجاء إدخال سعر صحيح للدورة"),
  couponId: z.string().optional(),
  couponCode: z.string().optional(),
  discountCents: z.coerce
    .number()
    .int()
    .min(0, "قيمة الخصم يجب أن تكون 0 أو أكبر"),
  taxCents: z.coerce.number().int().min(0, "قيمة الضريبة يجب أن تكون 0 أو أكبر"),
});

export type IOrderForm = z.infer<typeof orderSchema>;
