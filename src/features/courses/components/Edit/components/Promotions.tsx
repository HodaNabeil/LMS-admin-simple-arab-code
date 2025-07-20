import { useCoupons } from "./hooks/useCoupons";
import CouponsTable from "../../../components/CouponsTable";
import CreateCouponDialog from "../../../components/CreateCouponDialog";
import type { Coupon } from "@/types/course";


export default function Promotions() {
  const {
    coupons,
    isLoading,
    createCoupon,
    deleteCoupon,
    isCreating,
  } = useCoupons();

  const handleCreateCoupon = (couponData: Omit<Coupon, 'id' | 'createdAt' | 'uses' | 'isActive'>) => {
    createCoupon(couponData);
  };

  const handleDeleteCoupon = (id: string) => {
    deleteCoupon(id);
  };

  const handleEditCoupon = (coupon: Coupon) => {
    // يمكن إضافة منطق التعديل هنا
    console.log("تعديل الكوبون:", coupon);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="md:text-xl lg:text-2xl font-bold text-primary">
          التخفيضات
        </h2>
        <CreateCouponDialog 
          onCreate={handleCreateCoupon}
          isLoading={isCreating}
        />
      </div>

      {/* الكوبونات النشطة */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">الكوبونات النشطة</h3>
        <CouponsTable
          coupons={coupons?.activeCoupons || []}
          onDelete={handleDeleteCoupon}
          onEdit={handleEditCoupon}
          isLoading={isLoading}
        />
      </div>

      {/* الكوبونات المنتهية الصلاحية */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">الكوبونات المنتهية الصلاحية</h3>
        <CouponsTable
          coupons={coupons?.expiredCoupons || []}
          onDelete={handleDeleteCoupon}
          onEdit={handleEditCoupon}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}