import useFormFields from '@/hooks/useFormFields';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader } from '@/components/shared/loader';
import { Pages } from '@/constants/enums';
import FormFields from '@/components/shared/form-fields/form-fields';
import { Button } from '@/components/ui/button';
import type { Course } from '@/types/course';
import type { UseMutationResult } from '@tanstack/react-query';
import { toast } from 'sonner';
import type { AxiosError } from 'axios';
import { basicsSchema } from '@/validations/course';

interface CourseFormProps {
    course?: Course;
    setCourseMenu: React.Dispatch<React.SetStateAction<boolean>>;
    mutation: UseMutationResult<any, Error, any, unknown>;
}

function CourseForm({ course, setCourseMenu, mutation }: CourseFormProps) {
    const { getFormFields } = useFormFields({ slug: Pages.BASICS });

    const {
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            name: course?.title || '',
            slug: course?.slug || '',
            level: course?.level?.toLowerCase() || 'all',
            image: course?.thumbnailUrl || '',
            hours: course?.duration ? course.duration / 60 : 0,
            description: course?.description || '',
        },
        mode: 'onChange',

        resolver: zodResolver(basicsSchema),
    });

    const onSubmit = async (data: Record<string, unknown>) => {
        // Transform form data to API DTO
        const mutationData: any = {
            ...data,
            title: data.name,
            thumbnailUrl: data.image,
            level: (data.level as string).toUpperCase(),
            duration: Number(data.hours) * 60, // Convert hours to minutes
        };

        // Remove mapped fields if not needed or to avoid confusion, but spreading data implies we might send extra fields which Axios might ignore or strict DTO might reject if we typed it strictly.
        // For pureness, we should construct the object.
        const cleanData = {
            title: mutationData.title,
            slug: mutationData.slug,
            level: mutationData.level,
            price: Number(mutationData.price),
            thumbnailUrl: mutationData.thumbnailUrl,
            description: mutationData.description,
            duration: mutationData.duration,
            // Add other fields from UpdateCourseDto as needed
        };

        try {
            const res = await mutation.mutateAsync(cleanData);
            toast.success(res.message);
            setCourseMenu(false);
        } catch (error) {
            if (error instanceof Error) {
                const axiosError = error as AxiosError<{ message: string }>;
                if (axiosError.response?.data?.message) {
                    toast.error(axiosError.response.data.message);
                } else {
                    toast.error('حدث خطأ أثناء حفظ الدورة');
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
                {course ? 'تحديث الدورة' : 'إنشاء دورة جديدة'}
                {formLoading && <Loader />}
            </Button>
        </form>
    );
}

export default CourseForm;
