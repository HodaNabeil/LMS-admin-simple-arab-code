import type { Course, Coupon } from "@/types/course";
import type { User } from "@/types/user";
import { 
    orderStatuses, 
    paymentMethods, 
    currencies,
    orderStatusLabels,
    paymentMethodLabels,
    currencyLabels,
    type BaseOptionType
} from "@/types/orders";

// Re-export the base option type for backward compatibility
export type OptionType = BaseOptionType;

export const getOrderStatusOptions = (): OptionType[] =>
    orderStatuses.map((status) => ({
        value: status,
        label: orderStatusLabels[status],
    }));

export const getPaymentMethodOptions = (): OptionType[] =>
    paymentMethods.map((method) => ({
        value: method,
        label: paymentMethodLabels[method],
    }));

export const getCurrencyOptions = (): OptionType[] =>
    currencies.map((currency) => ({
        value: currency,
        label: currencyLabels[currency],
    }));

export const getCourseOptions = (courses: Course[]): OptionType[] =>
    courses.map((course) => ({
        value: course.id,
        label: course.title,
    }));

export const getUserOptions = (users: User[]): OptionType[] =>
    users.map((user) => ({
        value: user.id,
        label: `${user.firstName || ""} ${user.lastName || ""} (${user.email})`.trim() || user.email,
    }));

export const getCouponOptions = (coupons: Coupon[]): OptionType[] =>
    coupons.map((coupon) => ({
        value: coupon.id,
        label: coupon.code,
    }));
