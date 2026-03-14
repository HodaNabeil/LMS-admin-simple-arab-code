import { api } from "@/lib/axios";
import { AUTH_ENDPOINTS } from "@/constants/auth";
import type { LoginRequest, LoginResponse, RefreshTokenResponse } from "@/types/auth";
import type { User } from "@/types/user";

/**
 * Login user
 */
export async function login(credentials: LoginRequest): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>(AUTH_ENDPOINTS.LOGIN, credentials);
  console.log("response", response.data);
  return response.data;
}

/**
 * Get current user
 */
export async function getCurrentUser(): Promise<User> {
  const response = await api.get<User>(AUTH_ENDPOINTS.ME);
  return response.data;
}

/**
 * Logout user
 */
export async function logout(): Promise<void> {
  await api.post(AUTH_ENDPOINTS.LOGOUT);
}

/**
 * Refresh token
 */
export async function refreshToken(refreshToken: string): Promise<RefreshTokenResponse> {
  const response = await api.post<RefreshTokenResponse>(AUTH_ENDPOINTS.REFRESH, {
    refresh_token: refreshToken,
  });
  return response.data;
}

/**
 * Request password reset
 */
export async function requestPasswordReset(email: string): Promise<void> {
  await api.post(AUTH_ENDPOINTS.FORGOT_PASSWORD, { email });
}

/**
 * Reset password
 */
export async function resetPassword(token: string, newPassword: string): Promise<void> {
  await api.post(AUTH_ENDPOINTS.RESET_PASSWORD, { token, password: newPassword });
}
