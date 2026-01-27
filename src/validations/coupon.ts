import { CreateCouponDtoType } from "@/types/api.generated";
import { z } from "zod";

export const couponSchema = z.object({
    code: z.string().min(1, { message: "كود الكوبون مطلوب" }),
    value: z.coerce.number().min(0, { message: "قيمة التخفيض يجب أن تكون أكبر من أو تساوي 0" }),
    type: z.nativeEnum(CreateCouponDtoType, { errorMap: () => ({ message: "نوع التخفيض مطلوب" }) }),
    expiresAt: z.string().optional().or(z.literal("")),
    maxUses: z.coerce.number().optional().or(z.literal("")),
    allCourses: z.boolean().default(false),
    isActive: z.boolean().default(true),
    courseIds: z.array(z.string()).default([]),
    maxUsesPerUser: z.number().default(1),
});

export type CouponSchema = z.infer<typeof couponSchema>;
