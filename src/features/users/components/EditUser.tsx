import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Directions } from "@/constants/enums";
import UserForm from "./UserForm";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { Edit } from "lucide-react";
import type { User } from "@/types/user";

export function EditUser({ user }: { user: User }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Edit className="w-4 h-4" />
      </DialogTrigger>
      <DialogContent dir={Directions.RTL} className="sm:max-w-[425px]">
        <DialogHeader className="!text-right">
          <DialogTitle>تعديل المستخدم</DialogTitle>
          <DialogDescription>
            أدخل تفاصيل المستخدم لتحديثها. تأكد من ملء جميع الحقول المطلوبة بشكل
            صحيح.
          </DialogDescription>
        </DialogHeader>
        <UserForm actionLabel="تعديل" user={user} />
      </DialogContent>
    </Dialog>
  );
}
