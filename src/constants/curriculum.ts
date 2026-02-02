/**
 * Curriculum related API endpoints
 */
export const CURRICULUM_ENDPOINTS = {
    LIST: '/api/courses/{courseIdOrSlug}/sections',
    CREATE: '/api/courses/{courseIdOrSlug}/sections',
    UPDATE: '/api/courses/{courseIdOrSlug}/sections/{id}',
    DELETE: '/api/courses/{courseIdOrSlug}/sections/{id}',
    LECTURES: {
        LIST: '/api/sections/{sectionId}/lectures',
        CREATE: '/api/sections/{sectionId}/lectures',
        UPDATE: '/api/lectures/{id}',
        DELETE: '/api/lectures/{id}',
    }
} as const;
