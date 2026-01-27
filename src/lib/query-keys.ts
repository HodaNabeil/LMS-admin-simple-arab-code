// Query key factory for authentication-related queries
export const authKeys = {
  all: ["auth"] as const,
  user: () => [...authKeys.all, "user"] as const,
  profile: () => [...authKeys.all, "profile"] as const,
  permissions: () => [...authKeys.all, "permissions"] as const,

  // Specific user queries
  userById: (id: string) => [...authKeys.user(), id] as const,
  userProfile: (id: string) => [...authKeys.profile(), id] as const,
};

// Query key factory for user-related queries
export const userKeys = {
  all: ["users"] as const,
  lists: () => [...userKeys.all, "list"] as const,
  list: (filters?: Record<string, unknown>) =>
    [...userKeys.lists(), filters] as const,
  details: () => [...userKeys.all, "detail"] as const,
  detail: (id: string) => [...userKeys.details(), id] as const,
  stats: () => [...userKeys.all, "stats"] as const,
};
export const pathsKeys = {
  all: ["paths"] as const,
  lists: () => [...pathsKeys.all, "list"] as const,
  list: (filters?: Record<string, unknown>) =>
    [...pathsKeys.lists(), filters] as const,
  details: () => [...pathsKeys.all, "detail"] as const,
  detail: (id: string) => [...pathsKeys.details(), id] as const,
  stats: () => [...pathsKeys.all, "stats"] as const,
};

export const coursesKeys = {
  all: ["courses"] as const,
  lists: () => [...coursesKeys.all, "list"] as const,
  list: (filters?: Record<string, unknown>) =>
    [...coursesKeys.lists(), filters] as const,
  details: () => [...coursesKeys.all, "detail"] as const,
  detail: (id: string) => [...coursesKeys.details(), id] as const,
  byPath: (params: Record<string, unknown>) =>
    [...coursesKeys.all, "by-path", params] as const,
  stats: () => [...coursesKeys.all, "stats"] as const,
};

export const tracksKeys = {
  all: ["tracks"] as const,
  lists: () => [...tracksKeys.all, "list"] as const,
  list: (filters?: Record<string, unknown>) =>
    [...tracksKeys.lists(), filters] as const,
  details: () => [...tracksKeys.all, "detail"] as const,
  detail: (id: string) => [...tracksKeys.details(), id] as const,
  stats: () => [...tracksKeys.all, "stats"] as const,
};

export const couponsKeys = {
  all: ["coupons"] as const,
  lists: () => [...couponsKeys.all, "list"] as const,
  list: (filters?: Record<string, unknown>) =>
    [...couponsKeys.lists(), filters] as const,
  details: () => [...couponsKeys.all, "detail"] as const,
  detail: (id: string) => [...couponsKeys.details(), id] as const,
};

// General query key factory patterns
export const queryKeys = {
  auth: authKeys,
  users: userKeys,
  paths: pathsKeys,
  courses: coursesKeys,
  tracks: tracksKeys,
  coupons: couponsKeys,
};
