import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader } from "@/components/shared/loader";
import type { AxiosError } from "axios";
import { useState } from "react";
import { useDeletePath } from "../hooks/usePathsMutations";
export default function DeletePath({ pathId }: { pathId: string }) {
  const [userMenu, setUserMenu] = useState(false);
  const { mutateAsync, isPending } = useDeletePath();
  const handleDeletePath = async (id: string) => {
    try {
      const res = await mutateAsync(id);
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
  return (
    <Dialog open={userMenu} onOpenChange={(open) => setUserMenu(open)}>
      <DialogTrigger asChild>
        <Button variant="link" className="text-red-600 hover:text-red-800">
          <Trash2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="!text-right">
          <DialogTitle>حذف المسار</DialogTitle>
          <DialogDescription>هل انت متاكد من حذف المسار؟</DialogDescription>
        </DialogHeader>
        <Button
          type="submit"
          disabled={isPending}
          onClick={() => handleDeletePath(pathId)}
        >
          حذف المسار
          {isPending && <Loader />}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
