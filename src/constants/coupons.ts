import type { paths } from "@/types/api.generated";

export type CouponEndpointPath = Extract<
    keyof paths,
    | "/api/coupons"
    | "/api/coupons/{id}"
    | "/api/coupons/apply"
    | "/api/coupons/remove"
    | "/api/coupons/validate"
>;

export const COUPON_ENDPOINTS = {
    LIST: "/api/coupons",
    CREATE: "/api/coupons",
    UPDATE: "/api/coupons/{id}",
    DELETE: "/api/coupons/{id}",
    APPLY: "/api/coupons/apply",
    REMOVE: "/api/coupons/remove",
    VALIDATE: "/api/coupons/validate",
} as const;
