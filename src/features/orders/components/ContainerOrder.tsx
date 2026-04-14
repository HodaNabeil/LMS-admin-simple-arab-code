import { useNavigate } from "react-router-dom";
import OrdersFilters from "@/features/orders/components/orders-filters";
import { useOrders } from "@/features/orders/hooks/useOrdersQueries";
import { useMemo } from "react";
import { Loader } from "@/components/shared/loader";
import { PageHeader } from "@/components/shared/PageHeader";
import { ShoppingCart, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OrdersTable } from "@/features/orders/components/table/orders-table";
import { useOrdersFilters } from "@/features/orders/hooks/useOrdersFilters";
import { OrdersErrorState } from "@/features/orders/components/OrdersErrorState";

export default function ContainerOrder() {
  const navigate = useNavigate();
  const { data: ordersResponse, isPending, error, isError } = useOrders();

  const orders = useMemo(
    () => ordersResponse?.data?.orders || [],
    [ordersResponse?.data?.orders],
  );

  const {
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
  } = useOrdersFilters(orders);

  if (isPending)
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader />
      </div>
    );

  if (isError && error) {
    return <OrdersErrorState message={error.message} />;
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
        <Button
          onClick={() => navigate('/admin/orders/create')}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Plus className="w-4 h-4 ml-2" />
          إضافة طلب جديد
        </Button>
      </PageHeader>

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
