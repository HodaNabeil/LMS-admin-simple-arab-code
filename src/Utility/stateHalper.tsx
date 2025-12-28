// تعريف نوع الحالة
export interface OrderFormState {
  price: number;
  discountCode: string;
  orderStatus: { value: string | number; label: string } | null;
  paymentMethod: { value: string | number; label: string } | null;
  currency: { value: string | number; label: string } | null;
  courses: { value: string | number; label: string }[];
  user: { value: string | number; label: string } | null;
}

export const ReducerInitialState: { OrderFormState: OrderFormState } = {
  OrderFormState: {
    price: 0,
    discountCode: "",
    orderStatus: null,
    paymentMethod: null,
    currency: null,
    courses: [],
    user: null,
  },
};

export const ReducerHandler = (state = {}, action: any) => {
  const { type, payload } = action;
  if (!type) return state;
  switch (type) {
    case "Change": {
      return {
        ...state,
        ...payload,
      };
    }

    default:
      return {};
  }
};
