import useFormFields from '@/hooks/useFormFields';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader } from '@/components/shared/loader';
import { Pages, UserType } from '@/constants/enums';
import FormFields from '@/components/shared/form-fields/form-fields';
import { Button } from '@/components/ui/button';
import type { User } from '@/types/user';
import useFormValidations from '@/hooks/useFormValidations';
import type { UseMutationResult } from '@tanstack/react-query';
import { toast } from 'sonner';
import type { AxiosError } from 'axios';
import type { userSchema } from '@/validations/user';

function UserForm({
  user,
  setUserMenu,
  mutation,
}: {
  user?: User;
  setUserMenu: React.Dispatch<React.SetStateAction<boolean>>;
  mutation: UseMutationResult<{ message: string }, Error, object, unknown>;
}) {
  const { getFormFields } = useFormFields({ slug: Pages.USERS });
  const { getValidationSchema } = useFormValidations({ slug: Pages.USERS });

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      role: user?.role || UserType.USER,
    },
    mode: 'onChange',
    resolver: zodResolver(getValidationSchema() as typeof userSchema),
  });

  const onSubmit = async (data: Record<string, string>) => {
    const mutationData = user ? { ...data, id: user.id } : data;
    try {
      const res = await mutation.mutateAsync(mutationData);
      toast.success(res.message);
      setUserMenu(false);
    } catch (error) {
      if (error instanceof Error) {
        // Handle AxiosError specifically
        const axiosError = error as AxiosError<{ message: string }>;
        if (axiosError.response?.data?.message) {
          toast.error(axiosError.response.data.message);
        } else {
          toast.error('An error occurred');
        }
      } else {
        toast.error('An unexpected error occurred');
      }
    }
  };

  const formLoading = isSubmitting || mutation.isPending;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {getFormFields().map((field, index) => (
        <div key={index} className="mb-4">
          <FormFields {...field} control={control} errors={errors} />
        </div>
      ))}
      <Button type="submit" disabled={formLoading}>
        {user ? 'تحديث المستخدم' : 'انشاء مستخدم جديد'}
        {formLoading && <Loader />}
      </Button>
    </form>
  );
}

export default UserForm;
