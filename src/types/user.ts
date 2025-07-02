import { UserType } from "@/constants/enums";

export type User = {
  id(id: any): unknown;
  name: string;
  email: string;
  role: UserType;
};

export type AuthResponse = {
  user: User;
  message: string;
  access_token: string;
  refresh_token: string;
};

export type TokenRefreshResponse = {
  access_token: string;
  refresh_token: string;
};

export type LoginRequest = {
  email: string;
  password?: string;
};

export type SignupRequest = {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirm_password: string;
  user_type: UserType;
  profile_picture?: File;
};
