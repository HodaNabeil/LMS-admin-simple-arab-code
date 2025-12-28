import FormFields from "@/components/shared/form-fields/form-fields";
import { Button } from "@/components/ui/button";
import { Pages } from "@/constants/enums";
import useFormFields from "@/hooks/useFormFields";
import useFormValidations from "@/hooks/useFormValidations";
import { pricingSchema, type PricingSchema } from "@/validations/course";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type Control } from "react-hook-form";

export default function PricingForm() {
  const { getFormFields } = useFormFields({ slug: Pages.PRICING });
  const { getValidationSchema } = useFormValidations({ slug: Pages.PRICING });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PricingSchema>({
    resolver: zodResolver(getValidationSchema() as unknown as typeof pricingSchema),
    defaultValues: {
      priceInCents: 0,
      price: 0,
    },
  });
  const onSubmit = (data: PricingSchema) => {
    console.log(data);
  };
  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        {getFormFields().map((field, index) => (
          <div key={index} className="mb-4">
            <FormFields
              {...field}
              control={control as unknown as Control<Record<string, unknown>>}
              errors={errors}
            />
          </div>
        ))}
        <Button type="submit" className="mt-4">
          حفظ
        </Button>
      </form>
    </div>
  );
}

