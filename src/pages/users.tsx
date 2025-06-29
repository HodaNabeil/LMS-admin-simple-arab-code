import { User } from "lucide-react";
import { StatsCard } from "@/features/users/components/StatsCard";
import UsersTable from "@/features/users/components/UsersTable";
import OrdersFilters from "@/features/users/components/OrdersFilters";
import { useMemo, useState } from "react";
import OrdersTable from "@/features/users/components/OrdersTable";

const studentsData1 = [
  { date: "2025-06-12", value: 1 },
  { date: "2025-06-16", value: 4 },
  { date: "2025-06-17", value: 1 },
];
const studentsData2 = [
  { date: "2025-06-19", value: 1 },
  { date: "2025-06-12", value: 1 },
  { date: "2025-06-16", value: 10 },
  { date: "2025-06-16", value: 19 },
];
const studentsData3 = [
  { date: "2025-06-10", value: 1 },
  { date: "2025-06-11", value: 1 },
  { date: "2025-06-12", value: 1 },
  { date: "2025-06-16", value: 4 },
  { date: "2025-06-17", value: 1 },
  { date: "2025-06-18", value: 1 },
  { date: "2025-06-19", value: 1 },
];

export default function Users() {
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [dateOrder, setDateOrder] = useState("desc");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("all");
  const [selectedCurrency, setSelectedCurrency] = useState("all");
  const [selectedAmount, setSelectedAmount] = useState("all");
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
    <>
      <div className=" grid grid-cols-3 gap-1 p-2">
        <StatsCard
          title="Total Students"
          value={1}
          icon={<User className="w-5 h-5 text-gray-300" />}
          data={studentsData1}
        />
        <StatsCard
          title="New Users"
          value={8}
          icon={<User className="w-5 h-5 text-gray-300" />}
          data={studentsData3}
        />
        <StatsCard
          title="Total Users"
          value={5}
          icon={<User className="w-5 h-5 text-gray-300" />}
          data={studentsData2}
        />
      </div>
      <OrdersFilters
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

      <OrdersTable orders={filteredOrders} />
    </>
  );
}
