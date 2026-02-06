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
import FormOrder from "./form-order";
import type { Order, OrderFormData } from "../types";

interface EditOrderProps {
    orderId: string;
    initialData: OrderFormData;
}

import { useUpdateOrder } from "../hooks/useOrdersMutations";

export default function EditOrder({ orderId, initialData }: EditOrderProps) {
    const [open, setOpen] = useState(false);
    const { mutateAsync: updateOrder, isPending: isUpdating } = useUpdateOrder();

    const handleSubmit = async (data: Order) => {
        try {
            // Data is already in the correct format from the form
            // @ts-ignore - The API types might slightly differ from the form structure
            await updateOrder({ id: orderId.toString(), data: data });

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
                    className="h-8 w-8 p-0 text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                >
                    <Edit className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent
                dir="rtl"
                className="bg-white text-gray-900 max-w-2xl w-full mx-auto rounded-xl shadow-lg max-h-[90vh] overflow-y-auto p-4 sm:p-6"
            >
                <DialogHeader className="w-full">
                    <DialogTitle className="text-center w-full mb-2">
                        تعديل الطلب #{orderId}
                    </DialogTitle>
                    <DialogDescription className="text-center w-full mb-4 text-gray-500">
                        قم بتعديل بيانات الطلب مع دعم كامل للتخفيضات
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
