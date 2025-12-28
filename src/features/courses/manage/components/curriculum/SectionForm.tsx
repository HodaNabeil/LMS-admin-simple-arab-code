import FormFields from '@/components/shared/form-fields/form-fields';
import { Button } from '@/components/ui/button';
import { Pages } from '@/constants/enums';
import useFormFields from '@/hooks/useFormFields';
import useFormValidations from '@/hooks/useFormValidations';
import type { createSectionCourseSchema } from '@/validations/course';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

interface SectionFormProps {
  section?: {
    title: string;
    description: string;
  };
  setOpen: (open: boolean) => void;
}

export default function SectionForm({ section, setOpen }: SectionFormProps) {
  const { getFormFields } = useFormFields({ slug: Pages.CURRICULUM });
  const { getValidationSchema } = useFormValidations({
    slug: Pages.CURRICULUM,
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      description: '',
    },
    mode: 'onChange',
    resolver: zodResolver(
      getValidationSchema() as typeof createSectionCourseSchema
    ),
  });

  const handleFormSubmit = () => {};
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
        <Button type="submit">{section ? 'تعديل القسم' : 'إضافة قسم'}</Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          إلغاء
        </Button>
      </div>
    </form>
  );
}
