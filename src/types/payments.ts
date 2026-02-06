import type { components } from './api.generated';

// ============================================
// Schema Types (DTOs)
// ============================================

export type Payment = components['schemas']['PaymentResponseDto'];
export type PaymentSummary = components['schemas']['PaymentSummaryDto'];
export type CheckoutResponseDto = components['schemas']['CheckoutResponseDto'];
export type CreatePaymentRequest = components['schemas']['CreatePaymentDto'];
export type UpdatePaymentRequest = components['schemas']['UpdatePaymentDto'];

// ============================================
// Response Types
// ============================================

export type ListPaymentsResponse = {
    data: components['schemas']['PaginatedPaymentsResponseDto'];
    message?: string;
    success: boolean;
};

export type GetPaymentResponse = {
    data: Payment;
    message?: string;
    success: boolean;
};

export type CreatePaymentResponse = {
    data: CheckoutResponseDto;
    message?: string;
    success: boolean;
};

export type UpdatePaymentResponse = GetPaymentResponse;

export type RefundPaymentResponse = {
    message?: string;
    success: boolean;
};
