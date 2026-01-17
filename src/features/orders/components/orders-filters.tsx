import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, X } from "lucide-react";

interface OrdersFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;

  minPrice: number;
  onMinPriceChange: (price: number) => void;
  onClearFilters: () => void;
  dateOrder: string;
  onDateOrderChange: (order: string) => void;
  selectedPaymentMethod: string;
  onPaymentMethodChange: (method: string) => void;
  selectedCurrency: string;
  onCurrencyChange: (currency: string) => void;
  selectedAmount: string;
  onAmountChange: (amount: string) => void;
}

function OrdersFilters({
  searchTerm,
  onSearchChange,

  minPrice,
  onMinPriceChange,
  dateOrder,
  onDateOrderChange,
  selectedPaymentMethod,
  onPaymentMethodChange,
  selectedCurrency,
  onCurrencyChange,
  selectedAmount,
  onAmountChange,
}: OrdersFiltersProps) {
  const priceRanges = [
    { label: "جميع الأسعار", value: 0 },
    { label: "مجاني", value: -1 },
    { label: "أكثر من 100 ر.س", value: 100 },
    { label: "أكثر من 200 ر.س", value: 200 },
    { label: "أكثر من 300 ر.س", value: 300 },
    { label: "أكثر من 500 ر.س", value: 500 },
  ];

  const dateOrders = [
    { label: "الأحدث أولاً", value: "desc" },
    { label: "الأقدم أولاً", value: "asc" },
  ];

  const paymentMethods = [
    { label: "الكل", value: "all" },
    { label: "محفظة إلكترونية", value: "wallet" },
    { label: "بطاقة فيزا/ماستر", value: "card" },
    { label: "Apple Pay", value: "applepay" },
    { label: "STC Pay", value: "stcpay" },
    { label: "Stripe", value: "stripe" },
  ];

  const currencies = [
    { label: "الكل", value: "all" },
    { label: "جنيه مصري (EGP)", value: "EGP" },
    { label: "ريال سعودي (SAR)", value: "SAR" },
    { label: "دولار أمريكي (USD)", value: "USD" },
  ];

  const amountOptions = [
    { label: "الكل", value: "all" },
    { label: "من 1 إلى 5", value: "1-5" },
    { label: "من 5 إلى 10", value: "5-10" },
    { label: "أكثر من 10", value: "10+" },
  ];

  const hasActiveFilters =
    searchTerm ||
    minPrice !== 0 ||
    selectedAmount !== "all" ||
    selectedCurrency !== "all" ||
    selectedPaymentMethod !== "all" ||
    dateOrder !== "desc";

  const handleClearFilters = () => {
    onSearchChange("");

    onMinPriceChange(0);
    onDateOrderChange("desc");
    onPaymentMethodChange("all");
    onCurrencyChange("all");
    onAmountChange("all");
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-600" />
          <h3 className="font-semibold text-gray-900">فلترة الدورات</h3>
        </div>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={handleClearFilters}
            className="flex items-center gap-1 text-red-600 border border-red-200 bg-gray-50 hover:bg-red-100 rounded-lg px-3 py-1.5 text-sm font-semibold transition"
            aria-label="مسح جميع الفلاتر"
          >
            <X className="w-4 h-4" />
            مسح الفلاتر
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="number"
            min="1"
            step="1"
            placeholder="ID"
            value={searchTerm}
            onChange={(e) => {
              // السماح فقط بالأرقام الصحيحة
              const val = e.target.value.replace(/[^\d]/g, "");
              onSearchChange(val);
            }}
            className="pr-10"
          />
        </div>

        {/* Price Filter */}
        <Select
          value={minPrice.toString()}
          onValueChange={(value) => onMinPriceChange(Number(value))}
        >
          <SelectTrigger>
            <SelectValue placeholder="السعر" />
          </SelectTrigger>
          <SelectContent>
            {priceRanges.map((range) => (
              <SelectItem key={range.value} value={range.value.toString()}>
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Date Order Filter */}
        <Select value={dateOrder} onValueChange={onDateOrderChange}>
          <SelectTrigger>
            <SelectValue placeholder="ترتيب التاريخ" />
          </SelectTrigger>
          <SelectContent>
            {dateOrders.map((order) => (
              <SelectItem key={order.value} value={order.value}>
                {order.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Payment Method Filter */}
        <Select
          value={selectedPaymentMethod}
          onValueChange={onPaymentMethodChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="طريقة الدفع" />
          </SelectTrigger>
          <SelectContent>
            {paymentMethods.map((method) => (
              <SelectItem key={method.value} value={method.value}>
                {method.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Currency Filter */}
        <Select value={selectedCurrency} onValueChange={onCurrencyChange}>
          <SelectTrigger>
            <SelectValue placeholder="العملة" />
          </SelectTrigger>
          <SelectContent>
            {currencies.map((currency) => (
              <SelectItem key={currency.value} value={currency.value}>
                {currency.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {/* Amount Filter */}
        <Select value={selectedAmount} onValueChange={onAmountChange}>
          <SelectTrigger>
            <SelectValue placeholder="عدد الدورات" />
          </SelectTrigger>
          <SelectContent>
            {amountOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 pt-2 mt-2 border-t border-gray-200 bg-gray-50 rounded-lg py-3 px-3 items-center">
          <span className="text-sm font-semibold text-gray-700 mr-2">
            الفلاتر النشطة:
          </span>
          {searchTerm && (
            <Badge
              variant="secondary"
              className="gap-1 text-xs px-2 py-1 flex items-center"
            >
              البحث: {searchTerm}
              <button type="button" aria-label="مسح البحث">
                <X
                  className="w-3 h-3 cursor-pointer text-gray-500 hover:text-red-500 transition"
                  onClick={() => onSearchChange("")}
                />
              </button>
            </Badge>
          )}

          {minPrice !== 0 && (
            <Badge
              variant="secondary"
              className="gap-1 text-xs px-2 py-1 flex items-center"
            >
              السعر: {minPrice === -1 ? "مجاني" : `أكثر من ${minPrice} ر.س`}
              <button type="button" aria-label="مسح السعر">
                <X
                  className="w-3 h-3 cursor-pointer text-gray-500 hover:text-red-500 transition"
                  onClick={() => onMinPriceChange(0)}
                />
              </button>
            </Badge>
          )}
          {dateOrder !== "desc" && (
            <Badge
              variant="secondary"
              className="gap-1 text-xs px-2 py-1 flex items-center"
            >
              ترتيب التاريخ:{" "}
              {dateOrders.find((d) => d.value === dateOrder)?.label}
              <button type="button" aria-label="مسح ترتيب التاريخ">
                <X
                  className="w-3 h-3 cursor-pointer text-gray-500 hover:text-red-500 transition"
                  onClick={() => onDateOrderChange("desc")}
                />
              </button>
            </Badge>
          )}
          {selectedPaymentMethod !== "all" && (
            <Badge
              variant="secondary"
              className="gap-1 text-xs px-2 py-1 flex items-center"
            >
              طريقة الدفع:{" "}
              {
                paymentMethods.find((m) => m.value === selectedPaymentMethod)
                  ?.label
              }
              <button type="button" aria-label="مسح طريقة الدفع">
                <X
                  className="w-3 h-3 cursor-pointer text-gray-500 hover:text-red-500 transition"
                  onClick={() => onPaymentMethodChange("all")}
                />
              </button>
            </Badge>
          )}
          {selectedCurrency !== "all" && (
            <Badge
              variant="secondary"
              className="gap-1 text-xs px-2 py-1 flex items-center"
            >
              العملة:{" "}
              {currencies.find((c) => c.value === selectedCurrency)?.label}
              <button type="button" aria-label="مسح العملة">
                <X
                  className="w-3 h-3 cursor-pointer text-gray-500 hover:text-red-500 transition"
                  onClick={() => onCurrencyChange("all")}
                />
              </button>
            </Badge>
          )}
          {selectedAmount !== "all" && (
            <Badge
              variant="secondary"
              className="gap-1 text-xs px-2 py-1 flex items-center"
            >
              عدد الدورات:{" "}
              {amountOptions.find((a) => a.value === selectedAmount)?.label}
              <button type="button" aria-label="مسح عدد الدورات">
                <X
                  className="w-3 h-3 cursor-pointer text-gray-500 hover:text-red-500 transition"
                  onClick={() => onAmountChange("all")}
                />
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}

export default OrdersFilters;
