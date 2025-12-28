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
import type { OrderFormData } from "../types";

interface EditOrderProps {
    orderId: number;
    initialData: OrderFormData;
}

export default function EditOrder({ orderId, initialData }: EditOrderProps) {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (data: OrderFormData) => {
        setIsLoading(true);
        try {
            console.log("Updating order", orderId, "with data:", data);
            // TODO: Replace with actual API call
            // await updateOrder(orderId, data);

            // Simulate API delay
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Close dialog on success
            setOpen(false);

            // TODO: Show success message
            alert("تم تحديث الطلب بنجاح");
        } catch (error) {
            console.error("Error updating order:", error);
            alert("حدث خطأ أثناء تحديث الطلب");
        } finally {
            setIsLoading(false);
        }
    };

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
                className="bg-white text-gray-900 max-w-lg w-full mx-auto rounded-xl shadow-lg max-h-[90vh] h-[90vh] overflow-y-auto p-4 sm:p-6"
            >
                <DialogHeader className="w-full">
                    <DialogTitle className="text-center w-full mb-2">
                        تعديل الطلب #{orderId}
                    </DialogTitle>
                    <DialogDescription className="text-center w-full mb-4 text-gray-500">
                        قم بتعديل بيانات الطلب
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
