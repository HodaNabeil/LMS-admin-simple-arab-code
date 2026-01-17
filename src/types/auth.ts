import type { components } from './api.generated';

// ============================================
// Schema Types (DTOs)
// ============================================

export type AuthResponse = components['schemas']['AuthResponseDto'];
export type LoginRequest = components['schemas']['LoginDto'];
export type RegisterRequest = components['schemas']['RegisterDto'];
export type VerifyEmailRequest = components['schemas']['VerifyEmailDto'];
export type ForgotPasswordRequest = components['schemas']['ForgotPasswordDto'];
export type ResetPasswordRequest = components['schemas']['ResetPasswordDto'];
export type RequestPasswordSetupRequest =
    components['schemas']['RequestPasswordSetupDto'];
export type SetOAuthPasswordRequest =
    components['schemas']['SetOAuthPasswordDto'];
export type ResendVerificationRequest =
    components['schemas']['ResendVerificationDto'];

// ============================================
// Response Types
// ============================================

export type LoginResponse =
    components['schemas']['WrappedResponseAuthResponseDto'];
export type RegisterResponse =
    components['schemas']['WrappedResponseAuthResponseDto'];
export type VerifyEmailResponse =
    components['schemas']['WrappedResponseAuthResponseDto'];
export type ForgotPasswordResponse =
    components['schemas']['WrappedResponseAuthResponseDto'];
export type ResetPasswordResponse =
    components['schemas']['WrappedResponseAuthResponseDto'];
export type RequestPasswordSetupResponse =
    components['schemas']['WrappedResponseAuthResponseDto'];
export type SetOAuthPasswordResponse =
    components['schemas']['WrappedResponseAuthResponseDto'];
export type RefreshTokenResponse =
    components['schemas']['WrappedResponseAuthResponseDto'];
export type ResendVerificationResponse =
    components['schemas']['WrappedResponseAuthResponseDto'];