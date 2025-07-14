import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Directions } from "@/constants/enums";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader } from "@/components/shared/loader";
import type { AxiosError } from "axios";
import { useState } from "react";
import { useDeleteUser } from "../hooks/useUsersMutations";
export default function DeleteUser({ userId }: { userId: string }) {
  const [userMenu, setUserMenu] = useState(false);
  const { mutateAsync, isPending } = useDeleteUser();
  const handleDeleteUser = async (id: string) => {
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
        <Trash2 className="h-4 w-4" />
      </DialogTrigger>
      <DialogContent dir={Directions.RTL} className="sm:max-w-[425px]">
        <DialogHeader className="!text-right">
          <DialogTitle>حذف المستخدم</DialogTitle>
          <DialogDescription>
            هل أنت متأكد أنك تريد حذف هذا المستخدم؟ هذه العملية لا يمكن التراجع
            عنها.
          </DialogDescription>
        </DialogHeader>
        <Button
          type="submit"
          disabled={isPending}
          onClick={() => handleDeleteUser(userId)}
        >
          حذف المستخدم
          {isPending && <Loader />}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
