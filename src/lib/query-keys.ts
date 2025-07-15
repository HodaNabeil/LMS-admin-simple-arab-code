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

// Query key factory for paths-related queries
export const pathKeys = {
  all: ["paths"] as const,
};

// General query key factory patterns
export const queryKeys = {
  auth: authKeys,
  paths: pathKeys,
};
