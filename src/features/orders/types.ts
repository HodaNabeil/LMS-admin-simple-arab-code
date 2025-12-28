import type { OptionType } from "./utils/orderOptions";

export interface Order {
    id: number;
    date: string;
    PaymentMethod: string;
    price: number;
    Status: string;
    Amount: number;
    Currency: string;
}

export interface OrderFormData {
    price: number;
    discountCode: string;
    orderStatus: OptionType | null;
    paymentMethod: OptionType | null;
    currency: OptionType | null;
    courses: OptionType[];
    user: OptionType | null;
}

export interface FormOrderProps {
    mode: "create" | "edit";
    initialData?: Partial<OrderFormData>;
    onSubmit: (data: OrderFormData) => void | Promise<void>;
    onCancel?: () => void;
    isLoading?: boolean;
}
