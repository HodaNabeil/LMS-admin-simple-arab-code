/**
 * ============================================
 * Course Types - Centralized Type Definitions
 * ============================================
 * All course-related types in one place for easy access and maintenance.
 * Import from here: import { Course, CourseLevel, ... } from '@/types/course'
 */

import type { components, operations } from "./api.generated";
import {
  CourseDtoLevel,
  CourseDtoStatus,
  CourseDtoVisibility,
  UpdateCourseDtoLevel,
  UpdateCourseDtoStatus,
  UpdateCourseDtoVisibility,
} from "./api.generated";

// ============================================
// Core Course Types (from API)
// ============================================

/**
 * Main Course entity from API
 * Contains all course information including id, title, slug, level, status, etc.
 */
export type Course = components["schemas"]["CourseDto"];

/**
 * Course response with additional metadata
 * Extended course information for detailed views
 */
export type CourseResponse = components["schemas"]["CourseResponseDto"];

/**
 * Course list data structure
 * Contains paginated courses array and metadata
 */
export type CourseListResponseDto = components["schemas"]["CourseListResponseDto"];

/**
 * Course overview data
 * Summary information for course cards/listings
 */
export type CourseOverview = components["schemas"]["CourseOverviewDto"];

/**
 * Course overview response
 * Wrapped overview with metadata
 */
export type CourseOverviewResponse = components["schemas"]["CourseOverviewResponseDto"];

/**
 * Course progress tracking
 * User's progress through a course
 */
export type CourseProgress = components["schemas"]["CourseProgressResponseDto"];

/**
 * Enrolled course information
 * Course data for enrolled users
 */
export type EnrolledCourse = components["schemas"]["EnrolledCourseDto"];

// ============================================
// Course Enums
// ============================================

/**
 * Course difficulty level enum
 * Values: ALL_LEVELS, BEGINNER, INTERMEDIATE, ADVANCED
 */
export type CourseLevel = CourseDtoLevel;
export { CourseDtoLevel };

/**
 * Course status enum
 * Values: DRAFT, PUBLISHED, ARCHIVED
 */
export type CourseStatus = CourseDtoStatus;
export { CourseDtoStatus };

/**
 * Course visibility enum
 * Values: PUBLIC, PRIVATE, UNLISTED
 */
export type CourseVisibility = CourseDtoVisibility;
export { CourseDtoVisibility };

/**
 * Update course level enum
 * For course update operations
 */
export type UpdateCourseLevel = UpdateCourseDtoLevel;
export { UpdateCourseDtoLevel };

/**
 * Update course status enum
 * For course update operations
 */
export type UpdateCourseStatus = UpdateCourseDtoStatus;
export { UpdateCourseDtoStatus };

/**
 * Update course visibility enum
 * For course update operations
 */
export type UpdateCourseVisibility = UpdateCourseDtoVisibility;
export { UpdateCourseDtoVisibility };

// ============================================
// API Request Types (DTOs)
// ============================================

/**
 * DTO for creating a new course
 * Used in course creation API calls
 */
export type CreateCourseDto = components["schemas"]["CreateCourseDto"];
export type CreateCourseRequest = CreateCourseDto;

/**
 * DTO for updating an existing course
 * Used in course update API calls
 */
export type UpdateCourseDto = components["schemas"]["UpdateCourseDto"];
export type UpdateCourseRequest = UpdateCourseDto;

/**
 * Delete course request
 * No body required for delete operations
 */
export type DeleteCourseRequest = void;

// ============================================
// API Response Types
// ============================================

/**
 * Wrapped API response for course list (includes status, message, data)
 * Full response structure from the list endpoint
 */
export type WrappedCourseListResponse = components["schemas"]["WrappedResponseCourseListResponseDto"];
export type GetCoursesResponse = WrappedCourseListResponse;

/**
 * Wrapped API response for single course
 * Full response structure from get/create/update endpoints
 */
export type WrappedCourseResponse = components["schemas"]["WrappedResponseCourseResponseDto"];
export type GetCourseResponse = WrappedCourseResponse;
export type CreateCourseResponse = WrappedCourseResponse;
export type UpdateCourseResponse = WrappedCourseResponse;

/**
 * Wrapped API response for course overview
 * Full response structure from overview endpoint
 */
export type WrappedCourseOverviewResponse = components["schemas"]["WrappedResponseCourseOverviewResponseDto"];

/**
 * Response from deleting a course
 */
export type DeleteCourseResponse = components["schemas"]["WrappedResponseDeleteResponseDto"];

// ============================================
// Query & Filter Types
// ============================================

/**
 * Course filter options for list queries
 * Supports search, status, level, pagination, sorting, etc.
 */
export type CourseFilters = operations["CourseController_listCourses[1]"]["parameters"]["query"];

/**
 * Parameters for fetching courses by path
 * Used to get courses within a specific learning path
 */
export type GetCoursesByPathParams = operations["CourseController_getCoursesByPath[1]"]["parameters"]["query"];

// ============================================
// Form & Validation Types
// ============================================

/**
 * Course basics form data
 * Used in the basics step of course creation/editing
 */
export interface CourseBasicsFormData {
  title: string;
  slug: string;
  level: CourseLevel;
  thumbnail?: File | string;
  hours: number;
  description?: string;
  shortDescription?: string;
  previewVideo?: File;
}

/**
 * Course goals form data
 * Used in the goals step of course management
 */
export interface CourseGoalsFormData {
  whatYouWillLearn: { data: string[] };
  knowledgeNeeded?: string;
  whoIsThisFor: { data: string[] };
  prerequisites?: string[];
}

/**
 * Course pricing form data
 * Used in the pricing step of course management
 */
export interface CoursePricingFormData {
  price: number;
  compareAtPrice?: number;
}

/**
 * Course availability form data
 * Used in the availability step
 */
export interface CourseAvailabilityFormData {
  isAvailableForPurchase: boolean;
  status?: CourseStatus;
  visibility?: CourseVisibility;
}

/**
 * Create course initial form data
 * Minimal data needed to create a course
 */
export interface CreateCourseFormData {
  slug: string;
  trackId: string;
  pathId: string;
}

// ============================================
// Component Props Types
// ============================================

/**
 * Props for course table components
 */
export interface CourseTableProps {
  courses: Course[];
  isLoading?: boolean;
  onEdit?: (course: Course) => void;
  onDelete?: (course: Course) => void;
}

/**
 * Props for course stats components
 */
export interface CourseStatsProps {
  courses: Course[];
}

/**
 * Props for course form component
 */
export interface CourseFormProps {
  course?: Course;
  mode?: 'create' | 'edit';
  onSubmit?: (data: UpdateCourseRequest) => void;
}

/**
 * Props for course filters component
 */
export interface CourseFiltersProps {
  onFilterChange: (filters: CourseFilters) => void;
  currentFilters?: CourseFilters;
}

/**
 * Props for delete course dialog
 */
export interface DeleteCourseProps {
  course: Course;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// ============================================
// Coupon Types (Course Promotions)
// ============================================

/**
 * Coupon entity
 * Discount coupons for courses
 */
export type Coupon = components["schemas"]["CouponResponseDto"];

/**
 * DTO for creating a coupon
 */
export type CreateCouponDto = components["schemas"]["CreateCouponDto"];
export type CreateCouponRequest = CreateCouponDto;

/**
 * DTO for updating a coupon
 */
export type UpdateCouponRequest = { id: string } & Partial<Omit<CreateCouponRequest, "id">>;

/**
 * Coupons list response
 */
export interface CouponsResponse {
  success: boolean;
  message: string;
  data: Coupon[];
  _apiVersion?: string;
  _supportStatus?: string;
}

// ============================================
// Utility Types
// ============================================

/**
 * Partial course type for updates
 * All fields optional except slug/id
 */
export type PartialCourse = Partial<Course> & { slug?: string; id?: string };

/**
 * Course with required fields for creation
 */
export type NewCourse = Pick<Course, 'title' | 'slug'> & Partial<Omit<Course, 'id' | 'title' | 'slug'>>;

/**
 * Course option for select dropdowns
 */
export interface CourseOption {
  value: string;
  label: string;
}

/**
 * Course manage store state
 * State used in course management pages
 */
export interface CourseManageState {
  whatYouWillLearn: string[];
  whoIsThisFor: string[];
  knowledgeNeeded: string;
  prerequisites: string[];
  level: CourseLevel;
}
