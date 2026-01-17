import FormFields from '@/components/shared/form-fields/form-fields';
import { Loader } from '@/components/shared/loader';
import { Pages } from '@/constants/enums';
import useFormFields from '@/hooks/useFormFields';
import useFormValidations from '@/hooks/useFormValidations';
import {
  createCourseSchema,
  type ICreateCourseForm,
} from '@/validations/createcourse';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type Control } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function CreateCourseForm() {
  const { getFormFields } = useFormFields({ slug: Pages.CREATE_COURSES });
  const { getValidationSchema } = useFormValidations({
    slug: Pages.CREATE_COURSES,
  });
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ICreateCourseForm>({
    defaultValues: {
      slug: '',
      selectedPath: '',
    },
    mode: 'onChange',
    resolver: zodResolver(getValidationSchema() as typeof createCourseSchema),
  });

  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleFormSubmit = async (data: ICreateCourseForm) => {
    try {
      setSubmitError(null);
      navigate(`/admin/${Pages.COURSES}/${data.slug}/${Pages.GOALS}`);
    } catch (error) {
      console.error('Course creation error:', error);
      const errorMessage = error instanceof Error
        ? error.message
        : 'حدث خطأ أثناء إنشاء الدورة. يرجى المحاولة مرة أخرى.';
      setSubmitError(errorMessage);
    }
  };


  return (
    <div className="flex flex-col gap-4 w-full max-w-2xl  p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h1 className="text-xl font-bold text-gray-600 mb-4 text-center border-b border-gray-200 pb-4 w-full">
        إضافة دورة جديدة
      </h1>

      {submitError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{submitError}</span>
        </div>
      )}
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex flex-col gap-4"
      >
        {getFormFields().map((field) => (
          <FormFields
            key={field.name}
            {...field}
            control={control as unknown as Control<Record<string, unknown>>}
            errors={errors}
          />
        ))}

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-primary text-white rounded px-4 py-2 text-sm hover:bg-primary/90 transition disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isSubmitting ? <Loader /> : 'إضافة دورة'}
        </button>
      </form>
    </div>
  );
}
