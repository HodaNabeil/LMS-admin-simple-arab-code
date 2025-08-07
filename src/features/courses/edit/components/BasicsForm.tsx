import FormFields from "@/components/shared/form-fields/form-fields";
import { Button } from "@/components/ui/button";
import { Pages } from "@/constants/enums";
import useFormFields from "@/hooks/useFormFields";
import useFormValidations from "@/hooks/useFormValidations";
import type { BasicsSchema } from "@/validations/course";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type Control } from "react-hook-form";
import { toast } from "sonner";

export default function BasicsForm() {
  const { getFormFields } = useFormFields({ slug: Pages.BASICS });
  const { getValidationSchema } = useFormValidations({ slug: Pages.BASICS });
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<BasicsSchema>({
    defaultValues: {
      name: "",
      slug: "",
      hours: 0,
      //   pathId: "",
      image: undefined,
      video: undefined,
      description: "",
      level: "",
    },
    mode: "onChange",
    resolver: zodResolver(getValidationSchema()),
  });

  const onSubmit = async (data: BasicsSchema) => {
    console.log("🚀🚀 تم إرسال البيانات:", data);
    console.log(data);
    try {
      console.log("بيانات النموذج:", data);

      // إنشاء FormData لإرسال الملفات
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("slug", data.slug);
      formData.append("hours", data.hours.toString());
      //   formData.append("pathId", data.pathId);

      if (data.image) {
        formData.append("image", data.image as File);
      }

      if (data.video) {
        formData.append("video", data.video as File);
      }

      if (data.description) {
        formData.append("description", data.description);
      }

      if (data.level) {
        formData.append("level", data.level);
      }

      toast.success("تم حفظ البيانات بنجاح");
    } catch (error) {
      console.error("خطأ في حفظ البيانات:", error);
      toast.error("حدث خطأ في حفظ البيانات");
    }
  };

  return (
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
        انشاء دورة
      </Button>
    </form>
  );
}
