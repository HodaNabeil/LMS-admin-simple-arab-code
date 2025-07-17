import * as z from "zod";

export const goalsSchema = z.object({
    whatWillStudentsLearn: z
    .string()
    .trim()
    .min(4, { message: "الاسم يجب أن يكون على الأقل 4 أحرف" })
    .max(10, { message: "الاسم يجب ألا يزيد عن 10 أحرف" }),
    requirements: z.string().min(1, { message: "المتطلبات مطلوبة" }),
    prerequisiteCourse: z.string().min(1, { message: "الكورس المتطلب مطلوب" }),
    targetAudience: z.string().min(1, { message: "الجمهور المستهدف مطلوب" }),   

});

export type IGoalsForm = z.infer<typeof goalsSchema>;
