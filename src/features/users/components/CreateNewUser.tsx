import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Directions } from "@/constants/enums";
import UserForm from "./UserForm";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";

export function CreateNewUser() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Create new user</Button>
      </DialogTrigger>
      <DialogContent dir={Directions.RTL} className="sm:max-w-[425px]">
        <DialogHeader className="!text-right">
          <DialogTitle>إنشاء مستخدم جديد</DialogTitle>
          <DialogDescription>
            أدخل تفاصيل المستخدم الجديد أدناه. تأكد من ملء جميع الحقول المطلوبة
            بشكل صحيح.
          </DialogDescription>
        </DialogHeader>
        <UserForm actionLabel="انشاء مستخدم جديد" />
      </DialogContent>
    </Dialog>
  );
}
