import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import UserForm from "./UserForm";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Edit } from "lucide-react";
import type { User } from "@/types/user";
import { useState } from "react";
import { useUpdateUser } from "../hooks/useUsersMutations";

export function EditUser({ user }: { user: User }) {
  const [userMenu, setUserMenu] = useState(false);
  const mutation = useUpdateUser();
  return (
    <Dialog open={userMenu}
      onOpenChange={(open) =>
        setUserMenu(open)}>
      <DialogTrigger asChild>
        <Edit className="h-4 w-4" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="!text-right">
          <DialogTitle>تعديل المستخدم</DialogTitle>

        </DialogHeader>
        <UserForm user={user} setUserMenu={setUserMenu} mutation={mutation} />
      </DialogContent>
    </Dialog>
  );
}
