/**
 * Learning path related constants
 * Uses OpenAPI generated types for type-safe endpoints
 */

import type { paths } from '../types/api.generated';

// Extract path endpoint paths from OpenAPI schema
export type PathEndpointPath = Extract<
    keyof paths,
    '/api/paths' | '/api/paths/{idOrSlug}'
>;

// API endpoints (from OpenAPI schema)
export const PATH_ENDPOINTS = {
    // Path endpoints
    LIST: '/api/paths',
    DETAIL: '/api/paths/{idOrSlug}',
    CREATE: '/api/paths',
    UPDATE: '/api/paths/{idOrSlug}',
    DELETE: '/api/paths/{idOrSlug}',
} as const satisfies Record<string, PathEndpointPath>;


// Extract track endpoint paths from OpenAPI schema
export type TrackEndpointPath = Extract<
    keyof paths,
    '/api/tracks' | '/api/tracks/{idOrSlug}'
>;

// API endpoints (from OpenAPI schema)
export const TRACKS_ENDPOINTS = {
    // tracks endpoints
    LIST: '/api/tracks',
    DETAIL: '/api/tracks/{idOrSlug}',
    CREATE: '/api/tracks',
    UPDATE: '/api/tracks/{idOrSlug}',
    DELETE: '/api/tracks/{idOrSlug}',
} as const satisfies Record<string, TrackEndpointPath>;

// Path routes
export const PATH_ROUTES = {
    LIST: '/learning-paths',
    DETAIL: '/learning-paths/:slug',
} as const;

// Content limits
export const PATH_LIMITS = {
    TITLE_MAX_LENGTH: 100,
    SUMMARY_MAX_LENGTH: 200,
    DESCRIPTION_MAX_LENGTH: 2000,
    MAX_THUMBNAIL_SIZE: 2 * 1024 * 1024, // 2MB
} as const;