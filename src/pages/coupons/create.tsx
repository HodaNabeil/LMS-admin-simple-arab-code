

import CouponForm from "@/features/coupons/components/form/CouponForm";
import { cn } from "@/lib/utils";

export default function CreateCouponPage() {
    return (
        <div className={cn('space-y-6', 'py-8' ,'px-4')}  >
          <h1 className={cn('text-2xl', 'font-bold', 'text-foreground' ,'pt-8' ,"text-center")}>إنشاء كوبون جديد</h1>
                <CouponForm />
        </div>
    );
}