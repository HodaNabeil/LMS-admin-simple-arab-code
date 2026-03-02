import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import UserForm from "./UserForm";
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
      <DialogContent >
        <DialogHeader className="text-right!">
          <DialogTitle>إنشاء مستخدم جديد</DialogTitle>
          <DialogDescription className="sr-only">
            تعبئة بيانات المستخدم الجديد
          </DialogDescription>
        </DialogHeader>
        <UserForm setUserMenu={setUserMenu} mutation={mutation} />
      </DialogContent>
    </Dialog>
  );
}
