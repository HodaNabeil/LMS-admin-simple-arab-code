import { z } from "zod";
// import { CourseLevel, CourseStatus, CourseType } from "../types/course";

// const CourseLevelEnum = z.enum([
//   CourseLevel.ALL,
//   CourseLevel.ADVANCED,
//   CourseLevel.BEGINNER,
//   CourseLevel.INTERMEDIATE,
// ]);

// const CourseTypeEnum = z.enum([CourseType.BUNDLE, CourseType.SINGLE]);
// const CourseStatusEnum = z.enum([CourseStatus.DRAFT, CourseStatus.PUBLISHED]);

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
  heading: z.string().min(1, { message: "Course description is required." }),
  promoVideoUrl: z.string().url().optional(),
  hours: z.number().min(1, { message: "Hours is required." }),
  // level: CourseLevelEnum.default(CourseLevel.BEGINNER),
  // type: CourseTypeEnum.default(CourseType.SINGLE),
  isAvailableForPurchase: z.boolean().default(true),
  priceInCents: z.number().min(0, { message: "Price is required." }),
  insteadOf: z.number().min(0).optional(),
  pathId: z.string().min(1, { message: "Path is required." }),
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
  // status: CourseStatusEnum.default(CourseStatus.DRAFT),
};
export const courseSchema = z.object(course);

export const sectionSchema = z.object({
  name: z.string(),
  heading: z.string(),
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
});


export type GoalsSchema = z.infer<typeof goalsSchema>;
export const basicsSchema = z.object({
  name: course.name,
  slug: course.slug,
  image: course.image,
  heading: course.heading,
  promoVideoUrl: course.promoVideoUrl,
  hours: course.hours,
  insteadOf: course.insteadOf,
  pathId: course.pathId,
  video: z.custom<File>().optional(),
  description: z.string().optional(),
  level: z.string().optional(),
});

export type BasicsSchema = z.infer<typeof basicsSchema>;