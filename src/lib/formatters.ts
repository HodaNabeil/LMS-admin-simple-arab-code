import { Languages } from "@/constants/enums";

const CURRENCY_FORMATTER = new Intl.NumberFormat("en-US", {
  currency: "USD",
  style: "currency",
  minimumFractionDigits: 0,
});

export function formatCurrency(amount: number) {
  return CURRENCY_FORMATTER.format(amount);
}
export function formatPercentage(number: number) {
  return `${number.toFixed(2)}%`;
}

const NUMBER_FORMATTER = new Intl.NumberFormat("en-US");

export function formatNumber(number: number) {
  return NUMBER_FORMATTER.format(number);
}

export function formatDuration(minutes: number, locale: Languages): string {
  const seconds = minutes * 60;
  const hourText = locale === Languages.ENGLISH ? "h" : " ساعة";
  const minuteText = locale === Languages.ENGLISH ? "m" : " دقيقة";
  const secondText = locale === Languages.ENGLISH ? "s" : " ثانية";

  if (seconds >= 3600) {
    const hours = Math.floor(seconds / 3600);
    return `${hours}${hourText}`;
  } else if (seconds >= 60) {
    const minutes = Math.floor(seconds / 60);
    return `${minutes}${minuteText}`;
  } else {
    return `${Math.floor(seconds)}${secondText}`;
  }
}

const DATE_TIME_FORMATTER = new Intl.DateTimeFormat("en", {
  dateStyle: "medium",
  timeStyle: "short",
});

export function formatDateTime(date: Date) {
  return DATE_TIME_FORMATTER.format(date);
}

export function formatLargeNumber(value: number): string {
  if (value >= 1000) {
    const formattedValue = (value / 1000).toFixed(1);
    return `${formattedValue}k+`;
  }
  return value.toString();
}

export function formatPaymentStatus(status: string): string {
  switch (status?.toUpperCase()) {
    case "PAID":
    case "COMPLETED":
    case "SUCCEEDED":
      return "مدفوعة";
    case "FAILED":
      return "غير مدفوعة";
    case "PENDING":
    case "PROCESSING":
      return "قيد الانتظار";
    case "REFUNDED":
      return "مستردة";
    case "CANCELLED":
      return "ملغاة";
    default:
      return status;
  }
}
export function formatPaymentMethod(method: string | undefined): string {
  if (!method) return "غير محدد";

  switch (method?.toUpperCase()) {
    case "STRIPE":
    case "CARD":
    case "CREDIT_CARD":
    case "VISA":
    case "MASTERCARD":
      return "بطاقة ائتمان";
    case "PHONE_CASH":
    case "WALLET":
    case "VODAFONE_CASH":
      return "محفظة إلكترونية";
    case "CASH":
      return "نقدًا";
    default:
      return method;
  }
}
