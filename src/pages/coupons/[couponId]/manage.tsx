
import { useParams } from "react-router-dom";
import { Loader } from "@/components/shared/loader";
import { useCoupon } from "@/features/coupons/hooks/useCouponsQueries";
import CouponForm from "@/features/coupons/components/form/CouponForm";
import { CouponFormHeader } from "@/features/coupons/components/form/CouponFormHeader";
import { cn } from "../../../lib/utils";

function ManageCoupon() {
  const { couponId } = useParams<{ couponId: string }>();
  const { data: coupon, isPending, error, isError } = useCoupon(couponId);

  if (isPending) {
    return (
      <div className={cn('flex', 'justify-center', 'items-center', 'min-h-screen', 'pt-20')}>
        <Loader />
      </div>
    );
  }

  if (isError) {
    return (
      <div
        className={cn('flex', 'justify-center', 'items-center', 'min-h-screen', 'pt-20')}
      >
        <div className={cn('text-red-500', 'text-center')}>
          <p>Error loading coupon data. Please try again later.</p>
          <p>{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    !isPending &&
    coupon && (
      <main className={cn('pt-20', 'pb-10')}>
        <CouponFormHeader
          title="تعديل الكوبون"
          description="قم بتحديث معلومات الكوبون الخاص بك"
        />
        <div className={cn('max-w-3xl', 'mx-auto', 'p-6', 'bg-card', 'rounded-lg', 'border', 'shadow-sm')}>
           <CouponForm coupon={coupon} />
        </div>
      </main>
    )
  );
}

export default ManageCoupon;
