import * as z from 'zod';
import {
    PathsApiTracksPostRequestBodyMultipartFormDataCategory,
    PathsApiTracksIdOrSlugPutRequestBodyMultipartFormDataCategory
} from '@/types/api.generated';

// Schema for creating new tracks
export const createTrackSchema = z.object({
    pathId: z
        .string()
        .trim()
        .min(1, { message: 'Path is required' }),

    title: z
        .string()
        .trim()
        .min(1, { message: 'Track title is required' })
        .max(255, { message: 'Track title must be less than 255 characters' }),

    slug: z
        .string()
        .trim()
        .min(1, { message: 'Slug must be at least 1 character' })
        .max(255, { message: 'Slug must be less than 255 characters' })
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
            message:
                'Slug must be lowercase alphanumeric with hyphens only (e.g., "frontend-development")',
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

    category: z.nativeEnum(PathsApiTracksPostRequestBodyMultipartFormDataCategory, {
        errorMap: () => ({ message: 'Category must be one of: WEB, MOBILE, OTHER' }),
    }),

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

    thumbnail: z
        .instanceof(File)
        .refine((file) => file.size <= 5 * 1024 * 1024, {
            message: 'Thumbnail must be less than 5MB',
        })
        .refine(
            (file) => ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'].includes(file.type),
            {
                message: 'Thumbnail must be a JPEG, PNG, JPG, or WebP image',
            }
        )
        .optional(),
});

// Schema for editing/updating tracks
export const editTrackSchema = z.object({
    pathId: z
        .string()
        .trim()
        .min(1, { message: 'Path is required' })
        .optional(),

    title: z
        .string()
        .trim()
        .min(1, { message: 'Track title is required' })
        .max(255, { message: 'Track title must be less than 255 characters' })
        .optional(),

    slug: z
        .string()
        .trim()
        .min(1, { message: 'Slug must be at least 1 character' })
        .max(255, { message: 'Slug must be less than 255 characters' })
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
            message:
                'Slug must be lowercase alphanumeric with hyphens only (e.g., "frontend-development")',
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
        .nativeEnum(PathsApiTracksIdOrSlugPutRequestBodyMultipartFormDataCategory, {
            errorMap: () => ({ message: 'Category must be one of: WEB, MOBILE, OTHER' }),
        })
        .optional(),

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

    thumbnail: z
        .instanceof(File)
        .refine((file) => file.size <= 5 * 1024 * 1024, {
            message: 'Thumbnail must be less than 5MB',
        })
        .refine(
            (file) => ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'].includes(file.type),
            {
                message: 'Thumbnail must be a JPEG, PNG, JPG, or WebP image',
            }
        )
        .optional(),

    thumbnailUrl: z.string().url().optional(),
});

// Type exports
export type CreateTrackDto = z.infer<typeof createTrackSchema>;
export type UpdateTrackDto = z.infer<typeof editTrackSchema>;

// Legacy type exports for backward compatibility
export type ITrackForm = CreateTrackDto;
export type TrackEdit = UpdateTrackDto;
