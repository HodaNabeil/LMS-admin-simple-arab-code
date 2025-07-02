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
import { useCreateUser } from "@/hooks/useUsers";
import { toast } from "sonner";

function UserForm({ actionLabel, user }: { actionLabel: string; user: User }) {
  const { getFormFields } = useFormFields({ slug: Pages.USERS });
  const { getValidationSchema } = useFormValidations({ slug: Pages.USERS });
  const createUser = useCreateUser();
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
          console.log("User created successfully");
        },
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
