import { PageHeader } from "@/components/shared/PageHeader";
import { CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "../../lib/utils";
import CouponsList from "@/features/coupons/components/CouponsList";

export default function CouponsPage() {
    const navigate = useNavigate();
    return (
        <div className={cn('space-y-4', 'p-4')}>

            <PageHeader
                title="إدارة الكوبونات"
                icon={CreditCard}
            >
                <div className={cn('flex', 'items-center', 'gap-3')}>
                    <Button
                        onClick={() => navigate("/admin/coupons/create")}
                        className={cn('font-semibold', 'px-6', 'py-2', 'rounded-xl', 'shadow-lg', 'hover:shadow-xl', 'flex', 'items-center', 'gap-2')}
                    >
                        <Plus className={cn('w-5', 'h-5')} />
                        إنشاء كوبون جديد
                    </Button>
                </div>
            </PageHeader>
            <CouponsList />
        </div>
    );
}
