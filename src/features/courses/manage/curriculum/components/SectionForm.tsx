import FormFields from '@/components/shared/form-fields/form-fields';
import { Button } from '@/components/ui/button';
import { Pages } from '@/constants/enums';
import useFormFields from '@/hooks/useFormFields';
import useFormValidations from '@/hooks/useFormValidations';
import type { createSectionCourseSchema } from '@/validations/course';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useCreateSection, useUpdateSection } from '../hooks/useCurriculumMutation';
import type { CreateSectionRequest, UpdateSectionRequest, Section } from '@/types/curriculum';
import type z from 'zod';

interface SectionFormProps {
  section?: Section;
  setOpen: (open: boolean) => void;
}

export default function SectionForm({ section, setOpen }: SectionFormProps) {
  const { getFormFields } = useFormFields({ slug: Pages.CURRICULUM });
  const { getValidationSchema } = useFormValidations({
    slug: Pages.CURRICULUM,
  });

  const { mutate: createSection, isPending: isCreating } = useCreateSection();
  const { mutate: updateSection, isPending: isUpdating } = useUpdateSection();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: section?.title || '',
      description: section?.description || '',
    },
    mode: 'onChange',
    resolver: zodResolver(
      getValidationSchema() as typeof createSectionCourseSchema
    ),
  });

  const handleFormSubmit = (data: z.infer<typeof createSectionCourseSchema>) => {
    if (section) {
      updateSection(
        { id: section.id, data: data as UpdateSectionRequest },
        {
          onSuccess: () => setOpen(false),
        }
      );
    } else {
      createSection(data as CreateSectionRequest, {
        onSuccess: () => setOpen(false),
      });
    }
  };

  const onCancel = () => {
    setOpen(false);
  };

  const isLoading = isCreating || isUpdating;

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      {getFormFields().map((field, index) => (
        <div key={index} className="mb-4">
          <FormFields {...field} control={control} errors={errors} />
        </div>
      ))}
      <div className="flex justify-end mt-4 gap-2 items-center">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'جاري الحفظ...' : section ? 'تعديل القسم' : 'إضافة قسم'}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel} disabled={isLoading}>
          إلغاء
        </Button>
      </div>
    </form>
  );
}
