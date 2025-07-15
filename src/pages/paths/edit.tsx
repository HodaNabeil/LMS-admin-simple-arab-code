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
import { toast } from "sonner";
import type { AxiosError } from "axios";
import FormFields from "@/components/shared/form-fields/form-fields";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/shared/loader";
import { useUpdatePath } from "@/features/paths/hooks/usePathsMutations";

export function EditPath({ path }: { path: Path }) {
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
    try {
      await mutation.mutateAsync(data); // Call the mutation to update the path (fetch request)
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

  const formLoading = isSubmitting || mutation.isPending;
  return (
    <Dialog open={userMenu} onOpenChange={setUserMenu}>
      <DialogTrigger asChild>
        <Button variant="link" className="text-primary hover:text-black">
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent dir={Directions.RTL} className="sm:max-w-[500px] block">
        <DialogHeader className="!text-right">
          <DialogTitle>تعديل المسار التعليمي</DialogTitle>
          <DialogDescription>
            قم بتعديل بيانات المسار ثم اضغط على "حفظ".
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          {getFormFields().map((field, index) => (
            <div key={index} className="mb-4">
              <FormFields {...field} control={control} errors={errors} />
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
