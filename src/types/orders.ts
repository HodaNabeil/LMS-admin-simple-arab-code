import type { components } from './api.generated';

export const orderStatuses = ["PAID", "FAILED", "PENDING", "REFUNDED"];

export const paymentMethods = ["STRIPE", "PHONE_CASH"];

export const currencies = ["USD", "EGP"];

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
