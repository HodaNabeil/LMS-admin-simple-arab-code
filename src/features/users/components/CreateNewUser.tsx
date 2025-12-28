import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import UserForm from "./UserForm";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { useState } from "react";
import { useCreateUser } from "../hooks/useUsersMutations";

export function CreateNewUser() {
  const [userMenu, setUserMenu] = useState(false);
  const mutation = useCreateUser();

  return (
    <Dialog open={userMenu} onOpenChange={(open) => setUserMenu(open)}>
      <DialogTrigger asChild>
        <Button variant="default">انشاء مستخدم جديد</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="!text-right">
          <DialogTitle>إنشاء مستخدم جديد</DialogTitle>
          <DialogDescription>
            أدخل تفاصيل المستخدم الجديد أدناه. تأكد من ملء جميع الحقول المطلوبة
            بشكل صحيح.
          </DialogDescription>
        </DialogHeader>
        <UserForm setUserMenu={setUserMenu} mutation={mutation} />
      </DialogContent>
    </Dialog>
  );
}
