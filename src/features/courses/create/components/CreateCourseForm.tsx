import FormFields from "@/components/shared/form-fields/form-fields";
import { Loader } from "@/components/shared/loader";
import { Pages } from "@/constants/enums";
import useFormFields from "@/hooks/useFormFields";
import useFormValidations from "@/hooks/useFormValidations";
import { createSectionCourseSchema } from "@/validations/course";
import { type ICreateCourseForm } from "@/validations/createcourse";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type Control } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function CreateCourseForm() {
  const { getFormFields } = useFormFields({ slug: Pages.CREATE_COURSES });
  const { getValidationSchema } = useFormValidations({
    slug: Pages.CREATE_COURSES,
  });
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
    resolver: zodResolver(
      getValidationSchema() as typeof createSectionCourseSchema
    ),
  });

  const handleFormSubmit = async (data: ICreateCourseForm) => {
    try {
      navigate(`/admin/${Pages.COURSES}/${data.slug}/${Pages.GOALS}`);
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };
  return (
    <div className="flex flex-col gap-4 w-full max-w-2xl  p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h1 className="text-xl font-bold text-gray-600 mb-4 text-center border-b border-gray-200 pb-4 w-full">
        إضافة كورس جديد
      </h1>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex flex-col gap-4"
      >
        {getFormFields().map((field) => (
          <FormFields
            key={field.name}
            {...field}
            control={control as unknown as Control<Record<string, unknown>>}
            errors={errors}
          />
        ))}

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-primary text-white rounded px-4 py-2 text-sm hover:bg-primary/90 transition disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isSubmitting ? <Loader /> : "إضافة كورس"}
        </button>
      </form>
    </div>
  );
}
