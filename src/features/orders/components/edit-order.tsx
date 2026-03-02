import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,

  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit } from "lucide-react";

import type { UpdateOrderRequest } from "@/types/orders";
import type { OrderFormData } from "@/validations/order";

interface EditOrderProps {
  orderId: string;
  initialData: OrderFormData;
}

import { useUpdateOrder } from "../hooks/useOrdersMutations";
import { cn } from "../../../lib/utils";
import OrderForm from "./OrderForm";

export default function EditOrder({ orderId, initialData,    }: EditOrderProps) {
  const [open, setOpen] = useState(false);
  const { mutateAsync: updateOrder, isPending: isUpdating } = useUpdateOrder();

  const handleSubmit = async (data: OrderFormData) => {
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

      await updateOrder({ id: orderId.toString(), data: updateData });

      setOpen(false);
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  const isLoading = isUpdating;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn('h-8', 'w-8', 'p-0', 'text-blue-600', 'hover:text-blue-800', 'hover:bg-blue-50')}
        >
          <Edit className={cn('h-4', 'w-4')} />
        </Button>
      </DialogTrigger>
      <DialogContent dir="rtl">
          <DialogTitle className={cn('text-center', 'w-full', 'mb-2')}>
            تعديل الطلب
          </DialogTitle>
        
        <OrderForm onSubmit={handleSubmit} initialData={initialData} isLoading={isLoading} />
      </DialogContent>
    </Dialog>
  );
}
