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
import { useCreateUser, useUpdateUser } from "@/hooks/useUsers";
import { toast } from "sonner";
import { useMemo } from "react";

function UserForm({ actionLabel, user }: { actionLabel: string; user: User }) {
  const { getFormFields } = useFormFields({ slug: Pages.USERS });
  const { getValidationSchema } = useFormValidations({ slug: Pages.USERS });
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();
  const mutation =
    actionLabel === "انشاء مستخدم جديد" ? createUser : updateUser;

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      role: user?.role || "",
      id: user?.id || "", // Ensure id is included for updates
    },
    mode: "onChange",
    resolver: zodResolver(getValidationSchema()),
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    mutation.mutate(data, {
      onSuccess: () => {
        toast.success(
          actionLabel === "انشاء مستخدم جديد"
            ? "تم انشاء المستخدم بنجاح"
            : "تم تحديث المستخدم بنجاح"
        );
      },
      onError: (error) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((error as any)?.response?.status === 409) {
          toast.error("هذا المستخدم موجود بالفعل!");
        } else {
          console.error("خطأ:", error);
          toast.error("حدث خطأ غير متوقع");
        }
      },
    });
  };

  const formFields = useMemo(() => getFormFields(), [getFormFields]);

  const formLoading = isSubmitting; // isLoading;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {formFields.map((field, index) => (
        <div key={index} className="mb-4">
          <FormFields
            {...field}
            control={control as Control<Record<string, unknown>>}
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
