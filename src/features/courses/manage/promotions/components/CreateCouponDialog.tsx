import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { HashIcon } from "lucide-react";
import type { Coupon, CreateCouponRequest } from "@/types/course";
import CouponForm from "./CouponForm";
import type { CouponSchema } from "@/validations/coupon";

interface CouponFormDialogProps {
  onSubmit: (couponData: CreateCouponRequest) => void;
  isLoading?: boolean;
  initialData?: Coupon | null;
  courseId?: string;
  children?: React.ReactNode;
}

export default function CouponFormDialog({ onSubmit, isLoading = false, initialData, courseId, children }: CouponFormDialogProps) {
  const [open, setOpen] = useState(false);

  const handleFormSubmit = async (data: CouponSchema) => {
    const couponData = {
      code: data.code,
      value: Number(data.value),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      type: data.type as any,
      description: data.description,
      startsAt: data.startsAt ? new Date(data.startsAt).toISOString() : undefined,
      expiresAt: data.expiresAt ? new Date(data.expiresAt).toISOString() : undefined,
      maxUses: data.maxUses ? Number(data.maxUses) : undefined,
      maxUsesPerUser: data.maxUsesPerUser ? Number(data.maxUsesPerUser) : 1,
      minOrderAmount: data.minOrderAmount ? Number(data.minOrderAmount) : undefined,
      courseIds: courseId ? [courseId] : [],
      isActive: data.isActive,
      // @ts-ignore - allCourses might be handled by backend even if not in DTO types
      allCourses: data.allCourses,
    };

    await onSubmit(couponData as CreateCouponRequest);
    setOpen(false);
  };

  const isEditMode = !!initialData;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children ? children : (
          <Button className="bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
            إنشاء كوبون جديد
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-125 bg-white rounded-2xl shadow-2xl border-0 p-0 overflow-hidden">
        <div className="bg-linear-to-r from-blue-600 to-indigo-600 p-6 text-white">
          <DialogHeader className="text-center">
            <DialogTitle className="text-2xl font-bold text-white flex items-center justify-center gap-2">
              <HashIcon className="w-6 h-6" />
              {isEditMode ? "تعديل الكوبون" : "إنشاء كوبون جديد"}
            </DialogTitle>
            <DialogDescription className="text-blue-100 mt-2">
              {isEditMode ? "قم بتعديل بيانات الكوبون" : "أضف كوبون خصم جديد لجذب المزيد من الطلاب"}
            </DialogDescription>
          </DialogHeader>
        </div>

        <CouponForm
          initialData={initialData}
          onSubmit={handleFormSubmit}
          onCancel={() => setOpen(false)}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
}