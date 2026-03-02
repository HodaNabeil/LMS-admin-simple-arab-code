import { CreateCouponDtoType } from "@/types/api.generated";
import { z } from "zod";

export const couponSchema = z.object({
  code: z.string().min(1, { message: "كود الكوبون مطلوب" }),
  value: z.coerce
    .number()
    .min(1, { message: "قيمة التخفيض يجب أن تكون أكبر من 1" }),
  type: z.nativeEnum(CreateCouponDtoType, {
    errorMap: () => ({ message: "نوع التخفيض مطلوب" }),
  }),
  description: z.string().optional(),
  courseIds: z.array(z.string()),
  expiresAt: z.string().optional(),
  isActive: z.boolean(),
  maxUses: z.number().optional(),
  maxUsesPerUser: z.number().min(1, { message: "الحد الأقصى لكل مستخدم مطلوب" }),
  minOrderAmount: z.number().optional(),
  startsAt: z.string().optional(),
});

export type CouponSchema = z.infer<typeof couponSchema>;
