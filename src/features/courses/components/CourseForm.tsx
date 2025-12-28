import useFormFields from '@/hooks/useFormFields';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader } from '@/components/shared/loader';
import { Pages } from '@/constants/enums';
import FormFields from '@/components/shared/form-fields/form-fields';
import { Button } from '@/components/ui/button';
import type { Course } from '@/types/course';
import useFormValidations from '@/hooks/useFormValidations';
import type { UseMutationResult } from '@tanstack/react-query';
import { toast } from 'sonner';
import type { AxiosError } from 'axios';

interface CourseFormProps {
    course?: Course;
    setCourseMenu: React.Dispatch<React.SetStateAction<boolean>>;
    mutation: UseMutationResult<{ message: string }, Error, object, unknown>;
}

function CourseForm({ course, setCourseMenu, mutation }: CourseFormProps) {
    const { getFormFields } = useFormFields({ slug: Pages.COURSES });
    const { getValidationSchema } = useFormValidations({ slug: Pages.COURSES });

    const {
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            title: course?.title || '',
            category: course?.category || '',
            type: course?.type || '',
            level: course?.level || '',
            instructor: course?.instructor || '',
            price: course?.price || 0,
            image: course?.image || '',
        },
        mode: 'onChange',
        resolver: zodResolver(getValidationSchema()),
    });

    const onSubmit = async (data: Record<string, unknown>) => {
        const mutationData = course ? { ...data, id: course.id } : data;
        try {
            const res = await mutation.mutateAsync(mutationData);
            toast.success(res.message);
            setCourseMenu(false);
        } catch (error) {
            if (error instanceof Error) {
                const axiosError = error as AxiosError<{ message: string }>;
                if (axiosError.response?.data?.message) {
                    toast.error(axiosError.response.data.message);
                } else {
                    toast.error('حدث خطأ أثناء حفظ الكورس');
                }
            } else {
                toast.error('حدث خطأ غير متوقع');
            }
        }
    };

    const formLoading = isSubmitting || mutation.isPending;

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-h-[calc(100vh-200px)] overflow-y-auto">
            {getFormFields().map((field, index) => (
                <div key={index} className="mb-4">
                    <FormFields {...field} control={control} errors={errors} />
                </div>
            ))}
            <Button type="submit" disabled={formLoading} className='w-full'>
                {course ? 'تحديث الكورس' : 'إنشاء كورس جديد'}
                {formLoading && <Loader />}
            </Button>
        </form>
    );
}

export default CourseForm;
