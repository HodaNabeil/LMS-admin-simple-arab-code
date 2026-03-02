import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit } from "lucide-react";
import FormOrder from "./OrderForm";
import type { Order, OrderFormData } from "../types";
import type { UpdateOrderRequest } from "@/types/orders";

interface EditOrderProps {
  orderId: string;
  initialData: OrderFormData;
  currentOrderLabel?: string;
}

import { useUpdateOrder } from "../hooks/useOrdersMutations";
import { cn } from "../../../lib/utils";

export default function EditOrder({ orderId, initialData, currentOrderLabel }: EditOrderProps) {
  const [open, setOpen] = useState(false);
  const { mutateAsync: updateOrder, isPending: isUpdating } = useUpdateOrder();

  const handleSubmit = async (data: Order) => {
    try {
      const updateData: UpdateOrderRequest = {
        subtotalCents: data.subtotalCents,
        discountCents: data.discountCents,
        taxCents: data.taxCents,
        totalCents: data.totalCents,
        currency: data.currency as UpdateOrderRequest["currency"],
        couponId: data.couponId,
        couponCode: data.couponCode,
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
      <DialogContent
        dir="rtl"
        className={cn('bg-white', 'text-gray-900', 'max-w-2xl', 'w-full', 'mx-auto', 'rounded-xl', 'shadow-lg', 'max-h-[90vh]', 'overflow-y-auto', 'p-4', 'sm:p-6')}
      >
        <DialogHeader className="w-full">
          <DialogTitle className={cn('text-center', 'w-full', 'mb-2')}>
            تعديل الطلب
          </DialogTitle>
          <DialogDescription className={cn('text-center', 'w-full', 'mb-4', 'text-gray-500')}>
            {currentOrderLabel ? currentOrderLabel : "قم بتعديل بيانات الطلب مع دعم كامل للتخفيضات"}
          </DialogDescription>
        </DialogHeader>
        <FormOrder
          mode="edit"
          initialData={initialData}
          onSubmit={handleSubmit}
          onCancel={() => setOpen(false)}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
}
