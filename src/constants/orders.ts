import type { paths } from "../types/api.generated";

// Extract order endpoint paths from OpenAPI schema
export type OrderEndpointPath = Extract<
  keyof paths,
  | "/api/orders"
  | "/api/orders/{id}"
  | "/api/orders/{id}/refund"
  | "/api/checkout"
>;

/**
 * Order related constants
 * Uses OpenAPI generated types for type-safe endpoints
 */
export const ORDER_ENDPOINTS = {
  LIST: "/api/orders",
  DETAIL: "/api/orders/{id}",
  CREATE: "/api/orders",
  UPDATE: "/api/orders/{id}",
  DELETE: "/api/orders/{id}",
  REFUND: "/api/orders/{id}/refund",
} as const satisfies Record<string, OrderEndpointPath>;

export const ORDER_ROUTES = {
  LIST: "/orders",
  DETAIL: "/orders/:id",
} as const;
