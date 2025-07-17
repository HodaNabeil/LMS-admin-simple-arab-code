import FormFields from "@/components/shared/form-fields/form-fields";
import { Pages } from "@/constants/enums";
import useFormFields from "@/hooks/useFormFields";
import useFormValidations from "@/hooks/useFormValidations";
import type { ICreateCourseForm } from "@/validations/createcourse";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";


export default function CreateCourse() {
  const { getFormFields } = useFormFields({ slug: Pages.CREATE_COURSES });
  const { getValidationSchema } = useFormValidations({ slug: Pages.CREATE_COURSES });
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ICreateCourseForm>({
    defaultValues: {
      slug: "",
      selectedPath: "",
    },
    mode: "onChange",
    resolver: zodResolver(getValidationSchema()),
  });

  const onSubmit = async (data: ICreateCourseForm) => {
    console.log(data);
 
    navigate(`/admin/courses/${data.slug}/manage/goals`);
  };
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="flex flex-col gap-4 w-full max-w-md p-6 bg-white rounded-lg shadow-md border border-gray-200">
        <h1 className="text-xl font-bold text-gray-600 mb-4 text-center border-b border-gray-200 pb-4 w-full">
          إضافة كورس جديد
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {getFormFields().map((field) => (
            <FormFields key={field.name}
              {...field}
              control={control}
              errors={errors}
            />
          ))}
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="bg-primary text-white rounded px-4 py-2 text-sm hover:bg-primary/90 transition disabled:opacity-50"
          >
            {isSubmitting ? "جاري الإضافة..." : "إضافة"}
          </button>
          {isSubmitting && <p className="text-sm text-gray-500 text-center">جاري التحميل...</p>}
        </form>
      </div>
    </div>
  );
}
