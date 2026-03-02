import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog";
import CouponForm from "./form/CouponForm";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Edit } from "lucide-react";
import type { Coupon } from "@/types/course";
import { useState } from "react";
import { useUpdateCoupon } from "../hooks/useCouponsMutation";
import { cn } from "../../../lib/utils";

export function EditCoupon({ coupon }: { coupon: Coupon }) {
    const [couponMenu, setCouponMenu] = useState(false);
    const mutation = useUpdateCoupon();

    return (
        <Dialog open={couponMenu} onOpenChange={(open) => setCouponMenu(open)}>
            <DialogTrigger asChild>
                <Edit className={cn('h-4', 'w-4', 'text-blue-600', 'hover:text-blue-800', 'cursor-pointer')} />
            </DialogTrigger>
            <DialogContent className={cn('sm:max-w-2xl', 'max-h-[90vh]', 'overflow-y-auto')}>
                <DialogHeader className="text-right!">
                    <DialogTitle className={cn('text-xl', 'font-semibold')}>تعديل الكوبون</DialogTitle>
                </DialogHeader>
                <CouponForm 
                    coupon={coupon}
                    setCouponMenu={setCouponMenu}
                    mutation={mutation} 
                />
            </DialogContent>
        </Dialog>
    );
}
