import FormFields from '@/components/shared/form-fields/form-fields';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Pages } from '@/constants/enums';
import { Form } from '@/components/ui/form';
import useFormFields from '@/hooks/useFormFields';

import { createLessonCourseSchema } from '@/validations/course';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useCreateLecture, useUpdateLecture } from '../hooks/useCurriculumMutation';
import type { LectureType } from '@/types/api.generated';
import type { IFormField } from '@/types/app';

interface ManageFormLessonProps {
  mode: 'add' | 'edit';
  sectionId?: string;
  lessonId?: string;
  type: LectureType;
  onClose: () => void;
  hiddenFields?: string[];
  initialValues?: Record<string, unknown>;
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


  const { mutate: createLecture, isPending: isCreating } = useCreateLecture();
  const { mutate: updateLecture, isPending: isUpdating } = useUpdateLecture();
  const isPending = isCreating || isUpdating;

  const form = useForm<z.infer<typeof createLessonCourseSchema>>({
    defaultValues: {
      title: (initialValues?.title as string) || "",
      description: (initialValues?.description as string) || "",
    },
    mode: 'onChange',
    resolver: zodResolver(createLessonCourseSchema),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  const handleFormSubmit = (data: z.infer<typeof createLessonCourseSchema>) => {

    console.log(data, "video");
    if (mode === 'add' && sectionId) {
      createLecture({ sectionId, data: { ...data, type: type as LectureType } }, {
        onSuccess: () => {
          onClose();
        }
      });
    } else if (mode === 'edit' && lessonId) {
      updateLecture({ id: lessonId, data: { ...data, type: type as LectureType } }, {
        onSuccess: () => {
          onClose();
        }
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        {getFormFields()
          .filter((field: IFormField) => !hiddenFields.includes(field.name))
          .map((field: IFormField, index: number) => (
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
    </Form>
  );
}
