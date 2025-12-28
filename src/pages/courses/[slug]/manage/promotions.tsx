import type { Coupon } from "@/types/course";
import { useState } from "react";
import type { CouponsResponse } from "@/types/course";
import CreateCouponDialog from "@/features/courses/manage/components/promotions/CreateCouponDialog";
import CouponsTable from "@/features/courses/manage/components/promotions/CouponsTable";

export default function Promotions() {
  const [isCreating, setIsCreating] = useState(false);
  const [coupons, setCoupons] = useState<CouponsResponse>({
    activeCoupons: [
      {
        id: "1",
        code: "SUMMER2024",
        discount: 20,
        type: "PERCENTAGE",
        createdAt: new Date().toISOString(),
        expiresAt: new Date(
          Date.now() + 1000 * 60 * 60 * 24 * 30
        ).toISOString(),
        uses: 0,
        limit: 100,
        allCourses: true,
        isActive: true,
      },
    ],
    expiredCoupons: [
      {
        id: "2",
        code: "WINTER2023",
        discount: 50,
        type: "FIXED",
        createdAt: new Date(
          Date.now() - 1000 * 60 * 60 * 24 * 60
        ).toISOString(),
        expiresAt: new Date(
          Date.now() - 1000 * 60 * 60 * 24 * 30
        ).toISOString(),
        uses: 100,
        limit: 100,
        allCourses: false,
        isActive: false,
      },
    ],
  });

  const handleCreateCoupon = (
    couponData: Omit<Coupon, "id" | "createdAt" | "uses" | "isActive">
  ) => {
    setIsCreating(true);
    setTimeout(() => {
      const newCoupon: Coupon = {
        ...couponData,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
        uses: 0,
        isActive: true,
      };
      setCoupons((prev) => ({
        ...prev,
        activeCoupons: [newCoupon, ...prev.activeCoupons],
      }));
      setIsCreating(false);
    }, 700);
  };

  const handleDeleteCoupon = (id: string) => {
    setCoupons((prev) => {
      const active = prev.activeCoupons.filter((c) => c.id !== id);
      const expired = prev.expiredCoupons.filter((c) => c.id !== id);
      return { activeCoupons: active, expiredCoupons: expired };
    });
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
        />
      </div>

      {/* الكوبونات المنتهية الصلاحية */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">الكوبونات المنتهية الصلاحية</h3>
        <CouponsTable
          coupons={coupons?.expiredCoupons || []}
          onDelete={handleDeleteCoupon}
          onEdit={handleEditCoupon}
        />
      </div>
    </div>
  );
}
