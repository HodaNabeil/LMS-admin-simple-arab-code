import { create } from "zustand";

import {
  login as loginApi,
  getCurrentUser,
  logout as logoutApi,
  refreshToken as refreshTokenApi
} from "./services/authService";
import { authCookies } from "@/lib/cookies";
import type { User } from "@/types/user";
import type { LoginRequest, LoginResponse } from "@/types/auth";
import { Routes } from "@/constants/enums";
interface AuthState {
  // State
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;

  // Actions
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  login: (credentials: LoginRequest) => Promise<LoginResponse>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  refreshTokens: () => Promise<void>;
  clearAuth: () => void;
}

// Initialize authentication state from cookies
const initializeAuthState = () => {
  const { accessToken } = authCookies.getTokens();
  const user = authCookies.getUser();

  return {
    user,
    accessToken,
    refreshToken: null,
    isLoading: false,
    isAuthenticated: Boolean(accessToken && user),
  };
};
export const useAuthStore = create<AuthState>()((set, get) => ({
  // Initial state
  ...initializeAuthState(),
  // Actions
  setUser: (user) =>
    set(() => ({
      user,
      isAuthenticated: !!user && !!get().accessToken,
    })),



  setLoading: (loading) =>
    set(() => ({
      isLoading: loading,
    })),

  login: async (credentials) => {
    set(() => ({ isLoading: true }));

    try {
      const response: LoginResponse = await loginApi(credentials);

      let userData = response.data.user;

      // If user data is not included in login response, fetch it separately
      if (!userData && response.data.accessToken) {
        try {
          userData = await getCurrentUser();
        } catch (userError) {
          console.error("Failed to fetch user data after login:", userError);
          // Continue with login even if user fetch fails
        }
      }

      set(() => ({
        user: userData,
        accessToken: response.data.accessToken,
        isAuthenticated: true,
        isLoading: false,
      }));

      // Store in cookies
      if (response.data.accessToken) {
        authCookies.setAccessToken(response.data.accessToken);
      }
      if (userData) {
        authCookies.setUser(userData);
      }

      return response;
    } catch (error) {
      set(() => ({ isLoading: false }));
      throw error;
    }
  },


  logout: async () => {
    try {
      await logoutApi();
    } catch (error) {
      console.error("Logout API call failed:", error);
    } finally {
      // Clear state regardless of API success
      set(() => ({
        user: null,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
        isLoading: false,
      }));

      // Clear cookies
      authCookies.clearAll();

      // Redirect to login
      window.location.href = Routes.ROOT;
    }
  },

  refreshUser: async () => {
    const { accessToken } = get();
    if (!accessToken) return;

    set(() => ({ isLoading: true }));

    try {
      const user = await getCurrentUser();
      set(() => ({
        user,
        isAuthenticated: true,
        isLoading: false,
      }));

      // Update user data in cookies
      authCookies.setUser(user);
    } catch (error) {
      console.error("Failed to refresh user:", error);
      // If refresh fails, clear auth state
      get().clearAuth();
    }
  },

  refreshTokens: async () => {
    const { refreshToken } = get();
    if (!refreshToken) {
      get().clearAuth();
      return;
    }

    try {
      const response = await refreshTokenApi(refreshToken);

      set(() => ({
        accessToken: response.data.accessToken,
      }));

      if (response.data.accessToken) {
        authCookies.setAccessToken(response.data.accessToken);
      }
    } catch (error) {
      console.error("Failed to refresh tokens:", error);
      // If token refresh fails, clear auth state
      get().clearAuth();
      throw error;
    }
  },

  clearAuth: () => {
    set(() => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
    }));

    // Clear cookies
    authCookies.clearAll();
  },
}));

// Selectors for specific state slices
export const useUser = () => useAuthStore((state) => state.user);
export const useIsAuthenticated = () =>
  useAuthStore((state) => state.isAuthenticated);
export const useIsLoading = () => useAuthStore((state) => state.isLoading);

// Token selectors
export const useAccessToken = () => useAuthStore((state) => state.accessToken);
export const useRefreshToken = () =>
  useAuthStore((state) => state.refreshToken);
export const useTokens = () =>
  useAuthStore((state) => ({
    accessToken: state.accessToken,
    refreshToken: state.refreshToken,
  }));

// Individual action selectors - more stable than returning an object
export const useLogin = () => useAuthStore((state) => state.login);
export const useLogout = () => useAuthStore((state) => state.logout);
export const useRefreshUser = () => useAuthStore((state) => state.refreshUser);
export const useRefreshTokens = () =>
  useAuthStore((state) => state.refreshTokens);
export const useClearAuth = () => useAuthStore((state) => state.clearAuth);
