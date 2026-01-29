import { useParams } from "react-router-dom";
import { useCoupons, useCourse } from "@/features/courses/hooks/useCoursesQueries";
import { useCreateCoupon, useUpdateCoupon, useDeleteCouponMutation } from "@/features/courses/hooks/useCoursesMutations";
import CreateCouponDialog from "@/features/courses/manage/promotions/components/CreateCouponDialog";
import CouponsTable from "@/features/courses/manage/promotions/components/CouponsTable";
import type { CreateCouponRequest, UpdateCouponRequest } from "@/types/course";

export default function Promotions() {
  const { slug } = useParams<{ slug: string }>();
  const { data: couponsResponse, isLoading } = useCoupons();
  const { data: courseResponse } = useCourse(slug);
  const createCouponMutation = useCreateCoupon();
  const updateCouponMutation = useUpdateCoupon();
  const deleteCouponMutation = useDeleteCouponMutation();

  const courseId = courseResponse?.data?.course?.id || "";

  const coupons = couponsResponse?.data || [];
  const activeCoupons = coupons.filter((coupon) => coupon.isActive);
  const inactiveCoupons = coupons.filter((coupon) => !coupon.isActive);

  const handleCreateCoupon = async (couponData: CreateCouponRequest) => {
    await createCouponMutation.mutateAsync(couponData);
  };

  const handleDeleteCoupon = (id: string) => {
    deleteCouponMutation.mutate(id);
  };

  const handleEditCoupon = async (coupon: UpdateCouponRequest) => {
    await updateCouponMutation.mutateAsync({ id: coupon.id, data: coupon });
  };

  return (
    <main className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <CreateCouponDialog
          onSubmit={handleCreateCoupon}
          isLoading={createCouponMutation.isPending}
          courseId={courseId}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">الكوبونات النشطة</h3>
        <CouponsTable
          coupons={activeCoupons}
          onDelete={handleDeleteCoupon}
          onEdit={handleEditCoupon}
          isLoading={isLoading}
          courseId={courseId}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">توقف الكوبونات (غير نشطة)</h3>
        <CouponsTable
          coupons={inactiveCoupons}
          onDelete={handleDeleteCoupon}
          onEdit={handleEditCoupon}
          isLoading={isLoading}
          courseId={courseId}
        />
      </div>
    </main>
  );
}
