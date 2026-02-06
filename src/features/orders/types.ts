export type Order = {
  userId: string;
  subtotalCents: number;
  discountCents: number;
  taxCents: number;
  totalCents: number;
  currency: string;
  couponId?: string;
  couponCode?: string;
  items: {
    courseId: string;
    priceCents: number;
    currency: string;
  }[];
};

// Form-specific types for internal state management
export type OrderFormSelectOption = {
  value: string;
  label: string;
  [key: string]: string | number | boolean;
};

export type OrderFormData = {
  // Select options
  user: OrderFormSelectOption | null;
  courses: OrderFormSelectOption[];
  currency: OrderFormSelectOption | null;
  coupon: OrderFormSelectOption | null;
  
  // Core order data (in cents)
  subtotalCents: number;
  discountCents: number;
  taxCents: number;
  totalCents: number;
  
  // Additional fields
  couponCode?: string;
};

export interface FormOrderProps {
  mode: "create" | "edit";
  initialData?: Partial<OrderFormData>;
  onSubmit: (data: Order) => void | Promise<void>;
  onCancel?: () => void;
  isLoading?: boolean;
}
