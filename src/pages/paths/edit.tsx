import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Edit } from "lucide-react";
import { useState } from "react";
import type { Path } from "@/types/path";
import { Directions, Pages } from "@/constants/enums";
import useFormFields from "@/hooks/useFormFields";
import useFormValidations from "@/hooks/useFormValidations";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormFields from "@/components/shared/form-fields/form-fields";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/shared/loader";
import { useUpdatePath } from "@/features/paths/hooks/usePathsMutations";
import ImageField from "@/components/shared/form-fields/image-field";

export function EditPath({ path }: { path: Path }) {
  const { getFormFields } = useFormFields({ slug: Pages.PATHS });
  const { getValidationSchema } = useFormValidations({
    slug: Pages.PATHS,
  });
  const [userMenu, setUserMenu] = useState(false);
  const mutation = useUpdatePath();
  const [hasSelectedImage, setHasSelectedImage] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = useForm<any>({
    defaultValues: path || {
      name: "",
      description: "",
      slug: "",
      heading: "",
      image: null,
      roadmap: null,
    },
    mode: "onChange",
    resolver: zodResolver(getValidationSchema()),
  });
  const onSubmit = async (data: Path) => {
    const formData = new FormData();
    formData.append("id", data.id);
    formData.append("name", data.name);
    formData.append("slug", data.slug);
    formData.append("heading", data.heading);
    formData.append("description", data.description);
    if (data.roadmapUrl) formData.append("roadmapUrl", data.roadmapUrl);
    if (data.image && typeof data.image !== "string") {
      formData.append("image", data.image);
    }
    try {
      await mutation.mutateAsync(formData); 
      setUserMenu(false);
    } catch (error) {
      console.log(error);
    }
  };

  const formLoading = isSubmitting || mutation.isPending;
  return (
    <Dialog open={userMenu} onOpenChange={setUserMenu}>
      <DialogTrigger asChild>
        <Button variant="link" className="text-primary hover:text-black">
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent   dir={Directions.LTR} 
        className="sm:max-w-[500px] block max-h-[80vh] overflow-y-auto" 
        style={{ direction: 'ltr' }}>
        <DialogHeader className="!text-right">
          <DialogTitle>تعديل المسار التعليمي</DialogTitle>
          <DialogDescription>
            قم بتعديل بيانات المسار ثم اضغط على "حفظ".
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          {getFormFields().map((field, index) => (
            <div key={index} className="mb-4">
              {field.type === "image" ? (
                <>
                  <div className="flex  flex-row-reverse  justify-end   gap-2 mb-2 " >
                    <span>{field.label}</span>
                    {(path.image || hasSelectedImage) ? (
                      <span className="text-blue-600 text-sm font-medium">
                        تغيير الصورة
                      </span>
                    ) : (
                      <span className="text-red-600 text-sm font-medium">
                        اختيار صورة
                      </span>
                    )}
                  </div>
                  <ImageField
                    name={field.name}
                    control={control}
                    errors={errors}
                    type="image"
                    placeholder={field.placeholder}
                    onImageChange={() => setHasSelectedImage(true)}
                  />
                </>
              ) : (
                <FormFields {...field} control={control} errors={errors} />
              )}
            </div>
          ))}

          <Button type="submit" disabled={formLoading}>
            {formLoading && <Loader />}
            تعديل المسار
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
