import type { components } from './api.generated';

export const orderStatuses = ["PAID", "FAILED", "PENDING", "REFUNDED"] as const;

export type OrderStatus = typeof orderStatuses[number];

export const paymentMethods = ["STRIPE", "PHONE_CASH"] as const;

export type PaymentMethod = typeof paymentMethods[number];

export const currencies = ["USD", "EGP"] as const;

export type Currency = typeof currencies[number];

// Common select option type for reuse across the app
export interface BaseOptionType {
    value: string | number;
    label: string;
}

// ============================================
// Localization Maps
// ============================================

export const orderStatusLabels: Record<OrderStatus, string> = {
    PAID: "مدفوع",
    FAILED: "فشل الدفع",
    PENDING: "قيد الانتظار",
    REFUNDED: "مسترجع",
};

export const paymentMethodLabels: Record<PaymentMethod, string> = {
    STRIPE: "بطاقة/سترايب",
    PHONE_CASH: "دفع هاتفي",
};

export const currencyLabels: Record<Currency, string> = {
    USD: "دولار أمريكي (USD)",
    EGP: "جنيه مصري (EGP)",
};

// ============================================
// Schema Types (DTOs)
// ============================================

export type Order = components['schemas']['OrderResponseDto'];
export type OrderItem = components['schemas']['OrderItemResponseDto'];
export type CreateOrderRequest = components['schemas']['CreateOrderDto'];
export type UpdateOrderRequest = components['schemas']['UpdateOrderDto'];

// ============================================
// Wrapped Response Types
// ============================================

export type WrappedResponseOrderListDto = {
    success: boolean;
    message?: string;
    data?: components['schemas']['PaginatedOrdersResponseDto'];
};

export type WrappedResponseOrderDto = {
    success: boolean;
    message?: string;
    data?: components['schemas']['OrderResponseDto'];
};

// ============================================
// Response Types
// ============================================

export type GetOrdersResponse = WrappedResponseOrderListDto;
export type GetOrderResponse = WrappedResponseOrderDto;
export type CreateOrderResponse = WrappedResponseOrderDto;
export type UpdateOrderResponse = WrappedResponseOrderDto;
