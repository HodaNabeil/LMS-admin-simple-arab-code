import type { components } from "./api.generated";

// Auth DTOs from the new schema
export type LoginRequest = components['schemas']['LoginDto'];
export type LoginResponse = components['schemas']['AuthResponseDto'];
export type RegisterRequest = components['schemas']['RegisterDto'];
export type RegisterResponse = components['schemas']['AuthResponseDto'];
export type VerifyEmailRequest = components['schemas']['VerifyEmailDto'];
export type ForgotPasswordRequest = components['schemas']['ForgotPasswordDto'];
export type ResetPasswordRequest = components['schemas']['ResetPasswordDto'];
export type RequestPasswordSetupRequest =
    components['schemas']['RequestPasswordSetupDto'];
export type SetOAuthPasswordRequest =
    components['schemas']['SetOAuthPasswordDto'];
export type ResendVerificationRequest =
    components['schemas']['ResendVerificationDto'];

// Response types derived from paths
export type ForgotPasswordResponse = components['schemas']['AuthResponseDto'];
export type ResetPasswordResponse = components['schemas']['AuthResponseDto'];
export type RequestPasswordSetupResponse =
    components['schemas']['AuthResponseDto'];
export type SetOAuthPasswordResponse = components['schemas']['AuthResponseDto'];
export type VerifyEmailResponse = components['schemas']['AuthResponseDto'];
export type RefreshTokenResponse = ResponseData<'/api/auth/refresh', 'post'>;