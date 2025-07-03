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
import { useDeleteUser } from "@/hooks/useUsers";
import { toast } from "sonner";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function DeleteUser({ user }: { user: any }) {
  const deleteUser = useDeleteUser();
  if (!user) {
    return null;
  }
  const handleDeleteUser = () => {
    deleteUser.mutate(String(user.id), {
      onSuccess: () => {
        toast.success("تم حذف المستخدم بنجاح");
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (error: any) => {
        if (error?.response?.status === 409) {
          toast.error("لا يمكن حذف المستخدم بسبب تعارض!");
        } else {
          console.error("Error deleting user:", error);
        }
      },
    });
  };
  return (
    <Dialog>
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
        <Button type="submit" onClick={handleDeleteUser}>
          حذف المستخدم
        </Button>
      </DialogContent>
    </Dialog>
  );
}
