import { api } from "@/lib/axios";
import type {
  AuthResponse,
  LoginRequest,
  SignupRequest,
  User,
  TokenRefreshResponse,
} from "@/types/user";
import { AUTH_ENDPOINTS } from "@/constants/auth";

export const authService = {
  // Login user
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>(AUTH_ENDPOINTS.LOGIN, credentials);
    console.log("response", response);
    return response.data;
  },

  // Register user
  async signup(userData: SignupRequest): Promise<AuthResponse> {
    const formData = new FormData();

    // Append text fields
    formData.append("name", userData.name);
    formData.append("email", userData.email);
    formData.append("phone", userData.phone);
    formData.append("password", userData.password);
    formData.append("user_type", userData.user_type);

    // Append file if exists
    if (userData.profile_picture) {
      formData.append("profile_picture", userData.profile_picture);
    }

    const response = await api.post<AuthResponse>(AUTH_ENDPOINTS.REGISTER, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  // Get current user
  async getCurrentUser(): Promise<User> {
    const response = await api.get<User>(AUTH_ENDPOINTS.ME);
    return response.data;
  },

  // Logout user
  async logout(): Promise<void> {
    await api.post(AUTH_ENDPOINTS.LOGOUT);
  },

  // Refresh token
  async refreshToken(refreshToken: string): Promise<TokenRefreshResponse> {
    const response = await api.post<TokenRefreshResponse>(AUTH_ENDPOINTS.REFRESH, {
      refresh_token: refreshToken,
    });
    return response.data;
  },

  // Request password reset
  async requestPasswordReset(email: string): Promise<void> {
    await api.post(AUTH_ENDPOINTS.FORGOT_PASSWORD, { email });
  },

  // Reset password
  async resetPassword(token: string, newPassword: string): Promise<void> {
    await api.post(AUTH_ENDPOINTS.RESET_PASSWORD, { token, password: newPassword });
  },
};
