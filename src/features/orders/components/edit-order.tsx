import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit } from "lucide-react";

import type { OrderFormData } from "@/validations/order";
import { cn } from "../../../lib/utils";
import OrderForm from "./OrderForm";
import { useEditOrderForm } from "../hooks/useEditOrderForm";

interface EditOrderProps {
  orderId: string;
  initialData: OrderFormData;
}

export default function EditOrder({ orderId, initialData }: EditOrderProps) {
  const [open, setOpen] = useState(false);
  const { handleEditOrder, isUpdating } = useEditOrderForm(orderId.toString(), setOpen);

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
        
        <OrderForm onSubmit={handleEditOrder} initialData={initialData} isLoading={isUpdating} />
      </DialogContent>
    </Dialog>
  );
}

