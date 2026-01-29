import FormFields from '@/components/shared/form-fields/form-fields';
import { Button } from '@/components/ui/button';
import { Pages } from '@/constants/enums';
import useFormFields from '@/hooks/useFormFields';
import useFormValidations from '@/hooks/useFormValidations';
import type { createSectionCourseSchema } from '@/validations/course';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
interface ManageFormSectionProps {
  mode: 'add' | 'edit';
  setOpen: (open: boolean) => void;
  open: boolean;
}

export default function ManageFormLesson({
  mode,
  setOpen,
}: ManageFormSectionProps) {
  const { getFormFields } = useFormFields({ slug: Pages.LESSONS });
  const { getValidationSchema } = useFormValidations({
    slug: Pages.LESSONS,
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {},
    mode: 'onChange',
    resolver: zodResolver(
      getValidationSchema() as typeof createSectionCourseSchema
    ),
  });

  const handleFormSubmit = () => {
    // console.log(data);
  };
  const onCancel = () => {
    setOpen(false);
  };
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      {getFormFields().map((field, index) => (
        <div key={index} className="mb-4">
          <div key={index} className="mb-4">
            <FormFields {...field} control={control} errors={errors} />
          </div>
        </div>
      ))}
      <div className="flex justify-end mt-4 gap-2 items-center">
        <Button type="submit">{mode === 'add' ? 'إضافة  ' : ' تحديث'}</Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          إلغاء
        </Button>
      </div>
    </form>
  );
}
