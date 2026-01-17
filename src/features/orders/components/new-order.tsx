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
import FormOrder from "./form-order";
import type { OrderFormData } from "../types";

export function NewOrder() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: OrderFormData) => {
    setIsLoading(true);
    try {
      console.log("Creating order with data:", data);
      // TODO: Replace with actual API call
      // await createOrder(data);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Close dialog on success
      setOpen(false);

      // TODO: Show success message
      alert("تم إضافة الطلب بنجاح");
    } catch (error) {
      console.error("Error creating order:", error);
      alert("حدث خطأ أثناء إضافة الطلب");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">طلب جديد</Button>
      </DialogTrigger>
      <DialogContent
        dir="rtl"
        className="bg-white text-gray-900 max-w-lg w-full mx-auto rounded-xl shadow-lg max-h-[90vh] h-[90vh] overflow-y-auto p-4 sm:p-6"
      >
        <DialogHeader className="w-full">
          <DialogTitle className="text-center w-full mb-2">
            إضافة طلب جديد
          </DialogTitle>
          <DialogDescription className="text-center w-full mb-4 text-gray-500">
            أضف طلبًا جديدًا فقط للمستخدمين الذين يدفعون نقدًا
          </DialogDescription>
        </DialogHeader>
        <FormOrder
          mode="create"
          onSubmit={handleSubmit}
          onCancel={() => setOpen(false)}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
}
