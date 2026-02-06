import { NewOrder } from "@/features/orders/components/new-order";
import OrdersFilters from "@/features/orders/components/orders-filters";
import { useOrders } from "@/features/orders/hooks/useOrdersQueries";
import { useMemo, useState } from "react";
import { Loader } from "@/components/shared/loader";
import { PageHeader } from "@/components/shared/PageHeader";
import { ShoppingCart } from "lucide-react";
import type { Order } from "@/types/orders";
import { Button } from "@/components/ui/button";
import { OrdersTable } from "@/features/orders/components/table/orders-table";

export default function Orders() {
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [dateOrder, setDateOrder] = useState("desc");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("all");
  const [selectedCurrency, setSelectedCurrency] = useState("all");
  const [selectedAmount, setSelectedAmount] = useState("all");

  const { data: ordersResponse, isPending, error, isError } = useOrders();

  const orders = useMemo(
    () => ordersResponse?.data?.orders || [],
    [ordersResponse?.data?.orders],
  );

  const filteredOrders = useMemo(() => {
    return orders.filter((order: Order) => {
      const matchesSearch =
        !searchTerm || order.id.toString().includes(searchTerm);
      const orderAmount = order.total || order.amount || order.amount || 0;
      const matchesPrice = minPrice === 0 || orderAmount >= minPrice;
      const matchesCurrency =
        selectedCurrency === "all" || order.currency === selectedCurrency;
      const matchesPayment =
        selectedPaymentMethod === "all" ||
        (order?.payment?.paymentMethod || order?.paymentMethod) === selectedPaymentMethod;
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

  if (isPending)
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader />
      </div>
    );

  if (isError && error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-6 text-center space-y-4 bg-red-50 rounded-xl border border-red-100 m-4">
        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
          <ShoppingCart className="w-6 h-6 text-red-600" />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-red-900">
            حدث خطأ أثناء تحميل الطلبات
          </h3>
          <p className="text-red-700 max-w-xs mx-auto">
            {error.message ||
              "فشل الاتصال بالخادم. يرجى المحاولة مرة أخرى لاحقاً."}
          </p>
        </div>
        <Button
          variant="outline"
          className="bg-white hover:bg-red-50 border-red-200 text-red-700 font-semibold"
          onClick={() => window.location.reload()}
        >
          إعادة المحاولة
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4">
      <PageHeader
        title="الطلبات"
        icon={ShoppingCart}
        badge={
          <div className="bg-linear-to-r from-blue-100 to-blue-200 text-blue-700 px-3 lg:px-4 py-1.5 lg:py-2 rounded-full text-sm font-medium border border-blue-300 shadow-sm">
            الطلبات ({orders.length})
          </div>
        }
      >
        <NewOrder />
      </PageHeader>

      {/* <OrderStats orders={orders} /> */}

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
    </div>
  );
}
