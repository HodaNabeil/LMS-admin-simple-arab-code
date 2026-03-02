import useFormFields from '@/hooks/useFormFields';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader } from '@/components/shared/loader';
import { Pages, UserType } from '@/constants/enums';
import FormFields from '@/components/shared/form-fields/form-fields';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import type { User, CreateUserDto, UpdateUserDto } from '@/types/user';
import type { UseMutationResult } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createUserValidation, updateUserValidation } from '@/validations/user';
import { cn } from "../../../lib/utils";
import { handleApiError } from '@/lib/error-handler';

type UserFormProps = {
  setUserMenu: React.Dispatch<React.SetStateAction<boolean>>;
} & (
    | {
      user: User;
      mutation: UseMutationResult<{ message: string },
        Error, { id: string; data: UpdateUserDto }, unknown>;
    }
    | {
      user?: undefined;
      mutation: UseMutationResult<{ message: string }, Error, CreateUserDto, unknown>;
    }
  );

type UserFormValues = {
  name: string;
  email: string;
  password?: string;
  role?: UserType;
};

function UserForm({ user, setUserMenu, mutation }: UserFormProps) {
  const { getFormFields } = useFormFields({ slug: Pages.USERS });

  const formMethods = useForm<UserFormValues>({
    defaultValues: {
      name: user?.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : '',
      email: user?.email || '',
      password: user ? undefined : '',
      role: (user?.role as unknown as UserType) || UserType.USER,
    },
    mode: 'onChange',
    resolver: zodResolver(user ? updateUserValidation : createUserValidation),
  });

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = formMethods;

  async function onSubmit(data: UserFormValues) {
    try {
      const trimmedName = (data.name || "").trim();
      const nameParts = trimmedName.split(/\s+/);
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || undefined;

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { name: _name, password, ...restData } = data;

      const mutationData = {
        ...restData,
        firstName,
        lastName,
        ...(user ? (password ? { password } : {}) : { password: password || "" }),
      };

      let res;
      if (user) {
        res = await mutation.mutateAsync({
          id: user.id,
          data: mutationData as unknown as UpdateUserDto,
        });
      } else {
        res = await mutation.mutateAsync(mutationData as unknown as CreateUserDto);
      }

      const successMessage = res?.message || (user ? "تم تحديث المستخدم بنجاح" : "تم إنشاء المستخدم بنجاح");
      toast.success(successMessage);
      setUserMenu(false);
    } catch (error) {
      handleApiError(error as Error);
    }
  }

  const formLoading = isSubmitting || mutation.isPending;

  return (
    <Form {...formMethods}>
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
    </Form>
  );
}

export default UserForm;
