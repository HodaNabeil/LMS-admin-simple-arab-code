import { useState } from "react";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Select, { type SingleValue, type ActionMeta } from "react-select";
import { Button } from "@/components/ui/button";
import { Loader2, Calculator } from "lucide-react";

// Import utilities
import {
  getCurrencyOptions,
  getCourseOptions,
  getUserOptions,
  getCouponOptions,
} from "../utils/orderOptions";
import { CustomOption, selectStyles, selectTheme } from "../utils/selectConfig";
import type { FormOrderProps, Order } from "../types";
import { useCourses } from "@/features/courses/hooks/useCoursesQueries";
import { useUsers } from "@/features/users/hooks/useUsersQueries";
import { useCoupons } from "@/features/courses/manage/promotions/hooks/useCouponsQueries";

interface SelectOption {
  value: string | number;
  label: string;
}

export default function FormOrder({
  mode,
  onSubmit,
  onCancel,
  isLoading = false,
}: FormOrderProps) {
  const [courseSearch, setCourseSearch] = useState("");
  const [userSearch, setUserSearch] = useState("");
  const [couponSearch, setCouponSearch] = useState("");

  // Fetch real data from backend
  const { data: coursesData, isPending: isPendingCourses } = useCourses({
    search: courseSearch,
    limit: 50,
  });

  const { data: usersData, isPending: isPendingUsers } = useUsers({
    search: userSearch,
  });

  const { data: couponsData, isPending: isPendingCoupons } =
    useCoupons(couponSearch);

  // Simple form state - one course, direct values
  const [userId, setUserId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [coursePriceCents, setCoursePriceCents] = useState(0);
  const [currency, setCurrency] = useState("EGP");
  const [couponId, setCouponId] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [discountCents, setDiscountCents] = useState(0);
  const [taxCents, setTaxCents] = useState(0);

  // Calculate totals
  const subtotalCents = coursePriceCents;
  const totalCents = subtotalCents - discountCents + taxCents;

  const currencyOptions = getCurrencyOptions();
  const courseOptions = getCourseOptions(coursesData?.data?.courses || []);
  const userOptions = getUserOptions(usersData?.users ?? []);
  const couponOptions = getCouponOptions(couponsData?.data ?? []);

  const getCurrencySymbol = () => {
    return currency === "EGP" ? "ج.م" : "$";
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!userId) {
      alert("الرجاء اختيار المستخدم");
      return;
    }
    if (!courseId) {
      alert("الرجاء اختيار دورة");
      return;
    }
    if (coursePriceCents <= 0) {
      alert("الرجاء إدخال سعر صحيح للدورة");
      return;
    }

    // Transform to API format
    const orderData: Order = {
      userId,
      subtotalCents,
      discountCents,
      taxCents,
      totalCents,
      currency,
      couponId: couponId || undefined,
      couponCode: couponCode || undefined,
      items: [{
        courseId,
        priceCents: coursePriceCents,
        currency,
      }],
    };

    await onSubmit(orderData);
  };

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <div className="grid gap-4">
        {/* User */}
        <div className="grid gap-3">
          <label htmlFor="user" className="font-bold text-gray-900 mb-1">
            اختر المستخدم *
          </label>
          <Select
            inputId="user"
            options={userOptions}
            value={userOptions.find(u => u.value === userId) || null}
            onChange={(option: SingleValue<SelectOption>, actionMeta: ActionMeta<SelectOption>) => setUserId(String(option?.value || ""))}
            onInputChange={(newValue) => setUserSearch(newValue)}
            isLoading={isPendingUsers}
            isDisabled={isLoading}
            classNamePrefix="react-select"
            styles={selectStyles}
            theme={selectTheme}
            components={{ Option: CustomOption }}
            isRtl
            menuPlacement="auto"
            placeholder="ابحث عن البريد الإلكتروني أو الاسم..."
          />
        </div>

        {/* Currency */}
        <div className="grid gap-3">
          <label htmlFor="currency" className="font-bold text-gray-900 mb-1">
            العملة *
          </label>
          <Select
            inputId="currency"
            options={currencyOptions}
            value={currencyOptions.find(c => c.value === currency) || null}
            onChange={(option: SingleValue<SelectOption>, actionMeta: ActionMeta<SelectOption>) => setCurrency(String(option?.value || "EGP"))}
            isDisabled={isLoading}
            classNamePrefix="react-select"
            styles={selectStyles}
            theme={selectTheme}
            components={{ Option: CustomOption }}
            isRtl
            menuPlacement="auto"
            placeholder="اختر العملة..."
          />
        </div>

        {/* Course */}
        <div className="grid gap-3">
          <label className="font-bold text-gray-900">الدورة *</label>
          <Select
            options={courseOptions}
            value={courseOptions.find(c => c.value === courseId) || null}
            onChange={(option: SingleValue<SelectOption>, actionMeta: ActionMeta<SelectOption>) => setCourseId(String(option?.value || ""))}
            onInputChange={(newValue) => setCourseSearch(newValue)}
            isLoading={isPendingCourses}
            isDisabled={isLoading}
            classNamePrefix="react-select"
            styles={selectStyles}
            theme={selectTheme}
            components={{ Option: CustomOption }}
            isRtl
            menuPlacement="auto"
            placeholder="ابحث عن الدورة..."
          />
        </div>

        {/* Course Price */}
        <div className="grid gap-3">
          <label htmlFor="coursePriceCents" className="font-bold text-gray-900 mb-1">
            سعر الدورة (بالقرش) *
          </label>
          <Input
            id="coursePriceCents"
            type="number"
            min="0"
            step="1"
            value={coursePriceCents || ""}
            onChange={(e) => setCoursePriceCents(parseInt(e.target.value) || 0)}
            disabled={isLoading}
            className="text-gray-900 font-bold"
            placeholder="49990"
          />
          <p className="text-xs text-gray-500">
            {(coursePriceCents / 100).toFixed(2)} {getCurrencySymbol()}
          </p>
        </div>

        {/* Discount Section */}
        <div className="border-t border-gray-200 pt-4 mt-2">
          <div className="flex items-center gap-2 mb-3">
            <Calculator className="h-5 w-5 text-blue-600" />
            <label className="font-bold text-gray-900">التخفيض والتسعير</label>
          </div>

          {/* Coupon */}
          <div className="grid gap-3 mb-3">
            <label htmlFor="coupon" className="text-sm font-semibold text-gray-700">
              اختر الكوبون (اختياري)
            </label>
            <Select
              inputId="coupon"
              options={couponOptions}
              value={couponOptions.find(c => c.value === couponId) || null}
              onChange={(option: SingleValue<SelectOption>, actionMeta: ActionMeta<SelectOption>) => {
                setCouponId(String(option?.value || ""));
                setCouponCode(option?.label || "");
              }}
              onInputChange={(newValue) => setCouponSearch(newValue)}
              isLoading={isPendingCoupons}
              isDisabled={isLoading}
              classNamePrefix="react-select"
              styles={selectStyles}
              theme={selectTheme}
              components={{ Option: CustomOption }}
              isRtl
              isClearable
              menuPlacement="auto"
              placeholder="ابحث عن الكوبون..."
            />
          </div>

          {/* Discount Amount */}
          <div className="grid gap-3 mb-3">
            <label htmlFor="discountCents" className="text-sm font-semibold text-gray-700">
              مبلغ التخفيض (بالقرش)
            </label>
            <Input
              id="discountCents"
              type="number"
              min="0"
              step="1"
              value={discountCents || ""}
              onChange={(e) => setDiscountCents(parseInt(e.target.value) || 0)}
              disabled={isLoading}
              className="text-gray-900 font-bold"
              placeholder="10000"
            />
            <p className="text-xs text-gray-500">
              {(discountCents / 100).toFixed(2)} {getCurrencySymbol()}
            </p>
          </div>

          {/* Tax Amount */}
          <div className="grid gap-3 mb-3">
            <label htmlFor="taxCents" className="text-sm font-semibold text-gray-700">
              الضريبة (بالقرش)
            </label>
            <Input
              id="taxCents"
              type="number"
              min="0"
              step="1"
              value={taxCents || ""}
              onChange={(e) => setTaxCents(parseInt(e.target.value) || 0)}
              disabled={isLoading}
              className="text-gray-900 font-bold"
              placeholder="0"
            />
            <p className="text-xs text-gray-500">
              {(taxCents / 100).toFixed(2)} {getCurrencySymbol()}
            </p>
          </div>
        </div>

        {/* Summary Card */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            ملخص الطلب
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-700">المبلغ الفرعي:</span>
              <span className="font-medium text-gray-900">
                {(subtotalCents / 100).toFixed(2)} {getCurrencySymbol()}
              </span>
            </div>
            <div className="flex justify-between text-red-600">
              <span>التخفيض:</span>
              <span className="font-medium">
                -{(discountCents / 100).toFixed(2)} {getCurrencySymbol()}
              </span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>الضريبة:</span>
              <span className="font-medium">
                +{(taxCents / 100).toFixed(2)} {getCurrencySymbol()}
              </span>
            </div>
            <div className="flex justify-between pt-2 border-t border-blue-300">
              <span className="font-bold text-blue-900">الإجمالي:</span>
              <span className="font-bold text-blue-900 text-lg">
                {(totalCents / 100).toFixed(2)} {getCurrencySymbol()}
              </span>
            </div>
          </div>
        </div>
      </div>

      <DialogFooter className="flex justify-center gap-2 mt-4">
        {onCancel && (
          <DialogClose asChild>
            <Button variant="outline" type="button" disabled={isLoading}>
              إلغاء
            </Button>
          </DialogClose>
        )}
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              جاري الحفظ...
            </>
          ) : mode === "create" ? (
            "إضافة الطلب"
          ) : (
            "تحديث الطلب"
          )}
        </Button>
      </DialogFooter>
    </form>
  );
}
