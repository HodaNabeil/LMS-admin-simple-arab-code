import type { components } from './api.generated';

// ============================================
// Schema Types (DTOs)
// ============================================

export type Course = components['schemas']['CourseDto'];
export type CreateCourseRequest = components['schemas']['CreateCourseDto'];
export type UpdateCourseRequest = components['schemas']['UpdateCourseDto'];
export type DeleteCourseRequest = void; // No body for delete usually

// Use Enums from api.generated directly if needed, or re-export them
export type CourseLevel = components['schemas']['CourseDto']['level'];
export type CourseStatus = components['schemas']['CourseDto']['status'];
export type UpdateCourseStatus = components['schemas']['UpdateCourseDto']['status'];
export type CourseVisibility = components['schemas']['CourseDto']['visibility'];
export type UpdateCourseVisibility = components['schemas']['UpdateCourseDto']['visibility'];
export type UpdateCourseLevel = components['schemas']['UpdateCourseDto']['level'];

// ============================================
// Response Types
// ============================================

export type GetCoursesResponse =
  components['schemas']['WrappedResponseCourseListResponseDto'];
export type GetCourseResponse =
  components['schemas']['WrappedResponseCourseResponseDto'];
export type CreateCourseResponse =
  components['schemas']['WrappedResponseCourseResponseDto'];
export type UpdateCourseResponse =
  components['schemas']['WrappedResponseCourseResponseDto'];
export type DeleteCourseResponse =
  components['schemas']['WrappedResponseDeleteResponseDto'];

// Re-export specific enums if needed by UI components
export enum CourseType {
  SINGLE = "SINGLE",
  BUNDLE = "BUNDLE",
}

// Keep existing non-DTO types if they are still relevant or used elsewhere
export interface Coupon {
  id: string;
  code: string;
  discount: number;
  type: 'FIXED' | 'PERCENTAGE';
  createdAt: string;
  expiresAt: string;
  uses: number;
  limit: number;
  allCourses: boolean;
  isActive: boolean;
}

export interface CouponsResponse {
  activeCoupons: Coupon[];
  expiredCoupons: Coupon[];
}

export interface CourseFilters {
  searchTerm: string;
  selectedCategory: string;
  selectedLevel: string;
  selectedType: string;
  minPrice: number;
}