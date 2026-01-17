/**
* Authentication related constants
* Uses OpenAPI generated types for type-safe endpoints
*/

import type { paths } from '../types/api.generated';

// Extract auth endpoint paths from OpenAPI schema
export type AuthEndpointPath = Extract<
    keyof paths,
    | '/api/auth/login'
    | '/api/auth/register'
    | '/api/auth/refresh'
    | '/api/auth/verify-email'
    | '/api/auth/logout'
    | '/api/auth/me'
    | '/api/auth/forgot-password'
    | '/api/auth/reset-password'
    | '/api/auth/request-password-setup'
    | '/api/auth/set-password'
    | '/api/auth/resend-verification'
>;

// Storage keys
export const AUTH_TOKEN_KEY = 'accessToken';
export const REFRESH_TOKEN_KEY = 'refreshToken';
export const USER_KEY = 'user_data';

// API endpoints (from OpenAPI schema)
export const AUTH_ENDPOINTS = {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh',
    FORGOT_PASSWORD: '/api/auth/forgot-password',
    RESET_PASSWORD: '/api/auth/reset-password',
    REQUEST_PASSWORD_SETUP: '/api/auth/request-password-setup',
    SET_PASSWORD: '/api/auth/set-password',
    VERIFY_EMAIL: '/api/auth/verify-email',
    RESEND_VERIFICATION: '/api/auth/resend-verification',
    ME: '/api/auth/me',
} as const satisfies Record<string, AuthEndpointPath>;

/**
* Auth endpoints that should NOT trigger automatic token refresh on 401
* These are public endpoints or token-related endpoints
*/
export const AUTH_NO_RETRY_ENDPOINTS: readonly string[] = [
    AUTH_ENDPOINTS.LOGIN,
    AUTH_ENDPOINTS.REGISTER,
    AUTH_ENDPOINTS.REFRESH,
    AUTH_ENDPOINTS.VERIFY_EMAIL,
] as const;

// User status
export const USER_STATUS = {
    ACTIVE: 'active',
    PENDING: 'pending',
    SUSPENDED: 'suspended',
    DELETED: 'deleted',
} as const;

// Token expiry
export const TOKEN_EXPIRY = {
    ACCESS_TOKEN: 15 * 60 * 1000, // 15 minutes
    REFRESH_TOKEN: 7 * 24 * 60 * 60 * 1000, // 7 days
    REMEMBER_ME: 30 * 24 * 60 * 60 * 1000, // 30 days
} as const;


