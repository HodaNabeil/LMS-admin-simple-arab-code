import { CreateCouponDtoType } from "@/types/api.generated";
import { z } from "zod";

export const couponSchema = z.object({
    code: z.string().min(1, { message: "كود الكوبون مطلوب" }),
    value: z.coerce.number().min(1, { message: "قيمة التخفيض يجب أن تكون أكبر من 1" }),
    type: z.nativeEnum(CreateCouponDtoType, { errorMap: () => ({ message: "نوع التخفيض مطلوب" }) }),
    expiresAt: z.string().min(1, { message: "تاريخ الانتهاء مطلوب" }),
    startsAt: z.string().min(1, { message: "تاريخ البدء مطلوب" }),
    maxUses: z.coerce.number().min(1, { message: "الحد الأقصى للاستخدام مطلوب" }),
    maxUsesPerUser: z.coerce.number().min(1, { message: "الحد الأقصى لكل مستخدم مطلوب" }).default(1),
    minOrderAmount: z.coerce.number().min(0, { message: "أقل قيمة للطلب مطلوبة" }),
    description: z.string().min(1, { message: "وصف الكوبون مطلوب" }),
    allCourses: z.boolean().default(false),
    isActive: z.boolean().default(true),
});

export type CouponSchema = z.infer<typeof couponSchema>;
