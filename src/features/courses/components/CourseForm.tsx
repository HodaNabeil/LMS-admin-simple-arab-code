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
import { basicsSchema, type BasicsSchema } from '@/validations/course';
import type { UpdateCourseRequest, UpdateCourseResponse } from '@/types/course';
import { Form } from '@/components/ui/form';


interface CourseFormProps {
    course?: Course;
    setCourseMenu: React.Dispatch<React.SetStateAction<boolean>>;
    mutation: UseMutationResult<UpdateCourseResponse, Error, UpdateCourseRequest, unknown>;
}

function CourseForm({ course, setCourseMenu, mutation }: CourseFormProps) {
    const { getFormFields } = useFormFields({ slug: Pages.BASICS });

    const formMethods = useForm({
        defaultValues: {
            title: course?.title || '',
            slug: course?.slug || '',
            description: course?.description || '',
            level: course?.level || CourseDtoLevel.BEGINNER,
            thumbnail: course?.thumbnailUrl || '',
            hours: course?.hours || 0,
        },
        mode: 'onChange',
        resolver: zodResolver(basicsSchema),
    });

    const {
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = formMethods;

    const onSubmit = async (data: BasicsSchema) => {
        const cleanData: UpdateCourseRequest = {
            title: data.title,
            slug: data.slug,
            level: (data.level as string).toUpperCase() as UpdateCourseRequest['level'],
            description: data.description || '',
            shortDescription: data.shortDescription || '',
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
        <Form {...formMethods}>
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
        </Form>
    );
}

export default CourseForm;
