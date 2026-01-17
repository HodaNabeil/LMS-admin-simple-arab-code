import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { PercentIcon, DollarSignIcon, HashIcon, ClockIcon, BookOpenIcon, CheckCircleIcon } from "lucide-react";
import type { Coupon } from "@/types/course";

interface CouponFormDialogProps {
  onSubmit: (couponData: Omit<Coupon, 'id' | 'createdAt' | 'uses'>) => void;
  isLoading?: boolean;
  initialData?: Coupon | null;
  children?: React.ReactNode;
}

export default function CouponFormDialog({ onSubmit, isLoading = false, initialData, children }: CouponFormDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    code: "",
    discount: "",
    type: "FIXED" as 'FIXED' | 'PERCENTAGE',
    expiresAt: "",
    limit: "",
    allCourses: false,
    isActive: true,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        code: initialData.code,
        discount: initialData.discount.toString(),
        type: initialData.type,
        expiresAt: initialData.expiresAt.split('T')[0], // Formatting for date input
        limit: initialData.limit.toString(),
        allCourses: initialData.allCourses,
        isActive: initialData.isActive,
      });
    } else {
      resetForm();
    }
  }, [initialData, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const couponData = {
      code: formData.code,
      discount: Number(formData.discount),
      type: formData.type,
      expiresAt: formData.expiresAt,
      limit: Number(formData.limit),
      allCourses: formData.allCourses,
      isActive: formData.isActive,
    };

    onSubmit(couponData);
    setOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      code: "",
      discount: "",
      type: "FIXED",
      expiresAt: "",
      limit: "",
      allCourses: false,
      isActive: true,
    });
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

        <form onSubmit={handleSubmit} className="p-6 space-y-6  overflow-y-auto h-[500px]">
          {/* Coupon Code Section */}
          <div className="space-y-3">
            <Label htmlFor="code" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <HashIcon className="w-4 h-4 text-blue-600" />
              كود الكوبون
            </Label>
            <Input
              id="code"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              placeholder="مثال: SUMMER2024"
              className="h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl px-4 text-lg font-medium transition-all duration-200 hover:border-gray-300"
              required
            />
          </div>

          {/* Discount Value and Type */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <Label htmlFor="discount" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                {formData.type === 'FIXED' ? (
                  <DollarSignIcon className="w-4 h-4 text-green-600" />
                ) : (
                  <PercentIcon className="w-4 h-4 text-green-600" />
                )}
                قيمة التخفيض
              </Label>
              <Input
                id="discount"
                type="number"
                value={formData.discount}
                onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                placeholder="100"
                className="h-12 border-2 border-gray-200 focus:border-green-500 rounded-xl px-4 text-lg font-medium transition-all duration-200 hover:border-gray-300"
                required
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="type" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <PercentIcon className="w-4 h-4 text-purple-600" />
                نوع التخفيض
              </Label>
              <Select
                value={formData.type}
                onValueChange={(value: 'FIXED' | 'PERCENTAGE') =>
                  setFormData({ ...formData, type: value })
                }
              >
                <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-purple-500 rounded-xl px-4 text-lg font-medium transition-all duration-200 hover:border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-2 border-gray-200">
                  <SelectItem value="FIXED" className="text-lg py-3">مبلغ ثابت</SelectItem>
                  <SelectItem value="PERCENTAGE" className="text-lg py-3">نسبة مئوية</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Expiration Date */}
          <div className="space-y-3">
            <Label htmlFor="expiresAt" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <ClockIcon className="w-4 h-4 text-orange-600 " />
              تاريخ انتهاء الصلاحية
            </Label>
            <div className="relative">
              <Input
                id="expiresAt"
                type="date"
                value={formData.expiresAt}
                onChange={(e) => setFormData({ ...formData, expiresAt: e.target.value })}
                className="h-12 border-2 border-gray-200 focus:border-orange-500 rounded-xl px-4 text-lg font-medium transition-all duration-200 hover:border-gray-300 pr-12"
                required
              />
            </div>
          </div>

          {/* Maximum Usage */}
          <div className="space-y-3">
            <Label htmlFor="limit" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <HashIcon className="w-4 h-4 text-red-600" />
              الحد الأقصى للاستخدام
            </Label>
            <Input
              id="limit"
              type="number"
              value={formData.limit}
              onChange={(e) => setFormData({ ...formData, limit: e.target.value })}
              placeholder="100"
              className="h-12 border-2 border-gray-200 focus:border-red-500 rounded-xl px-4 text-lg font-medium transition-all duration-200 hover:border-gray-300"
              required
            />
          </div>

          {/* All Courses & Active Status Checkboxes */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
              <Checkbox
                id="allCourses"
                checked={formData.allCourses}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, allCourses: checked as boolean })
                }
                className="w-5 h-5 text-blue-600 border-2 border-blue-300 rounded-md"
              />
              <Label htmlFor="allCourses" className="text-sm font-medium text-gray-700 flex items-center gap-2 cursor-pointer">
                <BookOpenIcon className="w-4 h-4 text-blue-600" />
                جميع الدورات
              </Label>
            </div>

            <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
              <Checkbox
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, isActive: checked as boolean })
                }
                className="w-5 h-5 text-green-600 border-2 border-green-300 rounded-md"
              />
              <Label htmlFor="isActive" className="text-sm font-medium text-gray-700 flex items-center gap-2 cursor-pointer">
                <CheckCircleIcon className="w-4 h-4 text-green-600" />
                تفعيل الكوبون
              </Label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="px-6 py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
            >
              إلغاء
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (isEditMode ? "جاري التعديل..." : "جاري الإنشاء...") : (isEditMode ? "حفظ التعديلات" : "إنشاء الكوبون")}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}