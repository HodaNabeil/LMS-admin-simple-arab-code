import { useNavigate } from "react-router-dom";
import { useCreateOrder } from "./useOrdersMutations";
import { type OrderFormData } from "@/validations/order";
import type { CreateOrderDtoCurrency, CreateOrderItemDtoCurrency } from "@/types";

export function useCreateOrderForm() {
  const navigate = useNavigate();
  const { mutateAsync: createOrder, isPending: isCreating } = useCreateOrder();

  const handleCreateOrder = async (data: OrderFormData) => {
    try {
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
    } catch (error) {
      console.error("Error in handleCreateOrder:", error);
    }
  };

  return {
    handleCreateOrder,
    isCreating,
  };
}
