/**
 * Course related constants
 * Uses OpenAPI generated types for type-safe endpoints
 */

import type { paths } from '../types/api.generated';

// Extract course endpoint paths from OpenAPI schema
export type CourseEndpointPath = Extract<
    keyof paths,
    '/api/courses' | '/api/courses/{idOrSlug}'
>;

// API endpoints (from OpenAPI schema)
export const COURSE_ENDPOINTS = {
    // Course endpoints
    LIST: '/api/courses',
    DETAIL: '/api/courses/{idOrSlug}',
    CREATE: '/api/courses',
    UPDATE: '/api/courses/{idOrSlug}',
    DELETE: '/api/courses/{idOrSlug}',
    PUBLISH: '/api/courses/{idOrSlug}/publish',
    MEDIA: '/api/courses/{idOrSlug}/media',
} as const; // Satisfies record check omitted for simplicity but good practice

// Course routes (frontend)
export const COURSE_ROUTES = {
    LIST: '/courses',
    DETAIL: '/courses/:slug',
    CREATE: '/courses/create',
    EDIT: '/courses/:slug/edit',
} as const;

export const COURSE_STATUS = {
    DRAFT: 'draft',
    PUBLISHED: 'published',
    UNPUBLISHED: 'unpublished',
} as const;

export const COURSE_VISIBILITY = {
    PUBLIC: 'PUBLIC',
    PRIVATE: 'PRIVATE',
    UNLISTED: 'UNLISTED',
} as const;

export const COURSE_LEVEL = {
    BEGINNER: 'BEGINNER',
    INTERMEDIATE: 'INTERMEDIATE',
    ADVANCED: 'ADVANCED',
} as const;
