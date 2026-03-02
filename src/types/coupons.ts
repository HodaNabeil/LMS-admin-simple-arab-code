/**
 * Coupon types generated from OpenAPI schema
 * Re-exports coupon-related types from the generated API types
 */

import type { components } from './api.generated';

// Coupon DTOs
export type CouponResponseDto = components['schemas']['CouponResponseDto'];
export type CreateCouponDto = components['schemas']['CreateCouponDto'];
export type UpdateCouponDto = components['schemas']['UpdateCouponDto'];
export type ApplyCouponDto = components['schemas']['ApplyCouponDto'];
export type ValidateCouponDto = components['schemas']['ValidateCouponDto'];
export type CouponValidationResponseDto = components['schemas']['CouponValidationResponseDto'];

// Coupon Enums
export type CouponType = components['schemas']['CouponResponseDto']['type'];
export type CreateCouponType = components['schemas']['CreateCouponDto']['type'];
export type UpdateCouponType = components['schemas']['UpdateCouponDto']['type'];

// Helper types for better UX
export interface CouponFormData extends Omit<CreateCouponDto, 'courseIds'> {
  courseIds: string[];
}

export interface CouponUpdateFormData extends Partial<UpdateCouponDto> {
  courseIds?: string[];
}

export interface CouponListResponse {
  data: CouponResponseDto[];
  success: boolean;
  message?: string;
}

export interface CouponResponse {
  data: CouponResponseDto;
  success: boolean;
  message?: string;
}

// Type guards and utilities
export const isPercentageCoupon = (type: CouponType | CreateCouponType | UpdateCouponType): boolean => {
  return type === 'PERCENTAGE';
};

export const isFixedCoupon = (type: CouponType | CreateCouponType | UpdateCouponType): boolean => {
  return type === 'FIXED';
};

export const isValidCouponValue = (type: CouponType | CreateCouponType | UpdateCouponType, value: number): boolean => {
  if (isPercentageCoupon(type)) {
    return value >= 0 && value <= 100;
  }
  return value >= 0;
};