import * as z from 'zod';

// Path category enum to match backend
export enum PathCategory {
  WEB = 'WEB',
  MOBILE = 'MOBILE',
  OTHER = 'OTHER',
}

// Schema for creating new paths
export const createPathSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: 'Path title is required' })
    .max(255, { message: 'Path title must be less than 255 characters' }),

  slug: z
    .string()
    .trim()
    .min(1, { message: 'Slug must be at least 1 character' })
    .max(255, { message: 'Slug must be less than 255 characters' })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message:
        'Slug must be lowercase alphanumeric with hyphens only (e.g., "arabic-language-fundamentals")',
    })
    .optional(),

  summary: z
    .string()
    .trim()
    .min(1, { message: 'Summary is required' })
    .max(200, { message: 'Summary must be less than 200 characters' }),

  description: z
    .string()
    .trim()
    .min(1, { message: 'Description is required' })
    .max(2000, { message: 'Description must be less than 2000 characters' }),




  category: z.nativeEnum(PathCategory, {
    errorMap: () => ({ message: 'Category must be one of: WEB, MOBILE, OTHER' }),
  }),

  trackIds: z.array(z.string()).optional(),

  icon: z.string().trim().optional(),

  metaTitle: z
    .string()
    .trim()
    .max(255, { message: 'Meta title must be less than 255 characters' })
    .optional(),

  metaDescription: z
    .string()
    .trim()
    .max(500, { message: 'Meta description must be less than 500 characters' })
    .optional(),
});

// Schema for editing/updating paths
export const editPathSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: 'Path title is required' })
    .max(255, { message: 'Path title must be less than 255 characters' })
    .optional(),

  slug: z
    .string()
    .trim()
    .min(1, { message: 'Slug must be at least 1 character' })
    .max(255, { message: 'Slug must be less than 255 characters' })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message:
        'Slug must be lowercase alphanumeric with hyphens only (e.g., "arabic-language-fundamentals")',
    })
    .optional(),

  summary: z
    .string()
    .trim()
    .min(1, { message: 'Summary is required' })
    .max(200, { message: 'Summary must be less than 200 characters' })
    .optional(),

  description: z
    .string()
    .trim()
    .min(1, { message: 'Description is required' })
    .max(2000, { message: 'Description must be less than 2000 characters' })
    .optional(),



  category: z
    .nativeEnum(PathCategory, {
      errorMap: () => ({ message: 'Category must be one of: WEB, MOBILE, OTHER' }),
    })
    .optional(),

  trackIds: z.array(z.string()).optional(),

  icon: z.string().trim().optional(),

  isPublished: z.boolean().optional(),

  sortOrder: z
    .number()
    .min(0, { message: 'Sort order must be 0 or greater' })
    .optional(),

  metaTitle: z
    .string()
    .trim()
    .max(255, { message: 'Meta title must be less than 255 characters' })
    .optional(),

  metaDescription: z
    .string()
    .trim()
    .max(500, { message: 'Meta description must be less than 500 characters' })
    .optional(),
});

// Type exports
export type CreatePathDto = z.infer<typeof createPathSchema>;
export type UpdatePathDto = z.infer<typeof editPathSchema>;

// Legacy type exports for backward compatibility
export type IPathForm = CreatePathDto;
export type PathEdit = UpdatePathDto;
