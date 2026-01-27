import { useCoupons } from "@/features/courses/hooks/useCoursesQueries";
import { useCreateCoupon, useUpdateCoupon, useDeleteCouponMutation } from "@/features/courses/hooks/useCoursesMutations";
import CreateCouponDialog from "@/features/courses/manage/components/promotions/CreateCouponDialog";
import CouponsTable from "@/features/courses/manage/components/promotions/CouponsTable";
import type { Coupon, CreateCouponRequest } from "@/types/course";

export default function Promotions() {
  const { data: couponsResponse, isLoading } = useCoupons();
  const createCouponMutation = useCreateCoupon();
  const updateCouponMutation = useUpdateCoupon();
  const deleteCouponMutation = useDeleteCouponMutation();

  const handleCreateCoupon = (couponData: any) => {



    createCouponMutation.mutate(couponData as CreateCouponRequest);

  };

  const handleDeleteCoupon = (id: string) => {
    deleteCouponMutation.mutate(id);
  };

  const handleEditCoupon = (coupon: Coupon) => {
    const { id, ...data } = coupon;
    updateCouponMutation.mutate({ id, data: data as any });
  };

  return (
    <main className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <CreateCouponDialog
          onSubmit={handleCreateCoupon}
          isLoading={createCouponMutation.isPending}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">الكوبونات النشطة</h3>
        <CouponsTable
          coupons={couponsResponse?.activeCoupons || []}
          onDelete={handleDeleteCoupon}
          onEdit={handleEditCoupon}
          isLoading={isLoading}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">الكوبونات المنتهية الصلاحية</h3>
        <CouponsTable
          coupons={couponsResponse?.expiredCoupons || []}
          onDelete={handleDeleteCoupon}
          onEdit={handleEditCoupon}
          isLoading={isLoading}
        />
      </div>
    </main>
  );
}
