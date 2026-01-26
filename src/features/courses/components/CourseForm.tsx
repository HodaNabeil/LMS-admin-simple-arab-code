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
import { CourseDtoLevel } from '@/types/api.generated';
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
            title: course?.title || '',
            slug: course?.slug || '',
            level: course?.level || CourseDtoLevel.ALL_LEVELS,
            thumbnailUrl: course?.thumbnailUrl || '',
            hours: course?.duration ? course.duration / 60 : 0,
            description: course?.description || '',
        },
        mode: 'onChange',

        resolver: zodResolver(basicsSchema),
    });

    const onSubmit = async (data: Record<string, unknown>) => {
        const mutationData: any = {
            ...data,
            title: data.title,
            thumbnailUrl: data.thumbnailUrl,
            level: (data.level as string).toUpperCase(),
            duration: Number(data.hours) * 60,
        };

        const cleanData = {
            title: mutationData.title,
            slug: mutationData.slug,
            level: mutationData.level,
            thumbnailUrl: mutationData.thumbnailUrl,
            description: mutationData.description,
            duration: mutationData.duration,
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
