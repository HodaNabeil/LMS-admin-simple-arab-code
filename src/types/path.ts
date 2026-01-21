import type { components } from './api.generated';

// ============================================
// Schema Types (DTOs)
// ============================================

export type Path = components['schemas']['PathDto'];
export type CreatePathRequest = components['schemas']['CreatePathDto'];
export type UpdatePathRequest = components['schemas']['UpdatePathDto'];
export type DeletePathRequest = components['schemas']['DeletePathDto'];
export interface GetPublicCoursesParams {
  page?: number;
  limit?: number;
  search?: string;
  level?: string;
  status?: 'PUBLISHED';
  visibility?: 'PUBLIC';
}

// ============================================
// Response Types
// ============================================

// Path CRUD responses
export type GetPathsResponse =
  components['schemas']['WrappedResponsePathListResponseDto'];
export type GetPathResponse =
  components['schemas']['WrappedResponsePathResponseDto'];
export type CreatePathResponse =
  components['schemas']['WrappedResponsePathResponseDto'];
export type UpdatePathResponse =
  components['schemas']['WrappedResponsePathResponseDto'];
export type DeletePathResponse =
  components['schemas']['WrappedResponseDeleteResponseDto'];
