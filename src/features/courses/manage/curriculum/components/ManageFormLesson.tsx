import FormFields from '@/components/shared/form-fields/form-fields';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Pages } from '@/constants/enums';
import useFormFields from '@/hooks/useFormFields';
import useFormValidations from '@/hooks/useFormValidations';
import type { createLessonCourseSchema } from '@/validations/course';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useCreateLecture, useUpdateLecture } from '../hooks/useCurriculumMutation';
import type { LectureType } from '@/types/api.generated';

interface ManageFormLessonProps {
  mode: 'add' | 'edit';
  sectionId?: string;
  lessonId?: string;
  type: LectureType;
  onClose: () => void;
  hiddenFields?: string[];
  initialValues?: any;
}

export default function ManageFormLesson({
  mode,
  sectionId,
  lessonId,
  type,
  onClose,
  hiddenFields = [],
  initialValues,
}: ManageFormLessonProps) {
  const { getFormFields } = useFormFields({ slug: Pages.LESSONS });
  const { getValidationSchema } = useFormValidations({
    slug: Pages.LESSONS,
  });

  const { mutate: createLecture, isPending: isCreating } = useCreateLecture();
  const { mutate: updateLecture, isPending: isUpdating } = useUpdateLecture();
  const isPending = isCreating || isUpdating;

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof createLessonCourseSchema>>({
    defaultValues: {
      description: initialValues?.description || "",
      title: initialValues?.title || "",
      type: type
    },
    mode: 'onChange',
    resolver: zodResolver(
      getValidationSchema() as any
    ),
  });

  const handleFormSubmit = (data: any) => {

    console.log(data);
    if (mode === 'add' && sectionId) {
      createLecture({ sectionId, data: { ...data, type } }, {
        onSuccess: () => {
          onClose();
        }
      });
    } else if (mode === 'edit' && lessonId) {
      updateLecture({ id: lessonId, data: { ...data, type } }, {
        onSuccess: () => {
          onClose();
        }
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      {getFormFields()
        .filter((field: any) => !hiddenFields.includes(field.name))
        .map((field: any, index: number) => (
          <div key={index} className="mb-4">
            <FormFields {...field} control={control} errors={errors} />
          </div>
        ))}
      <div className="flex justify-end mt-4 gap-2 items-center">
        <Button type="submit" disabled={isPending}>
          {isPending ? 'جاري الحفظ...' : (mode === 'add' ? 'إضافة' : 'تحديث')}
        </Button>
        <Button type="button" variant="secondary" onClick={onClose} disabled={isPending}>
          إلغاء
        </Button>
      </div>
    </form>
  );
}
