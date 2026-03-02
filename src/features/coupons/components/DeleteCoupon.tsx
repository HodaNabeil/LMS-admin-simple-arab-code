import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDeleteEntity } from "@/hooks/useDeleteEntity";
import { useDeleteCouponMutation } from "../hooks/useCouponsMutation";

export interface DeleteCouponProps {
    couponId: string;
    couponCode: string;
}

export default function DeleteCoupon({ couponId, couponCode }: DeleteCouponProps) {
    const deleteCouponMutation = useDeleteCouponMutation();

    const { isOpen, setIsOpen, handleDelete, isPending } = useDeleteEntity({
        mutation: deleteCouponMutation,
        successMessage: "تم حذف الكوبون بنجاح",
    });

    return (
        <ConfirmDialog
            trigger={
                <Button variant="link" className="text-red-600 hover:text-red-800 p-0 h-auto">
                    <Trash2 className="h-4 w-4" />
                </Button>
            }
            title="حذف الكوبون"
            description={`هل أنت متأكد من حذف الكوبون "${couponCode}"؟`}
            actionLabel="حذف الكوبون"
            onConfirm={() => handleDelete(couponId)}
            isLoading={isPending}
            open={isOpen}
            onOpenChange={setIsOpen}
            variant="destructive"
        />
    );
}
