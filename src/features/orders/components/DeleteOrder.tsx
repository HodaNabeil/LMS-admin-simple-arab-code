import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDeleteEntity } from "@/hooks/useDeleteEntity";
import { useDeleteOrder } from "../hooks/useOrdersMutations";

export interface DeleteOrderProps {
  orderId: string;
}

export default function DeleteOrder({ orderId }: DeleteOrderProps) {
  const deleteOrderMutation = useDeleteOrder();

  const { isOpen, setIsOpen, handleDelete, isPending } = useDeleteEntity({
    mutation: deleteOrderMutation,
    successMessage: "تم حذف الطلب بنجاح",
  });

  return (
    <ConfirmDialog
      trigger={
        <Button variant="link" className="text-red-600 hover:text-red-800">
          <Trash2 className="h-4 w-4" />
        </Button>
      }
      title="حذف الطلب"
      description="هل أنت متأكد من حذف الطلب؟"
      actionLabel="حذف الطلب"
      onConfirm={() => handleDelete(orderId)}
      isLoading={isPending}
      open={isOpen}
      onOpenChange={setIsOpen}
      variant="destructive"
    />
  );
}
