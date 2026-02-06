/**
 * ============================================
 * User Types - Centralized Type Definitions
 * ============================================
 * All user-related types in one place for easy access and maintenance.
 * Import from here: import { User, UserRole, ... } from '@/types/user'
 */

import type { components } from "./api.generated";
import { UserResponseDtoRole } from "./api.generated";

// ============================================
// Core User Types (from API)
// ============================================

/**
 * Main User entity from API
 * Contains all user information including id, name, email, role, etc.
 */
export type User = components["schemas"]["UserResponseDto"];

/**
 * User role enum - determines user permissions
 * Values: STUDENT, ADMIN, INSTRUCTOR
 */
export type UserRole = UserResponseDtoRole;

/**
 * User profile information
 * Extended user details for profile views
 */
export type UserProfile = components["schemas"]["UserProfileResponseDto"];

// ============================================
// API Request/Response Types
// ============================================

/**
 * DTO for creating a new user
 * Used in user creation API calls
 */
export type CreateUserDto = components["schemas"]["CreateUserDto"];

/**
 * DTO for updating an existing user
 * Used in user update API calls
 */
export type UpdateUserDto = components["schemas"]["UpdateUserDto"];

/**
 * Response containing list of users with pagination
 * Structure: { users: User[], total: number, page: number, limit: number }
 */
export type UserListResponseDto = components["schemas"]["UserListResponseDto"];

/**
 * Wrapped API response for user list (includes status, message, data)
 * Full response structure from the API endpoint
 */
export type WrappedUserListResponse = components["schemas"]["WrappedResponseUserListResponseDto"];

/**
 * Simple array of users
 * Alias for backward compatibility
 */
export type UserResponse = User[];

// ============================================
// Query/Hook Types
// ============================================

/**
 * Type for user list API response used in queries
 * Extracted data property from wrapped response
 */
export type UserListData = components["schemas"]["UserListResponseDto"];

/**
 * Type for complete wrapped API response
 * Full response including metadata
 */
export type UserListResponse = components["schemas"]["WrappedResponseUserListResponseDto"];

// ============================================
// Form & Validation Types
// ============================================

/**
 * User form data structure
 * Used in create/edit user forms
 * Note: 'name' is split into firstName/lastName before API submission
 */
export interface UserFormData {
  name: string;
  email: string;
  role?: UserRole;
}

/**
 * User mutation payload
 * Data structure sent to create/update mutations
 */
export interface UserMutationPayload {
  firstName: string;
  lastName?: string;
  email: string;
  role?: UserRole;
  id?: string; // Present for updates
}

// ============================================
// Component Props Types
// ============================================

/**
 * Props for user table components
 */
export interface UsersTableProps {
  users: User[];
  isLoading?: boolean;
}

/**
 * Props for user statistics components
 */
export interface UsersStatsProps {
  users: User[];
}

/**
 * Props for user filters component
 */
export interface UsersFiltersProps {
  onFilterChange: (filters: UserFilters) => void;
  currentFilters?: UserFilters;
}

// ============================================
// Utility Types
// ============================================

/**
 * Partial user type for updates
 * All fields optional except id
 */
export type PartialUser = Partial<User> & { id?: string };

/**
 * User with required fields for creation
 */
export type NewUser = Pick<User, 'email' | 'firstName'> & Partial<Omit<User, 'id' | 'email' | 'firstName'>>;

/**
 * User filter options for queries
 */
export interface UserFilters {
  search?: string;
  role?: UserRole;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// ============================================
// Auth Related User Types
// ============================================

/**
 * User state in auth store
 */
export interface UserState {
  user: User | null;
  isAuthenticated: boolean;
}
