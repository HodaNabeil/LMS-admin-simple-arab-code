import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import PaymentForm from "@/features/payments/components/paymentForm";
import { cn } from "../../lib/utils";

export function CreatePayment() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">عملية دفع جديدة</Button>
      </DialogTrigger>
      <DialogContent
        dir="rtl"
        className={cn('bg-white', 'text-gray-900', 'max-w-2xl', 'w-full', 'mx-auto', 'rounded-xl', 'shadow-lg', 'max-h-[90vh]', 'overflow-y-auto', 'p-4', 'sm:p-6')}
      >
        <DialogHeader className="w-full">
          <DialogTitle className={cn('text-center', 'w-full', 'mb-2')}>
            إضافة عملية دفع جديدة
          </DialogTitle>
        </DialogHeader>


        <PaymentForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
