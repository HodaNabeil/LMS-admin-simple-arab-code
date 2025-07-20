
import useFormFields from "@/hooks/useFormFields";
import { Pages } from "@/constants/enums";
import { useForm, type Control } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormFields from "@/components/shared/form-fields/form-fields";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { basicsSchema, type BasicsSchema } from "@/validations/course";

export default function Basics() {
  const { getFormFields } = useFormFields({ slug: Pages.BASICS });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<BasicsSchema>({
    defaultValues: {
      name: "",
      slug: "",
      hours: 0,
      pathId: "",
      image: undefined,
      video: undefined,
      description: "",
      level: "",
    },
    mode: "onChange",
    resolver: zodResolver(basicsSchema),
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
      formData.append("pathId", data.pathId);
      
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

      // هنا يمكنك إضافة كود إرسال البيانات إلى الخادم
      // مثال:
      // const response = await fetch(`/api/courses/${slug}/basics`, {
      //   method: "PUT",
      //   body: formData,
      // });
      
      // if (response.ok) {
      //   toast.success("تم حفظ البيانات بنجاح");
      // } else {
      //   toast.error("حدث خطأ في حفظ البيانات");
      // }
      
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
