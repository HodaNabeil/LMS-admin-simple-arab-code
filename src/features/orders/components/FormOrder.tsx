import { useState, useEffect } from "react";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Select from "react-select";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

// Import utilities
import {
    getOrderStatusOptions,
    getPaymentMethodOptions,
    getCurrencyOptions,
    getCourseOptions,
    getUserOptions,
} from "../utils/orderOptions";
import type { OptionType } from "../utils/orderOptions";
import { CustomOption, selectStyles, selectTheme } from "../utils/selectConfig";
import { mockCourses, mockUsers } from "../utils/mockData";
import type { FormOrderProps, OrderFormData } from "../types";

export default function FormOrder({
    mode,
    initialData,
    onSubmit,
    onCancel,
    isLoading = false,
}: FormOrderProps) {
    // Initialize form state
    const [formData, setFormData] = useState<OrderFormData>({
        price: initialData?.price ?? 0,
        discountCode: initialData?.discountCode ?? "",
        orderStatus: initialData?.orderStatus ?? null,
        paymentMethod: initialData?.paymentMethod ?? null,
        currency: initialData?.currency ?? null,
        courses: initialData?.courses ?? [],
        user: initialData?.user ?? null,
    });

    // Update form data when initialData changes (for edit mode)
    useEffect(() => {
        if (initialData) {
            setFormData({
                price: initialData.price ?? 0,
                discountCode: initialData.discountCode ?? "",
                orderStatus: initialData.orderStatus ?? null,
                paymentMethod: initialData.paymentMethod ?? null,
                currency: initialData.currency ?? null,
                courses: initialData.courses ?? [],
                user: initialData.user ?? null,
            });
        }
    }, [initialData]);

    // Generate select options
    const orderStatusOptions = getOrderStatusOptions();
    const paymentMethodOptions = getPaymentMethodOptions();
    const currencyOptions = getCurrencyOptions();
    const courseOptions = getCourseOptions(mockCourses);
    const userOptions = getUserOptions(mockUsers);

    // Handle text input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "price" ? Number(value) : value,
        }));
    };

    // Handle select changes
    const handleSelectChange = (field: keyof OrderFormData, value: any) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Basic validation
        if (formData.price <= 0) {
            alert("الرجاء إدخال سعر صحيح");
            return;
        }

        await onSubmit(formData);
    };

    return (
        <form className="w-full" onSubmit={handleSubmit}>
            <div className="grid gap-4">
                {/* Price */}
                <div className="grid gap-3">
                    <label
                        htmlFor="price"
                        className="font-bold text-gray-900 mb-1"
                    >
                        السعر (بالسنت)
                    </label>
                    <Input
                        id="price"
                        type="number"
                        min="0"
                        step="1"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        disabled={isLoading}
                        className="text-gray-900 font-bold placeholder:text-gray-500 bg-white py-1 px-2"
                        required
                    />
                </div>

                {/* Discount Code */}
                <div className="grid gap-3">
                    <label
                        htmlFor="discountCode"
                        className="font-bold text-gray-900 mb-1"
                    >
                        كود الخصم
                    </label>
                    <Input
                        id="discountCode"
                        name="discountCode"
                        value={formData.discountCode}
                        onChange={handleInputChange}
                        disabled={isLoading}
                        className="text-gray-900 font-bold placeholder:text-gray-500 bg-white"
                    />
                </div>

                {/* Order Status */}
                <div className="grid gap-3">
                    <label
                        htmlFor="orderStatus"
                        className="font-bold text-gray-900 mb-1"
                    >
                        حالة الطلب
                    </label>
                    <Select
                        inputId="orderStatus"
                        options={orderStatusOptions}
                        value={formData.orderStatus}
                        onChange={(value) => handleSelectChange("orderStatus", value)}
                        isDisabled={isLoading}
                        classNamePrefix="react-select"
                        styles={selectStyles}
                        theme={selectTheme}
                        components={{ Option: CustomOption }}
                        isRtl
                        menuPlacement="auto"
                    />
                </div>

                {/* Payment Method */}
                <div className="grid gap-3">
                    <label
                        htmlFor="paymentMethod"
                        className="font-bold text-gray-900 mb-1"
                    >
                        طريقة الدفع
                    </label>
                    <Select
                        inputId="paymentMethod"
                        options={paymentMethodOptions}
                        value={formData.paymentMethod}
                        onChange={(value) => handleSelectChange("paymentMethod", value)}
                        isDisabled={isLoading}
                        classNamePrefix="react-select"
                        styles={selectStyles}
                        theme={selectTheme}
                        components={{ Option: CustomOption }}
                        isRtl
                        menuPlacement="auto"
                    />
                </div>

                {/* Currency */}
                <div className="grid gap-3">
                    <label
                        htmlFor="currency"
                        className="font-bold text-gray-900 mb-1"
                    >
                        العملة
                    </label>
                    <Select
                        inputId="currency"
                        options={currencyOptions}
                        value={formData.currency}
                        onChange={(value) => handleSelectChange("currency", value)}
                        isDisabled={isLoading}
                        classNamePrefix="react-select"
                        styles={selectStyles}
                        theme={selectTheme}
                        components={{ Option: CustomOption }}
                        isRtl
                        menuPlacement="auto"
                    />
                </div>

                {/* Courses (Multiple) */}
                <div className="grid gap-3">
                    <label htmlFor="courses" className="font-bold text-gray-900 mb-1">
                        اختر الدورات
                    </label>
                    <Select
                        inputId="courses"
                        options={courseOptions}
                        isMulti
                        value={formData.courses}
                        onChange={(value) => handleSelectChange("courses", value as OptionType[])}
                        isDisabled={isLoading}
                        classNamePrefix="react-select"
                        styles={selectStyles}
                        theme={selectTheme}
                        components={{ Option: CustomOption }}
                        isRtl
                        menuPlacement="auto"
                    />
                </div>

                {/* User */}
                <div className="grid gap-3">
                    <label htmlFor="user" className="font-bold text-gray-900 mb-1">
                        اختر المستخدم
                    </label>
                    <Select
                        inputId="user"
                        options={userOptions}
                        value={formData.user}
                        onChange={(value) => handleSelectChange("user", value)}
                        isDisabled={isLoading}
                        classNamePrefix="react-select"
                        styles={selectStyles}
                        theme={selectTheme}
                        components={{ Option: CustomOption }}
                        isRtl
                        menuPlacement="auto"
                    />
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
