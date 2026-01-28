import useFormFields from '@/hooks/useFormFields';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader } from '@/components/shared/loader';
import { Pages } from '@/constants/enums';
import FormFields from '@/components/shared/form-fields/form-fields';
import { Button } from '@/components/ui/button';
import useFormValidations from '@/hooks/useFormValidations';
import type { couponSchema } from '@/validations/coupon';
import type { Coupon } from '@/types/course';
import { CreateCouponDtoType } from '@/constants/enums';
import { handleApiError } from '@/lib/error-handler';

interface CouponFormProps {
    initialData?: Coupon | null;
    onSubmit: (data: any) => Promise<void>;
    onCancel: () => void;
    isLoading?: boolean;
}

function CouponForm({
    initialData,
    onSubmit,
    onCancel,
    isLoading = false,
}: CouponFormProps) {
    const { getFormFields } = useFormFields({ slug: Pages.COUPONS });
    const { getValidationSchema } = useFormValidations({ slug: Pages.COUPONS });

    const formFields = getFormFields();

    const {
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            code: initialData?.code || '',
            value: (initialData?.value || '') as any,
            type: (initialData?.type as unknown as CreateCouponDtoType) || undefined,
            description: initialData?.description || '',
            startsAt: (initialData?.startsAt as string)?.split('T')[0] || '',
            expiresAt: (initialData?.expiresAt as string)?.split('T')[0] || '',
            maxUses: (initialData as any)?.maxUses || '',
            maxUsesPerUser: (initialData as any)?.maxUsesPerUser || 1,
            minOrderAmount: (initialData as any)?.minOrderAmount || '',
            isActive: initialData?.isActive ?? true,
        },
        mode: 'onChange',
        resolver: zodResolver(getValidationSchema() as typeof couponSchema),
    });

    const handleFormSubmit = async (data: any) => {
        try {
            await onSubmit(data);
        } catch (error: any) {
            const message = error?.response?.data?.message;
            if (message && (
                (typeof message === 'string' && (message.includes('usedCount') || message.includes('createdAt') || message.includes('updatedAt'))) ||
                (Array.isArray(message) && message.some((m: string) => m.includes('usedCount') || m.includes('createdAt') || m.includes('updatedAt')))
            )) {
                handleApiError(error, 'غير مصرح بالتعديل');
            } else {
                handleApiError(error);
            }
        }
    };

    const formLoading = isSubmitting || isLoading;

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-6 overflow-y-auto h-[500px]">
            {formLoading && <div className="flex justify-center py-4"><Loader /></div>}
            {!formLoading && formFields.map((field, index) => (
                <div key={index}>
                    <FormFields {...field} control={control} errors={errors} />
                </div>
            ))}

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    className="px-6 py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
                >
                    إلغاء
                </Button>
                <Button
                    type="submit"
                    disabled={formLoading}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {formLoading ? (initialData ? "جاري التعديل..." : "جاري الإنشاء...") : (initialData ? "حفظ التعديلات" : "إنشاء الكوبون")}
                    {formLoading && <Loader />}
                </Button>
            </div>
        </form>
    );
}

export default CouponForm;
