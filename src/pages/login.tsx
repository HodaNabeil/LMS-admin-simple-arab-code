import { Pages } from "@/constants/enums";
import useFormFields from "@/hooks/useFormFields";
import useFormValidations from "@/hooks/useFormValidations";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { LoadingButton } from "@/components/shared/loader";
import FormFields from "@/components/shared/form-fields/form-fields";
import { useAuthStore } from "@/features/auth/store";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import type { LoginRequest } from "@/types/user";
import type { loginSchema } from "@/validations/login";
function Login() {
  const { getFormFields } = useFormFields({ slug: Pages.LOGIN });
  const { getValidationSchema } = useFormValidations({ slug: Pages.LOGIN });
  const navigate = useNavigate();
  const { login, isLoading } = useAuthStore();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const DEFAULT_VALUES: any = {};
  for (const field of getFormFields()) {
    DEFAULT_VALUES[field.name] = "";
  }

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(getValidationSchema() as typeof loginSchema),
    mode: "onChange",
    defaultValues: DEFAULT_VALUES,
  });

  const onSubmit = async (data: Record<string, unknown>) => {
    try {
      const { message } = await login(data as LoginRequest);
      toast.success(message);
      navigate("/admin");
    } catch (error: unknown) {
      // Handle error
      const errorMessage =
        (error as Error & { response?: { data?: { message?: string } } })
          ?.response?.data?.message || "حدث خطأ أثناء تسجيل الدخول";
      toast.error(errorMessage);
    }
  };

  const formLoading = isSubmitting || isLoading;

  return (
    <div className="container element-center min-h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col bg-[#ffffff] p-4 rounded-lg shadow w-full max-w-md"
      >
        {getFormFields().map((field, index) => (
          <div key={index}>
            <FormFields {...field} control={control} errors={errors} />
          </div>
        ))}
        <Button
          type="submit"
          className="w-full h-10 mt-4 text-white font-medium"
        >
          <LoadingButton
            loading={formLoading}
            loadingText="جار تسجيل الدخول..."
            loaderSize="sm"
          >
            تسجيل الدخول
          </LoadingButton>
        </Button>
      </form>
    </div>
  );
}

export default Login;
