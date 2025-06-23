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

function UserForm({ actionLabel, user }: { actionLabel: string; user: User }) {
  const { getFormFields } = useFormFields({ slug: Pages.USERS });
  const { getValidationSchema } = useFormValidations({ slug: Pages.USERS });

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
    console.log("Form submitted with data:", data);
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
