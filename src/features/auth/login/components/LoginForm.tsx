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
import { cn } from "../../../../lib/utils";
import { isAdmin } from '@/lib/auth-utils';
import { Form } from '@/components/ui/form';



type LoginSchema = z.infer<typeof loginSchema>;

export default function LoginForm() {


    const { getFormFields } = useFormFields({ slug: Pages.LOGIN });
    const { getValidationSchema } = useFormValidations({ slug: Pages.LOGIN });
    const navigate = useNavigate();
    const { login, isLoading } = useAuthStore();


    const formMethods = useForm<LoginSchema>({
        resolver: zodResolver(getValidationSchema() as typeof loginSchema),
        mode: "onChange",
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const { handleSubmit, control, formState: { errors, isSubmitting } } = formMethods;

    const onSubmit = async (data: LoginSchema) => {

        console.log(data);
        try {
            const { message, data: authData } = await login(data);

            toast.success(message);
            
            // Validate admin role before allowing access to admin area
            if (authData?.accessToken && authData?.user) {
                if (isAdmin(authData.user)) {
                    navigate("/admin");
                } else {
                    // Clear authentication and show error for non-admin users
                    toast.error("غير مصرح لك بالوصول إلى لوحة الإدارة. هذا المحتوى متاح للمدراء فقط.");
                    // You might want to logout the user or redirect to appropriate page
                    // For now, we'll keep them logged in but show the error
                }
            } else if (authData?.accessToken) {
                // Fallback for cases where user data might not be available
                navigate("/admin");
            }

        } catch (error) {
            handleApiError(error);

        }
    };

    const formLoading = isSubmitting || isLoading;
    
    return (
        <Form {...formMethods}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={cn('flex', 'flex-col', 'bg-[#ffffff]', 'p-4', 'rounded-lg', 'shadow', 'w-full', 'max-w-md')}
            >
                {getFormFields().map((field) => (
                    <div key={field.name}>
                        <FormFields {...field}
                            control={control} errors={errors} />
                    </div>
                ))}
                <Button
                    type="submit"
                    className={cn('w-full', 'h-10', 'mt-4', 'text-white', 'font-medium')}
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
        </Form>
    )
}
