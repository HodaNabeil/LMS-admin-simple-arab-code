
import { useNavigate } from "react-router-dom";
import OrderForm from "@/features/orders/components/OrderForm";
import { CreateOrderHeader } from "@/features/orders/components/CreateOrderHeader";
import { cn } from "../../lib/utils";
import { useCreateOrderForm } from "@/features/orders/hooks/useCreateOrderForm";

export default function CreateOrder() {
  const navigate = useNavigate();
  const { handleCreateOrder, isCreating } = useCreateOrderForm();

  return (
    <div className={cn('min-h-screen', 'bg-gray-50/30')}>
      <CreateOrderHeader onCancel={() => navigate('/admin/orders')} />

      <OrderForm
        onSubmit={handleCreateOrder}
        onCancel={() => navigate('/admin/orders')}
        isLoading={isCreating}
      />
    </div>
  );
}

