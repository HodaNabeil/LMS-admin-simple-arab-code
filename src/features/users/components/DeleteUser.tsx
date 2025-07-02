import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Directions } from "@/constants/enums";
import { Delete } from "lucide-react";
import UserForm from "./UserForm";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function DeleteUser({ user }: { user: any }) {
  if (!user) {
    return null;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Delete className="w-4 h-4" />
      </DialogTrigger>
      <DialogContent dir={Directions.RTL} className="sm:max-w-[425px]">
        <DialogHeader className="!text-right">
          <DialogTitle>حذف المستخدم</DialogTitle>
          <DialogDescription>
            هل أنت متأكد أنك تريد حذف هذا المستخدم؟ هذه العملية لا يمكن التراجع
            عنها.
          </DialogDescription>
        </DialogHeader>
        <UserForm
          actionLabel="حذف المستخدم"
          user={{ name: user.name, email: user.email, role: user.role }}
        />
      </DialogContent>
    </Dialog>
  );
}
