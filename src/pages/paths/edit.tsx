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
import { useForm, type Control } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import type { AxiosError } from "axios";
import FormFields from "@/components/shared/form-fields/form-fields";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/shared/loader";
import { useUpdatePath } from "@/hooks/useFormPath";

export function EditPath({ path }: { path?: Path }) {
  console.log("path", path);
  const { getFormFields } = useFormFields({ slug: Pages.PATHS });
  const { getValidationSchema } = useFormValidations({
    slug: Pages.PATHS,
  });
  const [userMenu, setUserMenu] = useState(false);
  const mutation = useUpdatePath();
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: path?.title || "",
      description: path?.description || "",
      name: path?.name || "",
      slug: path?.slug || "",
      image: path?.image || null,
    },
    mode: "onChange",
    resolver: zodResolver(getValidationSchema()),
  });
  const onSubmit = async (data: Record<string, string>) => {
    const mutationData = path ? { ...data, id: path.id } : data;
    try {
      const res = await mutation.mutateAsync(mutationData);
      toast.success(res.message);
      setUserMenu(false);
    } catch (error) {
      if (error instanceof Error) {
        // Handle AxiosError specifically
        const axiosError = error as AxiosError<{ message: string }>;
        if (axiosError.response?.data?.message) {
          toast.error(axiosError.response.data.message);
        } else {
          toast.error("An error occurred");
        }
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  // const formLoading = isSubmitting || mutation.isPending;
  return (
    <Dialog open={userMenu} onOpenChange={setUserMenu}>
      <DialogTrigger asChild>
        <Edit className="h-4 w-4   cursor-pointer text-gray-600 hover:text-black" />
      </DialogTrigger>
      <DialogContent dir={Directions.RTL} className="sm:max-w-[500px]">
        <DialogHeader className="!text-right">
          <DialogTitle>تعديل المسار التعليمي</DialogTitle>
          <DialogDescription>
            قم بتعديل بيانات المسار ثم اضغط على "حفظ".
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          {getFormFields().map((field, index) => (
            <div key={index} className="mb-4">
              <FormFields
                {...field}
                control={control as Control<Record<string, unknown>>}
                errors={errors}
              />
            </div>
          ))}

          <Button type="submit">
            {isSubmitting ? <Loader /> : "تعديل المسار"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
