import useFormFields from '@/hooks/useFormFields';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader } from '@/components/shared/loader';
import { Pages } from '@/constants/enums';
import FormFields from '@/components/shared/form-fields/form-fields';
import { Button } from '@/components/ui/button';
import useFormValidations from '@/hooks/useFormValidations';
import { toast } from 'sonner';
import type { AxiosError } from 'axios';
import type { couponSchema } from '@/validations/coupon';
import type { Coupon } from '@/types/course';
import { CreateCouponDtoType } from '@/constants/enums';
import { useCourses } from '@/features/courses/hooks/useCoursesQueries';

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
    const { data: coursesData, isLoading: coursesLoading } = useCourses();

    const courseOptions = (coursesData as any)?.data?.courses?.map((course: any) => ({
        value: course.id,
        label: course.title
    })) || [];

    const { getFormFields } = useFormFields({ slug: Pages.COUPONS });
    const { getValidationSchema } = useFormValidations({ slug: Pages.COUPONS });

    const formFields = getFormFields({
        courseIds: courseOptions
    });

    const {
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            code: initialData?.code || '',
            value: initialData?.value || 0,
            type: (initialData?.type as unknown as CreateCouponDtoType) || CreateCouponDtoType.FIXED,
            expiresAt: initialData?.expiresAt ? initialData.expiresAt.split('T')[0] : '',
            maxUses: (initialData as any)?.maxUses || '',
            courseIds: initialData?.courseIds || [],
            isActive: initialData?.isActive ?? true,
        },
        mode: 'onChange',
        resolver: zodResolver(getValidationSchema() as typeof couponSchema),
    });

    const handleFormSubmit = async (data: any) => {
        try {
            await onSubmit(data);
        } catch (error) {
            if (error instanceof Error) {
                const axiosError = error as AxiosError<{ message: string }>;
                if (axiosError.response?.data?.message) {
                    toast.error(axiosError.response.data.message);
                } else {
                    toast.error('حدث خطأ أثناء حفظ الكوبون');
                }
            } else {
                toast.error('حدث خطأ غير متوقع');
            }
        }
    };

    const formLoading = isSubmitting || isLoading;

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-6 overflow-y-auto h-[500px]">
            {(formLoading || coursesLoading) && <div className="flex justify-center py-4"><Loader /></div>}
            {!(formLoading || coursesLoading) && formFields.map((field, index) => (
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
