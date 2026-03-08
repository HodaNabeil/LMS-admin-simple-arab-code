
import { useNavigate } from "react-router-dom";
import { useCreateOrder } from "@/features/orders/hooks/useOrdersMutations";
import type {
  CreateOrderDtoCurrency,
  CreateOrderItemDtoCurrency,
} from "@/types";
import { type OrderFormData } from "@/validations/order";
import OrderForm from "@/features/orders/components/OrderForm";
import { CreateOrderHeader } from "@/features/orders/components/CreateOrderHeader";
import { cn } from "../../lib/utils";

export default function CreateOrder() {
  const navigate = useNavigate();
  const { mutateAsync: createOrder, isPending: isCreating } = useCreateOrder();

  const handleSubmit = async (data: OrderFormData) => {
    console.log("Submitting order with data:", data);
    try {
      console.log("Creating order with data:", data);

      // Calculate subtotal and total
      const subtotalCents = data.coursePriceCents;
      const totalCents = subtotalCents - data.discountCents + data.taxCents;

      // Transform form data to match API structure
      await createOrder({
        userId: data.userId,
        currency: data.currency as CreateOrderDtoCurrency,
        discountCents: data.discountCents,
        taxCents: data.taxCents,
        subtotalCents,
        totalCents,
        couponId: data.couponId,
        items: [{
          courseId: data.courseId,
          currency: data.currency as CreateOrderItemDtoCurrency,
          priceCents: data.coursePriceCents,
        }],
      });

      // Navigate back to orders list after successful creation
      navigate('/admin/orders');
      // toast.success is handled by the hook
    } catch (error) {
      // handleApiError is handled by the hook, but we catch it here to prevent further execution if needed
      console.error("Error in handleSubmit:", error);
    }
  };

  const isLoading = isCreating;

  return (
    <div className={cn('min-h-screen', 'bg-gray-50/30')}>
      <CreateOrderHeader onCancel={() => navigate('/admin/orders')} />

      {/* Form Section */}

      <OrderForm
        onSubmit={handleSubmit}
        onCancel={() => navigate('/admin/orders')}
        isLoading={isLoading}
      />
    </div>
  );
}
