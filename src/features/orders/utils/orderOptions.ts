import { orderStatuses, paymentMethods, currencies } from "@/types/orders";

export interface OptionType {
    value: string | number;
    label: string;
}

export const getOrderStatusOptions = (): OptionType[] =>
    orderStatuses.map((status) => ({
        value: status,
        label:
            status === "PAID"
                ? "مدفوع"
                : status === "FAILED"
                    ? "فشل الدفع"
                    : status === "PENDING"
                        ? "قيد الانتظار"
                        : status === "REFUNDED"
                            ? "مسترجع"
                            : status,
    }));

export const getPaymentMethodOptions = (): OptionType[] =>
    paymentMethods.map((method) => ({
        value: method,
        label: method === "STRIPE" ? "بطاقة/سترايب" : "دفع هاتفي",
    }));

export const getCurrencyOptions = (): OptionType[] =>
    currencies.map((currency) => ({
        value: currency,
        label: currency === "EGP" ? "جنيه مصري (EGP)" : "دولار أمريكي (USD)",
    }));

import type { Course, Coupon } from "@/types/course";
import type { User } from "@/types/user";

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
