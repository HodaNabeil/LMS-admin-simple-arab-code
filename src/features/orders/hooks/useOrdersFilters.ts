import { useState, useMemo } from "react";
import type { Order } from "@/types/orders";

export function useOrdersFilters(orders: Order[]) {
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [dateOrder, setDateOrder] = useState("desc");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("all");
  const [selectedCurrency, setSelectedCurrency] = useState("all");
  const [selectedAmount, setSelectedAmount] = useState("all");

  const filteredOrders = useMemo(() => {
    return orders.filter((order: Order) => {
      const matchesSearch =
        !searchTerm || order.id.toString().includes(searchTerm);

      const orderAmount = order.total || 0;

      const matchesPrice = minPrice === 0 || orderAmount >= minPrice;

      const matchesCurrency =
        selectedCurrency === "all" || order.currency === selectedCurrency;

      const matchesPayment =
        selectedPaymentMethod === "all";

      const matchesAmount =
        selectedAmount === "all" ||
        (selectedAmount === "1-5" && orderAmount >= 1 && orderAmount <= 5) ||
        (selectedAmount === "5-10" && orderAmount > 5 && orderAmount <= 10) ||
        (selectedAmount === "10+" && orderAmount > 10);

      return (
        matchesSearch &&
        matchesPrice &&
        matchesCurrency &&
        matchesPayment &&
        matchesAmount
      );
    });
  }, [
    orders,
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

  return {
    searchTerm,
    setSearchTerm,
    minPrice,
    setMinPrice,
    dateOrder,
    setDateOrder,
    selectedPaymentMethod,
    setSelectedPaymentMethod,
    selectedCurrency,
    setSelectedCurrency,
    selectedAmount,
    setSelectedAmount,
    filteredOrders,
    handleClearFilters,
  };
}
