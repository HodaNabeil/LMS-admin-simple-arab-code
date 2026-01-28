import { CreateCouponDtoType } from "@/types/api.generated";
import { z } from "zod";

export const couponSchema = z.object({
    code: z.string().min(1, { message: "كود الكوبون مطلوب" }),
    value: z.coerce.number().min(1, { message: "قيمة التخفيض يجب أن تكون أكبر من 1" }),
    type: z.nativeEnum(CreateCouponDtoType, { errorMap: () => ({ message: "نوع التخفيض مطلوب" }) }),
    expiresAt: z.string().min(1, { message: "تاريخ الانتهاء مطلوب" }),
    startsAt: z.string().optional(),
    maxUses: z.coerce.number().min(1, { message: "الحد الأقصى للاستخدام مطلوب" }),
    maxUsesPerUser: z.coerce.number().min(1).default(1),
    minOrderAmount: z.coerce.number().optional(),
    description: z.string().optional(),
    allCourses: z.boolean().default(false),
    isActive: z.boolean().default(true),
});

export type CouponSchema = z.infer<typeof couponSchema>;
