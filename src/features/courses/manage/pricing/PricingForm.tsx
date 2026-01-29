import { useEffect } from "react";
import { useForm, type Control } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import FormFields from "@/components/shared/form-fields/form-fields";
import { Pages } from "@/constants/enums";

import useFormFields from "@/hooks/useFormFields";
import useFormValidations from "@/hooks/useFormValidations";

import type { pricingSchema, PricingSchema } from "@/validations/course";

import { useCourseManageStore } from "../store";

interface PricingFormProps {
  price?: number;
  compareAtPrice?: number;
}

export default function PricingForm({
  price,
  compareAtPrice,
}: PricingFormProps) {
  const { getFormFields } = useFormFields({ slug: Pages.PRICING });
  const { getValidationSchema } = useFormValidations({ slug: Pages.PRICING });

  const {
    control,
    formState: { errors },
    watch,
    reset,
  } = useForm<PricingSchema>({
    defaultValues: {
      price,
      compareAtPrice,
    },
    mode: "onChange",
    resolver: zodResolver(getValidationSchema() as typeof pricingSchema),
  });

  const { setPrice, setCompareAtPrice } = useCourseManageStore();

  const watchedFields = watch(["price", "compareAtPrice"]);

  const [watchedPrice, watchedCompareAtPrice] = watchedFields;

  useEffect(() => {
    if (price !== undefined) {
      reset({
        price,
        compareAtPrice,
      });
    }
  }, [price, compareAtPrice, reset]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPrice(Number(watchedPrice));
      setCompareAtPrice(Number(watchedCompareAtPrice));
    }, 300);

    return () => clearTimeout(timeout);
  }, [watchedPrice, watchedCompareAtPrice, setPrice, setCompareAtPrice]);

  return (
    <div className="flex flex-col gap-6">
      {getFormFields().map((field, index) => (
        <div key={index} className="mb-4">
          <FormFields
            {...field}
            control={control as Control<PricingSchema>}
            errors={errors}
          />
        </div>
      ))}
    </div>
  );
}
