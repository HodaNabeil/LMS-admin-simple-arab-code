/* eslint-disable @typescript-eslint/no-explicit-any */
import useFormFields from "@/hooks/useFormFields";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "@/components/shared/loader";
import { Pages } from "@/constants/enums";
import FormFields from "@/components/shared/form-fields/form-fields";
import { Button } from "@/components/ui/button";
import type { User } from "@/types/user";
import type { Control } from "react-hook-form";
import useFormValidations from "@/hooks/useFormValidations";
import { useCreateUser, useDeleteUser, useUpdateUser } from "@/hooks/useUsers";
import { toast } from "sonner";

function UserForm({ actionLabel, user }: { actionLabel: string; user: User }) {
  const { getFormFields } = useFormFields({ slug: Pages.USERS });
  const { getValidationSchema } = useFormValidations({ slug: Pages.USERS });
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();
  const deleteUser = useDeleteUser(); // Assuming you have a similar hook for updating users
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      role: user?.role || "",
    },
    mode: "onChange",
    resolver: zodResolver(getValidationSchema()),
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    if (actionLabel === "انشاء مستخدم جديد") {
      createUser.mutate(data, {
        onSuccess: () => {
          toast.success("تم انشاء المستخدم بنجاح  ");
        },
        // onSuccess: () => {
        //   queryClient.invalidateQueries({ queryKey: [queryKeys.key] });
        // },
        onError: (error) => {
          // Check if error is an AxiosError
          if ((error as any)?.response?.status === 409) {
            toast.error("هذا المستخدم موجود بالفعل!");
          } else {
            console.error("Error creating user:", error);
          }
        },
      });
    }
    if (actionLabel === "تعديل") {
      updateUser.mutate(data);
      toast.success("تم تعديل المستخدم بنجاح");
    }
    if (actionLabel === "حذف") {
      deleteUser.mutate(String(user.id), {
        onSuccess: () => {
          toast.success("تم حذف المستخدم بنجاح");
        },
        onError: (error: any) => {
          if (error?.response?.status === 409) {
            toast.error("لا يمكن حذف المستخدم بسبب تعارض!");
          } else {
            console.error("Error deleting user:", error);
          }
        },
      });
    }
  };
  const formLoading = isSubmitting; // isLoading;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {getFormFields().map((field, index) => (
        <div key={index} className="mb-4">
          <FormFields
            {...field}
            control={control as unknown as Control<Record<string, unknown>>}
            errors={errors}
          />
        </div>
      ))}
      <Button type="submit" disabled={formLoading}>
        {actionLabel}
        {formLoading && <Loader />}
      </Button>
    </form>
  );
}

export default UserForm;
