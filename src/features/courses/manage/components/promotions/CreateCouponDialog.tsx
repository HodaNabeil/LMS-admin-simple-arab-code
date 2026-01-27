import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { HashIcon } from "lucide-react";
import type { Coupon } from "@/types/course";
import CouponForm from "./CouponForm";

interface CouponFormDialogProps {
  onSubmit: (couponData: Omit<Coupon, 'id' | 'createdAt' | 'uses'>) => void;
  isLoading?: boolean;
  initialData?: Coupon | null;
  children?: React.ReactNode;
}

export default function CouponFormDialog({ onSubmit, isLoading = false, initialData, children }: CouponFormDialogProps) {
  const [open, setOpen] = useState(false);

  const handleFormSubmit = async (data: any) => {
    const couponData = {
      code: data.code,
      value: Number(data.value),
      type: data.type,
      expiresAt: data.expiresAt ? new Date(data.expiresAt).toISOString() : undefined,
      maxUses: data.maxUses ? Number(data.maxUses) : undefined,
      courseIds: data.courseIds || [],
      isActive: data.isActive,
      maxUsesPerUser: 1,
    };

    await onSubmit(couponData);
    setOpen(false);
  };

  const isEditMode = !!initialData;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children ? children : (
          <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
            إنشاء كوبون جديد
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-white rounded-2xl shadow-2xl border-0 p-0 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
          <DialogHeader className="text-center">
            <DialogTitle className="text-2xl font-bold text-white flex items-center justify-center gap-2">
              <HashIcon className="w-6 h-6" />
              {isEditMode ? "تعديل الكوبون" : "إنشاء كوبون جديد"}
            </DialogTitle>
            <p className="text-blue-100 mt-2">
              {isEditMode ? "قم بتعديل بيانات الكوبون" : "أضف كوبون خصم جديد لجذب المزيد من الطلاب"}
            </p>
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