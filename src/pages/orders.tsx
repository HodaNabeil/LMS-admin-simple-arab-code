import { NewOrder } from "@/features/orders/components/NewOrder";
import CourseFilters from "@/features/orders/components/OrdersFilters";
import CourseTable from "@/features/orders/components/OrdersTable";
import { useMemo, useState } from "react";

const orders = [
  {
    id: 1,
    date: "2025-06-25",
    PaymentMethod: "بطاقة فيزا/ماستر",
    Status: "مدفوع",
    Amount: 3,
    Currency: "SAR",
    price: 300,
  },
  {
    id: 2,
    date: "2025-06-24",
    PaymentMethod: "Apple Pay",
    Status: "غير مدفوع",
    Amount: 1,
    Currency: "USD",
    price: 120,
  },
  {
    id: 3,
    date: "2025-06-23",
    PaymentMethod: "محفظة إلكترونية",
    Status: "غير مدفوع",
    Amount: 5,
    Currency: "EGP",
    price: 80,
  },
  {
    id: 4,
    date: "2025-06-22",
    PaymentMethod: "Stripe",
    Status: "مدفوع",
    Amount: 2,
    Currency: "SAR",
    price: 250,
  },
  {
    id: 5,
    date: "2025-06-21",
    PaymentMethod: "STC Pay",
    Status: "مدفوع",
    Amount: 7,
    Currency: "USD",
    price: 700,
  },
];

export default function Orders() {
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [dateOrder, setDateOrder] = useState("desc");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("all");
  const [selectedCurrency, setSelectedCurrency] = useState("all");
  const [selectedAmount, setSelectedAmount] = useState("all");

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch = !searchTerm || order.id.toString() === searchTerm;
      const matchesPrice = minPrice === 0 || order.Amount >= minPrice;
      const matchesCurrency =
        selectedCurrency === "all" || order.Currency === selectedCurrency;
      const matchesPayment =
        selectedPaymentMethod === "all" ||
        order.PaymentMethod === selectedPaymentMethod;
      const matchesAmount =
        selectedAmount === "all" ||
        (selectedAmount === "1-5" && order.Amount >= 1 && order.Amount <= 5) ||
        (selectedAmount === "5-10" && order.Amount > 5 && order.Amount <= 10) ||
        (selectedAmount === "10+" && order.Amount > 10);

      return (
        matchesSearch &&
        matchesPrice &&
        matchesCurrency &&
        matchesPayment &&
        matchesAmount
      );
    });
  }, [
    searchTerm,
    minPrice,
    selectedCurrency,
    selectedPaymentMethod,
    selectedAmount,
  ]);

  const handleClearFilters = () => {
    setSearchTerm("");
    setMinPrice(0);
    setDateOrder("desc");
    setSelectedPaymentMethod("all");
    setSelectedCurrency("all");
    setSelectedAmount("all");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-4">كل الطلبات </h1>
        <NewOrder />
      </div>
      <CourseFilters
        selectedPaymentMethod={selectedPaymentMethod}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        minPrice={minPrice}
        onMinPriceChange={setMinPrice}
        dateOrder={dateOrder}
        onDateOrderChange={setDateOrder}
        onPaymentMethodChange={setSelectedPaymentMethod}
        selectedCurrency={selectedCurrency}
        onCurrencyChange={setSelectedCurrency}
        selectedAmount={selectedAmount}
        onAmountChange={setSelectedAmount}
        onClearFilters={handleClearFilters}
      />
      <CourseTable orders={filteredOrders} />
    </div>
  );
}
