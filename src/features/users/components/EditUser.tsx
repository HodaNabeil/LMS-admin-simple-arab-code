import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import UserForm from "./UserForm";
import { Edit } from "lucide-react";
import type { User } from "@/types/user";
import { useState } from "react";
import { useUpdateUser } from "../hooks/useUsersMutations";
import { cn } from "../../../lib/utils";

export function EditUser({ user }: { user: User }) {
  const [userMenu, setUserMenu] = useState(false);
  const mutation = useUpdateUser();
  return (
    <Dialog open={userMenu}
      onOpenChange={(open) =>
        setUserMenu(open)}>
      <DialogTrigger asChild>
        <Edit className={cn('w-4', 'h-4')} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="text-right">
          <DialogTitle>تعديل المستخدم</DialogTitle>
          <DialogDescription className="sr-only">
            تعديل بيانات المستخدم
          </DialogDescription>
        </DialogHeader>
        <UserForm user={user} setUserMenu={setUserMenu} mutation={mutation} />
      </DialogContent>
    </Dialog>
  );
}
