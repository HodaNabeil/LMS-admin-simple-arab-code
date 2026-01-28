import { CourseDtoLevel } from "@/types/api.generated";
import { z } from "zod";

/**
 * Helper: Validate image (File or URL)
 */
const thumbnailSchema = z
  .union([
    z.string().url(), // For edit (existing image)
    z.custom<File>(), // For new upload
  ])
  .refine((val) => {
    // If it's URL
    if (typeof val === "string") {
      return val.length > 0;
    }

    // If it's File
    if (val instanceof File) {
      return val.size > 0 && val.type.startsWith("image/");
    }

    return false;
  }, {
    message: "Thumbnail image is required and must be a valid image",
  });

/**
 * Helper: Validate optional video
 */
const previewVideoSchema = z
  .custom<File>()
  .optional()
  .refine((file) => {
    if (!file) return true;

    return file.size > 0 && file.type.startsWith("video/");
  }, {
    message: "Preview video must be a valid video file",
  });

/**
 * Base course fields
 */
const course = {
  title: z.string().min(1, { message: "Course name is required." }),

  slug: z.string().min(1, { message: "Slug is required." }),

  thumbnail: thumbnailSchema,

  hours: z.number().min(1, { message: "Hours is required." }),

  level: z.nativeEnum(CourseDtoLevel, {
    errorMap: () => ({ message: "Level is required" }),
  }),

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

  previewVideo: previewVideoSchema,
};

/**
 * Main schema
 */
export const courseSchema = z.object(course);

/**
 * Section
 */
export const sectionSchema = z.object({
  name: z.string().min(1, "Section name is required"),
  heading: z.string().min(1, "Section heading is required"),
});

/**
 * Create Section
 */
export const createSectionCourseSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
});

/**
 * Lesson
 */
export const lessonSchema = z.object({
  name: z.string().min(1),
  heading: z.string().min(1),
});

/**
 * Validation errors type
 */
export type ValidationError = {
  [key: string]: string[] | undefined;
};

/**
 * Goals step schema
 */
export const goalsSchema = z.object({
  whatYouWillLearn: course.whatYouWillLearn,
  knowledgeNeeded: course.knowledgeNeeded,
  whoIsThisFor: course.whoIsThisFor,
  prerequisites: course.prerequisites,
});

export type GoalsSchema = z.infer<typeof goalsSchema>;

/**
 * Basics step schema
 */
export const basicsSchema = z.object({
  title: course.title,
  slug: course.slug,
  hours: course.hours,

  description: z.string().optional(),
  shortDescription: z.string().optional(),

  level: course.level,

  thumbnail: course.thumbnail,

  previewVideo: previewVideoSchema,
});

export type BasicsSchema = z.infer<typeof basicsSchema>;


export const createLessonCourseSchema = z.object({
  title: course.title,
  description: z.string().optional(),
  select: z.string().optional(),
  shortDescription: z.string().optional(),
});


export const pricingSchema = z.object({
  price: course.price,
  compareAtPrice: z.number().min(0).optional(),
});

export type PricingSchema = z.infer<typeof pricingSchema>;
