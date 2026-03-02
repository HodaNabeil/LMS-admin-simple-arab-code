import useFormFields from '@/hooks/useFormFields';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader } from '@/components/shared/loader';
import { Pages, UserType } from '@/constants/enums';
import FormFields from '@/components/shared/form-fields/form-fields';
import { Button } from '@/components/ui/button';
import type { User } from '@/types/user';
import type { UseMutationResult } from '@tanstack/react-query';
import { toast } from 'sonner';
import type { AxiosError } from 'axios';
import { createUserValidation, updateUserValidation } from '@/validations/user';
import { cn } from "../../../lib/utils";
import { handleApiError } from '@/lib/error-handler';

function UserForm({
  user,
  setUserMenu,
  mutation,
}: {
  user?: User;
  setUserMenu: React.Dispatch<React.SetStateAction<boolean>>;
  mutation: UseMutationResult<{ message: string }, Error, any, any>;
}) {
  const { getFormFields } = useFormFields({ slug: Pages.USERS });

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: user?.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : '',
      email: user?.email || '',
      password: '',
      role: (user?.role as unknown as UserType) || UserType.USER,
    },
    mode: 'onChange',
    resolver: zodResolver(user ? updateUserValidation : createUserValidation),
  });

  const onSubmit = async (data: Record<string, string>) => {
    const nameParts = data.name.split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ');


    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { name, ...restData } = data;
    const mutationData = {
      ...restData,
      firstName,
      lastName,
    };
    try {
      let res;
      if (user) {
        res = await mutation.mutateAsync({
          id: user.id,
          data: mutationData as any,
        });
      } else {
        res = await mutation.mutateAsync(mutationData as any);
      }
      toast.success(res.message);
      setUserMenu(false);
    } catch (error) {
      handleApiError(error as Error);
    }
  };

  const formLoading = isSubmitting || mutation.isPending;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn('max-h-[calc(100vh-200px)]', 'overflow-y-auto')}>
      {getFormFields().filter(field => user ? field.name !== 'password' : true).map((field, index) => (
        <div key={index} className="mb-4">
          <FormFields {...field} control={control} errors={errors} />
        </div>
      ))}
      <Button type="submit" disabled={formLoading} className='w-full'>
        {user ? 'تحديث المستخدم' : 'انشاء مستخدم جديد'}
        {formLoading && <Loader />}
      </Button>
    </form>
  );
}

export default UserForm;
