import { Pages } from '@/constants/enums';
import useFormFields from '@/hooks/useFormFields';
import useFormValidations from '@/hooks/useFormValidations';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { LoadingButton } from '@/components/shared/loader';
import FormFields from '@/components/shared/form-fields/form-fields';
import { useAuthStore } from '@/features/auth/store';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { loginSchema } from '@/validations/login';
import type { z } from 'zod';
import { handleApiError } from '@/lib/error-handler';



type LoginSchema = z.infer<typeof loginSchema>;

export default function LoginForm() {


    const { getFormFields } = useFormFields({ slug: Pages.LOGIN });
    const { getValidationSchema } = useFormValidations({ slug: Pages.LOGIN });
    const navigate = useNavigate();
    const { login, isLoading } = useAuthStore();


    const {
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm<LoginSchema>({
        resolver: zodResolver(getValidationSchema() as typeof loginSchema),
        mode: "onChange",
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: LoginSchema) => {

        console.log(data);
        try {
            const { message, data: authData } = await login(data);

            toast.success(message);
            if (authData?.accessToken) {
                navigate("/admin");
            }

        } catch (error) {
            handleApiError(error);

        }
    };

    const formLoading = isSubmitting || isLoading;
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col bg-[#ffffff] p-4 rounded-lg shadow w-full max-w-md"
        >
            {getFormFields().map((field) => (
                <div key={field.name}>
                    <FormFields {...field}
                        control={control} errors={errors} />
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
    )
}
