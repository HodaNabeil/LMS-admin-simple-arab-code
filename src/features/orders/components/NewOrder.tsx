import React, { useReducer } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Select, { components } from "react-select";
import type { StylesConfig, ThemeConfig, OptionProps } from "react-select";
import { orderStatuses, paymentMethods, currencies } from "@/types/orders";

const cursors = [
  {
    id: 1,
    name: "Html",
  },
  {
    id: 2,
    name: "css",
  },
  {
    id: 3,
    name: "JavaScript",
  },
];
const users = [
  {
    id: 1,
    name: "أحمد محمد",
  },
  {
    id: 2,
    name: "سارة علي",
  },
  {
    id: 3,
    name: "محمد حسن",
  },
];

// إعداد الخيارات لـ react-select
const orderStatusOptions = orderStatuses.map((status) => ({
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
const paymentMethodOptions = paymentMethods.map((method) => ({
  value: method,
  label: method === "STRIPE" ? "بطاقة/سترايب" : "دفع هاتفي",
}));
const currencyOptions = currencies.map((currency) => ({
  value: currency,
  label: currency === "EGP" ? "جنيه مصري (EGP)" : "دولار أمريكي (USD)",
}));

const courseOptions = cursors.map((cursor) => ({
  value: cursor.id,
  label: cursor.name,
}));
const userOptions = users.map((user) => ({
  value: user.id,
  label: user.name,
}));

// أنواع الخيارات
interface OptionType {
  value: string | number;
  label: string;
}

// حالة النموذج
interface OrderFormState {
  price: number;
  discountCode: string;
  orderStatus: OptionType | null;
  paymentMethod: OptionType | null;
  currency: OptionType | null;
  courses: OptionType[];
  user: OptionType | null;
}

type Action =
  | { type: "SET_PRICE"; payload: number }
  | { type: "SET_DISCOUNT_CODE"; payload: string }
  | { type: "SET_ORDER_STATUS"; payload: OptionType | null }
  | { type: "SET_PAYMENT_METHOD"; payload: OptionType | null }
  | { type: "SET_CURRENCY"; payload: OptionType | null }
  | { type: "SET_COURSES"; payload: OptionType[] }
  | { type: "SET_USER"; payload: OptionType | null };

const initialState: OrderFormState = {
  price: 0,
  discountCode: "",
  orderStatus: null,
  paymentMethod: null,
  currency: null,
  courses: [],
  user: null,
};

function reducer(state: OrderFormState, action: Action): OrderFormState {
  switch (action.type) {
    case "SET_PRICE":
      return { ...state, price: action.payload };
    case "SET_DISCOUNT_CODE":
      return { ...state, discountCode: action.payload };
    case "SET_ORDER_STATUS":
      return { ...state, orderStatus: action.payload };
    case "SET_PAYMENT_METHOD":
      return { ...state, paymentMethod: action.payload };
    case "SET_CURRENCY":
      return { ...state, currency: action.payload };
    case "SET_COURSES":
      return { ...state, courses: action.payload };
    case "SET_USER":
      return { ...state, user: action.payload };
    default:
      return state;
  }
}

// Custom Option لإظهار أيقونة صح عند الاختيار
const CustomOption = (props: OptionProps<OptionType, boolean>) => (
  <components.Option {...props}>
    <div className="flex items-center justify-between">
      <span>{props.label}</span>
      {props.isSelected && (
        <svg
          width="18"
          height="18"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 10.5L9 14.5L15 7.5"
            stroke="#0062ff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  </components.Option>
);

// توحيد الأنواع في selectStyles
const selectStyles: StylesConfig<OptionType, boolean> = {
  control: (base, state) => ({
    ...base,
    backgroundColor: "#fff",
    borderColor: "#d1d5db",
    minHeight: "36px",
    paddingTop: 2,
    paddingBottom: 2,
    paddingRight: 4,
    paddingLeft: 4,
    fontWeight: "bold",
    direction: "rtl",
    boxShadow: state.isFocused ? "0 0 0 2px #0062ff22" : undefined,
    cursor: "pointer",
  }),
  menu: (base) => ({
    ...base,
    direction: "rtl",
    zIndex: 9999,
  }),
  option: (base, state) => ({
    ...base,
    color: "#1f2937",
    backgroundColor: state.isSelected || state.isFocused ? "#f0f0f0" : "#fff",
    cursor: "pointer",
    paddingTop: 6,
    paddingBottom: 6,
    paddingRight: 8,
    paddingLeft: 8,
    fontWeight: state.isSelected ? "bold" : "normal",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  }),
  input: (base) => ({
    ...base,
    color: "#1f2937",
    padding: 0,
    direction: "rtl",
  }),
  multiValue: (base) => ({
    ...base,
    direction: "rtl",
    backgroundColor: "#e0e7ff",
    color: "#1f2937",
    fontWeight: "bold",
  }),
  multiValueLabel: (base) => ({
    ...base,
    direction: "rtl",
    color: "#1f2937",
    fontWeight: "bold",
  }),
  multiValueRemove: (base) => ({
    ...base,
    cursor: "pointer",
  }),
};

const selectTheme: ThemeConfig = (theme) => ({
  ...theme,
  borderRadius: 8,
  colors: {
    ...theme.colors,
    primary25: "#f0f0f0",
    primary: "#0062ff",
  },
  spacing: {
    ...theme.spacing,
  },
});

export function NewOrder() {
  const [state, dispatch] = useReducer(reducer, initialState);
  // console.log("Current state:", state);

  // handle submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ...إرسال البيانات أو معالجتها هنا...
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">طلب جديد</Button>
      </DialogTrigger>
      <DialogContent
        dir="rtl"
        className="bg-white text-gray-900 max-w-lg w-full mx-auto rounded-xl shadow-lg max-h-[90vh] h-[90vh] overflow-y-auto p-4 sm:p-6"
      >
        <DialogHeader className="w-full">
          <DialogTitle className="text-center w-full mb-2">
            إضافة طلب جديد
          </DialogTitle>
          <DialogDescription className="text-center w-full mb-4 text-gray-500">
            أضف طلبًا جديدًا فقط للمستخدمين الذين يدفعون نقدًا
          </DialogDescription>
        </DialogHeader>

        <form className="w-full" onSubmit={handleSubmit}>
          <div className="grid gap-4">
            {/* السعر */}
            <div className="grid gap-3">
              <label
                htmlFor="pricePaidInCents"
                className="font-bold text-gray-900 mb-1"
              >
                السعر (بالسنت)
              </label>
              <Input
                id="pricePaidInCents"
                type="number"
                min="0"
                step="1"
                name="pricePaidInCents"
                value={state.price}
                onChange={(e) =>
                  dispatch({
                    type: "SET_PRICE",
                    payload: Number(e.target.value),
                  })
                }
                className="text-gray-900 font-bold placeholder:text-gray-500 bg-white py-1 px-2"
              />
            </div>
            {/* كود الخصم */}
            <div className="grid gap-3">
              <label
                htmlFor="discountCodeId"
                className="font-bold text-gray-900 mb-1"
              >
                كود الخصم
              </label>
              <Input
                id="discountCodeId"
                name="discountCodeId"
                value={state.discountCode}
                onChange={(e) =>
                  dispatch({
                    type: "SET_DISCOUNT_CODE",
                    payload: e.target.value,
                  })
                }
                className="text-gray-900 font-bold placeholder:text-gray-500 bg-white"
              />
            </div>
            {/* حالة الطلب */}
            <div className="grid gap-3">
              <label
                htmlFor="orderStatus"
                className="font-bold text-gray-900 mb-1"
              >
                حالة الطلب
              </label>
              <Select
                inputId="orderStatus"
                options={orderStatusOptions}
                name="orderStatus"
                value={state.orderStatus}
                onChange={(option) =>
                  dispatch({
                    type: "SET_ORDER_STATUS",
                    payload: option as OptionType,
                  })
                }
                classNamePrefix="react-select"
                styles={selectStyles}
                theme={selectTheme}
                components={{ Option: CustomOption }}
                isRtl
                menuPlacement="auto"
              />
            </div>
            {/* طريقة الدفع */}
            <div className="grid gap-3">
              <label
                htmlFor="paymentMethod"
                className="font-bold text-gray-900 mb-1"
              >
                طريقة الدفع
              </label>
              <Select
                inputId="paymentMethod"
                options={paymentMethodOptions}
                name="paymentMethod"
                value={state.paymentMethod}
                onChange={(option) =>
                  dispatch({
                    type: "SET_PAYMENT_METHOD",
                    payload: option as OptionType,
                  })
                }
                classNamePrefix="react-select"
                styles={selectStyles}
                theme={selectTheme}
                components={{ Option: CustomOption }}
                isRtl
                menuPlacement="auto"
              />
            </div>
            {/* العملة */}
            <div className="grid gap-3">
              <label
                htmlFor="currency"
                className="font-bold text-gray-900 mb-1"
              >
                العملة
              </label>
              <Select
                inputId="currency"
                options={currencyOptions}
                name="currency"
                value={state.currency}
                onChange={(option) =>
                  dispatch({
                    type: "SET_CURRENCY",
                    payload: option as OptionType,
                  })
                }
                classNamePrefix="react-select"
                styles={selectStyles}
                theme={selectTheme}
                components={{ Option: CustomOption }}
                isRtl
                menuPlacement="auto"
              />
            </div>
            {/* الدورات (متعدد) */}
            <div className="grid gap-3">
              <label htmlFor="courses" className="font-bold text-gray-900 mb-1">
                اختر الدورات
              </label>
              <Select
                inputId="courses"
                options={courseOptions}
                isMulti
                name="courses"
                value={state.courses}
                onChange={(option) =>
                  dispatch({
                    type: "SET_COURSES",
                    payload: option as OptionType[],
                  })
                }
                classNamePrefix="react-select"
                styles={selectStyles}
                theme={selectTheme}
                components={{ Option: CustomOption }}
                isRtl
                menuPlacement="auto"
              />
            </div>
            {/* المستخدم */}
            <div className="grid gap-3">
              <label htmlFor="user" className="font-bold text-gray-900 mb-1">
                اختر المستخدم
              </label>
              <Select
                inputId="user"
                options={userOptions}
                name="user"
                value={state.user}
                onChange={(option) =>
                  dispatch({ type: "SET_USER", payload: option as OptionType })
                }
                classNamePrefix="react-select"
                styles={selectStyles}
                theme={selectTheme}
                components={{ Option: CustomOption }}
                isRtl
                menuPlacement="auto"
              />
            </div>
          </div>
          <DialogFooter className="flex justify-center gap-2 mt-4">
            <DialogClose asChild>
              <Button variant="outline">إلغاء</Button>
            </DialogClose>
            <Button type="submit">إضافة الطلب</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
