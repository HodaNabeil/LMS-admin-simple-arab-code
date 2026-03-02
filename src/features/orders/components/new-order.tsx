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
import type { Order } from "../types";

import { useCreateOrder } from "../hooks/useOrdersMutations";
import type {
  CreateOrderDtoCurrency,
  CreateOrderItemDtoCurrency,
} from "@/types";
import OrderForm from "./OrderForm";

export function NewOrder() {
  const [open, setOpen] = useState(false);
  const { mutateAsync: createOrder, isPending: isCreating } = useCreateOrder();

  const handleSubmit = async (data: Order) => {
    console.log("Submitting order with data:", data);
    try {
      console.log("Creating order with data:", data);

      // Data is already in the correct format from the form
      await createOrder({
        ...data,
        currency: data.currency as CreateOrderDtoCurrency,
        items: data.items.map((item) => ({
          ...item,
          currency: item.currency as CreateOrderItemDtoCurrency,
        })),
      });

      setOpen(false);
      // toast.success is handled by the hook
    } catch (error) {
      // handleApiError is handled by the hook, but we catch it here to prevent further execution if needed
      console.error("Error in handleSubmit:", error);
    }
  };

  const isLoading = isCreating;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">عملية دفع جديدة</Button>
      </DialogTrigger>
      <DialogContent
        dir="rtl"
        className="bg-white text-gray-900 max-w-2xl w-full mx-auto rounded-xl shadow-lg max-h-[90vh] overflow-y-auto p-4 sm:p-6"
      >
        <DialogHeader className="w-full">
          <DialogTitle className="text-center w-full mb-2">
            إضافة عملية دفع جديدة
          </DialogTitle>
          <DialogDescription className="text-center w-full mb-4 text-gray-500">
            أضف عملية دفع جديدة مع دعم كامل للتخفيضات والكوبونات
          </DialogDescription>
        </DialogHeader>
        <OrderForm
          mode="create"
          onSubmit={handleSubmit}
          onCancel={() => setOpen(false)}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
}
