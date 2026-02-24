/**
 * Centralized Type Exports
 * All commonly used types from generated API and custom types in one place
 * Import from here instead of individual files: import { User, Course, ... } from '@/types'
 */

// ============================================
// Generated API Types
// ============================================
import type { components, paths, operations } from './api.generated';

// Re-export for direct access
export type { components, paths, operations };

// ============================================
// User Types
// ============================================
export type User = components['schemas']['UserResponseDto'];
export type UserProfile = components['schemas']['UserProfileResponseDto'];
export type UserListResponse = components['schemas']['UserListResponseDto'];
export type CreateUserDto = components['schemas']['CreateUserDto'];
export type UpdateUserDto = components['schemas']['UpdateUserDto'];
export type { UserResponseDtoRole as UserRole } from './api.generated';

// ============================================
// Course Types
// ============================================
export type Course = components['schemas']['CourseDto'];
export type CourseResponse = components['schemas']['CourseResponseDto'];
export type CourseListResponse = components['schemas']['CourseListResponseDto'];
export type CourseOverview = components['schemas']['CourseOverviewDto'];
export type CourseOverviewResponse = components['schemas']['CourseOverviewResponseDto'];
export type CourseProgress = components['schemas']['CourseProgressResponseDto'];
export type CreateCourseDto = components['schemas']['CreateCourseDto'];
export type UpdateCourseDto = components['schemas']['UpdateCourseDto'];
export type EnrolledCourse = components['schemas']['EnrolledCourseDto'];

// ============================================
// Curriculum Types (Sections & Lectures)
// ============================================
export type Section = components['schemas']['SectionDto'];
export type SectionList = components['schemas']['SectionListResponseDto'];
export type SectionResponse = components['schemas']['SectionResponseDto'];
export type SectionStatistics = components['schemas']['SectionStatisticsDto'];
export type CreateSectionDto = components['schemas']['CreateSectionDto'];
export type UpdateSectionDto = components['schemas']['UpdateSectionDto'];
export type ReorderSectionsDto = components['schemas']['ReorderSectionsDto'];

export type Lecture = components['schemas']['LectureDto'];
export type LectureResponse = components['schemas']['LectureResponseDto'];
export type CreateLectureDto = components['schemas']['CreateLectureDto'];
export type UpdateLectureDto = components['schemas']['UpdateLectureDto'];
export type LectureProgress = components['schemas']['LectureProgressDto'];
export type LectureProgressList = components['schemas']['LectureProgressListResponseDto'];

export type Attachment = components['schemas']['AttachmentDto'];

// ============================================
// Order Types
// ============================================
export type OrderResponse = components['schemas']['OrderResponseDto'];
export type OrderItemResponse = components['schemas']['OrderItemResponseDto'];
export type PaginatedOrders = components['schemas']['PaginatedOrdersResponseDto'];
export type CreateOrderDto = components['schemas']['CreateOrderDto'];
export type CreateOrderItem = components['schemas']['CreateOrderItemDto'];
export type UpdateOrderDto = components['schemas']['UpdateOrderDto'];

// ============================================
// Payment Types
// ============================================
export type PaymentResponse = components['schemas']['PaymentResponseDto'];
export type PaymentSummary = components['schemas']['PaymentSummaryDto'];
export type PaginatedPayments = components['schemas']['PaginatedPaymentsResponseDto'];
export type CreatePaymentDto = components['schemas']['CreatePaymentDto'];
export type UpdatePaymentDto = components['schemas']['UpdatePaymentDto'];
export type CheckoutResponse = components['schemas']['CheckoutResponseDto'];
export type InitiateCheckoutDto = components['schemas']['InitiateCheckoutDto'];
export type RefundRequest = components['schemas']['RefundRequestDto'];
export type RefundResponse = components['schemas']['RefundResponseDto'];

// ============================================
// Coupon Types
// ============================================
export type Coupon = components['schemas']['CouponResponseDto'];
export type CreateCouponDto = components['schemas']['CreateCouponDto'];
export type UpdateCouponDto = components['schemas']['UpdateCouponDto'];
export type ValidateCouponDto = components['schemas']['ValidateCouponDto'];
export type CouponValidation = components['schemas']['CouponValidationResponseDto'];

// ============================================
// Path Types
// ============================================
export type Path = components['schemas']['PathDto'];
export type PathInfo = components['schemas']['PathInfoDto'];
export type PathListResponse = components['schemas']['PathListResponseDto'];
export type PathResponse = components['schemas']['PathResponseDto'];
export type CreatePathDto = components['schemas']['CreatePathDto'];
export type UpdatePathDto = components['schemas']['UpdatePathDto'];
export type DeletePathDto = components['schemas']['DeletePathDto'];

// ============================================
// Track Types
// ============================================
export type TrackResponse = components['schemas']['TrackResponseDto'];
export type TrackListResponse = components['schemas']['TrackListResponseDto'];
export type CreateTrackDto = components['schemas']['CreateTrackDto'];
export type UpdateTrackDto = components['schemas']['UpdateTrackDto'];

// ============================================
// Cart Types
// ============================================
export type CartResponse = components['schemas']['CartResponseDto'];
export type CartCoupon = components['schemas']['CartCouponDto'];
export type AddToCartDto = components['schemas']['AddToCartDto'];
export type ApplyCouponDto = components['schemas']['ApplyCouponDto'];

// ============================================
// Enrollment Types
// ============================================
export type Enrollment = components['schemas']['EnrollmentDto'];
export type MyEnrollment = components['schemas']['MyEnrollmentDto'];
export type MyEnrollmentsResponse = components['schemas']['MyEnrollmentsResponseDto'];
export type EnrollmentResponse = components['schemas']['EnrollmentResponseDto'];

// ============================================
// Auth Types
// ============================================
export type AuthResponse = components['schemas']['AuthResponseDto'];
export type LoginDto = components['schemas']['LoginDto'];
export type RegisterDto = components['schemas']['RegisterDto'];
export type ForgotPasswordDto = components['schemas']['ForgotPasswordDto'];
export type ResetPasswordDto = components['schemas']['ResetPasswordDto'];
export type RequestPasswordSetup = components['schemas']['RequestPasswordSetupDto'];
export type SetOAuthPassword = components['schemas']['SetOAuthPasswordDto'];
export type ChangePasswordDto = components['schemas']['ChangePasswordDto'];
export type ChangePasswordResponse = components['schemas']['ChangePasswordResponseDto'];
export type ChangeEmailDto = components['schemas']['ChangeEmailDto'];
export type ChangeEmailResponse = components['schemas']['ChangeEmailResponseDto'];
export type VerifyEmailDto = components['schemas']['VerifyEmailDto'];
export type VerifyEmailChange = components['schemas']['VerifyEmailChangeDto'];
export type VerifyEmailChangeResponse = components['schemas']['VerifyEmailChangeResponseDto'];
export type ResendVerification = components['schemas']['ResendVerificationDto'];
export type RefreshTokenData = components['schemas']['RefreshTokenDataDto'];

// ============================================
// Progress Types
// ============================================
export type ProgressResponse = components['schemas']['ProgressResponseDto'];
export type ProgressStats = components['schemas']['ProgressStatsResponseDto'];
export type ProgressUpdate = components['schemas']['ProgressUpdateResponseDto'];
export type UpdateProgressDto = components['schemas']['UpdateProgressDto'];

// ============================================
// Profile Types
// ============================================
export type UpdateProfileResponse = components['schemas']['UpdateProfileResponseDto'];

// ============================================
// Common Response Types
// ============================================
export type DeleteResponse = components['schemas']['DeleteResponseDto'];
export type HealthResponse = components['schemas']['HealthResponseDto'];

// Wrapped Response Types
export type WrappedAuthResponse = components['schemas']['WrappedResponseAuthResponseDto'];
export type WrappedCartResponse = components['schemas']['WrappedResponseCartResponseDto'];
export type WrappedCourseResponse = components['schemas']['WrappedResponseCourseResponseDto'];
export type WrappedCourseListResponse = components['schemas']['WrappedResponseCourseListResponseDto'];
export type WrappedCourseOverviewResponse = components['schemas']['WrappedResponseCourseOverviewResponseDto'];
export type WrappedDeleteResponse = components['schemas']['WrappedResponseDeleteResponseDto'];
export type WrappedUserListResponse = components['schemas']['WrappedResponseUserListResponseDto'];

// ============================================
// Common/Utility Types
// ============================================
export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type WrappedResponse<T> = {
  data: T;
  message?: string;
  success: boolean;
};

// ============================================
// Enum Types
// ============================================
export { 
  UserResponseDtoRole,
  CourseDtoLevel,
  CourseDtoStatus,
  CourseDtoVisibility,
  EnrollmentDtoStatus,
  AttachmentType,
  LectureType,
  CouponResponseDtoType,
  CreateCouponDtoType,
  UpdateCouponDtoType,
  CreateOrderDtoCurrency,
  CreateOrderItemDtoCurrency,
  UpdateOrderDtoCurrency,
  UpdateOrderDtoStatus,
  CreatePaymentDtoProvider,
  CreatePaymentDtoStatus,
  PaymentResponseDtoProvider,
  PaymentResponseDtoStatus,
  UpdatePaymentDtoStatus,
  PathDtoCategory,
  PathInfoDtoCategory,
  CreatePathDtoCategory,
  UpdatePathDtoCategory,
  TrackResponseDtoCategory,
  CreateTrackDtoCategory,
  UpdateTrackDtoCategory,
  CreateUserDtoRole,
  UpdateUserDtoRole,
  UpdateCourseDtoLevel,
  UpdateCourseDtoStatus,
  UpdateCourseDtoVisibility,
  UpdateCourseDtoCurrency,
  CartCouponDtoType,
  UpdateProfileResponseDtoRole,
  UserProfileResponseDtoRole,
} from './api.generated';

// Enum Aliases for convenience
export { 
  CourseDtoLevel as CourseLevel,
  CourseDtoStatus as CourseStatus,
  CourseDtoVisibility as CourseVisibility,
  EnrollmentDtoStatus as EnrollmentStatus,
  CouponResponseDtoType as CouponDiscountType,
  CreatePaymentDtoProvider as PaymentProvider,
  PaymentResponseDtoStatus as PaymentStatus,
  UpdateOrderDtoStatus as OrderStatus,
} from './api.generated';

// Query Parameter Enums
export {
  PathsApiCoursesGetParametersQueryLevel,
  PathsApiCoursesGetParametersQuerySortBy,
  PathsApiCoursesGetParametersQuerySortOrder,
  PathsApiCoursesGetParametersQueryStatus,
  PathsApiCoursesGetParametersQueryVisibility,
  PathsApiEnrollmentsGetParametersQueryStatus,
  PathsApiOrdersGetParametersQuerySortBy,
  PathsApiOrdersGetParametersQuerySortOrder,
  PathsApiOrdersGetParametersQueryStatus,
  PathsApiPaymentsGetParametersQueryStatus,
  PathsApiUsersGetParametersQueryRole,
} from './api.generated';

// ============================================
// Legacy Type Exports (for backward compatibility)
// ============================================
export type UserResponse = User[];
export type { UserListResponseDto } from './user';
