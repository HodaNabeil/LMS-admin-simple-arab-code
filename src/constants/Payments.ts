/**
 * Payment and transaction related constants
 * Uses OpenAPI generated types for type-safe endpoints
 */

import { type paths } from '../types/api.generated';

// Extract payment endpoint paths from OpenAPI schema
export type PaymentEndpointPath = Extract<
    keyof paths,
    | '/api/payments'
    | '/api/payments/{id}'
    | '/api/orders/{id}/refund'

>;

// API endpoints (from OpenAPI schema)
export const PAYMENT_ENDPOINTS = {
    // Payment endpoints
    LIST: '/api/payments',
    DETAIL: '/api/payments/{id}',
    CREATE: '/api/payments',
    UPDATE: '/api/payments/{id}',
    REFUND: '/api/orders/{id}/refund',

} as const satisfies Record<string, PaymentEndpointPath>;

// Payment status
export const PAYMENT_STATUS = {
    PENDING: 'pending',
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    FAILED: 'failed',
    REFUNDED: 'refunded',
    CANCELLED: 'cancelled',
} as const;

// Payment methods
export const PAYMENT_METHODS = {
    CREDIT_CARD: 'credit_card',
    DEBIT_CARD: 'debit_card',
    PAYPAL: 'paypal',
    STRIPE: 'stripe',
    BANK_TRANSFER: 'bank_transfer',
    WALLET: 'wallet',
} as const;

// Transaction types
export const TRANSACTION_TYPES = {
    PURCHASE: 'purchase',
    REFUND: 'refund',
    SUBSCRIPTION: 'subscription',
    DONATION: 'donation',
} as const;

// Currency codes (ISO 4217)
export const CURRENCIES = {
    USD: 'USD',
    EUR: 'EUR',
    GBP: 'GBP',
    EGP: 'EGP',
    SAR: 'SAR',
    AED: 'AED',
} as const;

// Payment routes
export const PAYMENT_ROUTES = {
    CHECKOUT: '/checkout',
    SUCCESS: '/checkout/success',
    CANCEL: '/checkout/cancel',
    HISTORY: '/payments/history',
    INVOICE: '/payments/invoice/:id',
} as const;

// Payment limits
export const PAYMENT_LIMITS = {
    MIN_AMOUNT: 1,
    MAX_AMOUNT: 100000,
    MAX_REFUND_DAYS: 30,
    MAX_TRANSACTION_DESCRIPTION_LENGTH: 500,
} as const;

// Payment processing
export const PAYMENT_PROCESSING = {
    TIMEOUT_MS: 30000, // 30 seconds
    MAX_RETRIES: 3,
    RETRY_DELAY_MS: 2000, // 2 seconds
} as const;

// Discount types
export const DISCOUNT_TYPES = {
    PERCENTAGE: 'percentage',
    FIXED_AMOUNT: 'fixed_amount',
    FREE_TRIAL: 'free_trial',
} as const;

// Coupon status
export const COUPON_STATUS = {
    ACTIVE: 'active',
    EXPIRED: 'expired',
    USED: 'used',
    DISABLED: 'disabled',
} as const;

// Invoice settings
export const INVOICE_SETTINGS = {
    MAX_ITEMS: 50,
    PAYMENT_TERMS_DAYS: 30,
    LATE_FEE_PERCENTAGE: 5,
} as const;

// Helper function to get payment status options for UI
export function getPaymentStatusOptions(): Array<{
    value: string;
    label: string;
}> {
    return [
        { value: PAYMENT_STATUS.PENDING, label: 'قيد الانتظار' },
        { value: PAYMENT_STATUS.PROCESSING, label: 'قيد المعالجة' },
        { value: PAYMENT_STATUS.COMPLETED, label: 'مكتمل' },
        { value: PAYMENT_STATUS.FAILED, label: 'فشل' },
        { value: PAYMENT_STATUS.REFUNDED, label: 'مسترد' },
        { value: PAYMENT_STATUS.CANCELLED, label: 'ملغي' },
    ];
}

// Helper function to get payment method options for UI
export function getPaymentMethodOptions(): Array<{
    value: string;
    label: string;
}> {
    return [
        { value: PAYMENT_METHODS.CREDIT_CARD, label: 'بطاقة ائتمان' },
        { value: PAYMENT_METHODS.DEBIT_CARD, label: 'بطاقة مدين' },
        { value: PAYMENT_METHODS.PAYPAL, label: 'باي بال' },
        { value: PAYMENT_METHODS.STRIPE, label: 'سترايب' },
        { value: PAYMENT_METHODS.BANK_TRANSFER, label: 'تحويل بنكي' },
        { value: PAYMENT_METHODS.WALLET, label: 'محفظة إلكترونية' },
    ];
}

// Helper function to get currency options for UI
export function getCurrencyOptions(): Array<{
    value: string;
    label: string;
    symbol: string;
}> {
    return [
        { value: CURRENCIES.USD, label: 'دولار أمريكي', symbol: '$' },
        { value: CURRENCIES.EUR, label: 'يورو', symbol: '€' },
        { value: CURRENCIES.GBP, label: 'جنيه استرليني', symbol: '£' },
        { value: CURRENCIES.EGP, label: 'جنيه مصري', symbol: 'ج.م' },
        { value: CURRENCIES.SAR, label: 'ريال سعودي', symbol: 'ر.س' },
        { value: CURRENCIES.AED, label: 'درهم إماراتي', symbol: 'د.إ' },
    ];
}

// Helper function to format currency
export function formatCurrency(
    amount: number,
    currency: string = CURRENCIES.USD,
): string {
    const currencyInfo = getCurrencyOptions().find((c) => c.value === currency);
    const symbol = currencyInfo?.symbol || '$';

    return `${symbol}${amount.toFixed(2)}`;
}

// Helper function to validate payment amount
export function isValidPaymentAmount(amount: number): boolean {
    return (
        amount >= PAYMENT_LIMITS.MIN_AMOUNT && amount <= PAYMENT_LIMITS.MAX_AMOUNT
    );
}