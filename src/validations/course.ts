import { z } from "zod";

const course = {
  name: z.string().min(1, { message: "Course name is required." }),
  slug: z.string().min(1, { message: "Slug is required." }),
  image: z.custom(
    (val) => {
      if (val instanceof File) {
        return true;
      } else {
        return false;
      }
    },
    {
      message: "Invalid file. Please upload a valid image file.",
    }
  ),
  hours: z.number().min(1, { message: "Hours is required." }),
  level: z.string().min(1, { message: "Level is required." }),
  type: z.string().min(1, { message: "Type is required." }),
  isAvailableForPurchase: z.boolean().default(true),
  priceInCents: z.number().min(0, { message: "Price is required." }),
  whatYouWillLearn: z.object({
    data: z
      .array(z.string())
      .min(1, { message: "What you will learn is required." }),
  }),
  whoIsThisFor: z.object({
    data: z
      .array(z.string())
      .min(1, { message: "Who is this for is required." }),
  }),
  knowledgeNeeded: z.string().optional(),
  prerequisites: z.array(z.string()).optional(),
  instructor: z.string().optional(),
  price: z.number().min(0, { message: "Price is required." }),
};
export const courseSchema = z.object(course);

export const sectionSchema = z.object({
  name: z.string(),
  heading: z.string(),
});

export const createSectionCourseSchema = z.object({
  name: z.string(),
  description: z.string(),
});

export const lessonSchema = z.object({
  name: z.string(),
  heading: z.string(),
});

export type ValidationError = {
  [key: string]: string[] | undefined;
};

export const goalsSchema = z.object({
  whatYouWillLearn: course.whatYouWillLearn,
  knowledgeNeeded: course.knowledgeNeeded,
  whoIsThisFor: course.whoIsThisFor,
  prerequisites: course.prerequisites,
});

export type GoalsSchema = z.infer<typeof goalsSchema>;
export const basicsSchema = z.object({
  name: course.name,
  slug: course.slug,
  image: course.image,
  hours: course.hours,
  video: z.custom<File>().optional(),
  description: z.string().optional(),
  level: z.string().optional(),
});

export const createLessonCourseSchema = z.object({
  name: course.name,
  description: z.string().optional(),
  select: z.string().optional(),
});

export type BasicsSchema = z.infer<typeof basicsSchema>;

export const pricingSchema = z.object({
  priceInCents: z.number().min(0, { message: "Price in cents is required." }),
  price: z.number().min(0, { message: "Price in dollars is required." }),
});

export type PricingSchema = z.infer<typeof pricingSchema>;
