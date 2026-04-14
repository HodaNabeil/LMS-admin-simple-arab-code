import { useUpdateOrder } from "./useOrdersMutations";
import { type OrderFormData } from "@/validations/order";
import type { UpdateOrderRequest } from "@/types/orders";

export function useEditOrderForm(orderId: string, onToggle: (open: boolean) => void) {
  const { mutateAsync: updateOrder, isPending: isUpdating } = useUpdateOrder();

  const handleEditOrder = async (data: OrderFormData) => {
    try {
      // Calculate subtotal and total from form data
      const subtotalCents = data.coursePriceCents;
      const totalCents = data.coursePriceCents - data.discountCents + data.taxCents;
      
      const updateData: UpdateOrderRequest = {
        subtotalCents,
        discountCents: data.discountCents,
        taxCents: data.taxCents,
        totalCents,
        currency: data.currency as UpdateOrderRequest["currency"],
        couponId: data.couponId || undefined,
      };

      await updateOrder({ id: orderId, data: updateData });

      onToggle(false);
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  return {
    handleEditOrder,
    isUpdating,
  };
}
