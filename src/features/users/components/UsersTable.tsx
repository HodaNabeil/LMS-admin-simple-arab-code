import { useEffect, useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { Edit, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { DialogHeader } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { InputTypes } from "@/constants/enums";
import FormFields from "@/components/shared/form-fields/form-fields";
import { CreateNewUser } from "./CreateNewUser";
import { EditUser } from "./EditUser";
import DeleteUser from "./DeleteUser";

// بيانات وهمية مؤقتة
const mockData = [
  { id: "1", name: "Kareem Shimes", email: "kareem4shimas@gmail.com" },
  { id: "2", name: "Kareem Mo", email: "kmo939929@gmail.com" },
  { id: "3", name: "Nabeil", email: "hodanabeli67@gmail.com" },
  { id: "4", name: "Ahmed Mohamed", email: "ahmed01212160mohamed@gmail.com" },
];

export default function UsersTable() {
  const [data, setData] = useState(mockData);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState(""); // "edit" | "delete" | "create"
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const { control, handleSubmit, reset, formState } = useForm();

  // جلب البيانات من API
  // useEffect(() => {
  //   fetch("http://localhost:3000/admin/users") // غيّري الرابط حسب API عندك
  //     .then(res => res.json())
  //     .then(setData);
  // }, []);

  // فتح المودال
  const handleEdit = (user: any) => {
    setSelectedUser(user);
    setDialogType("edit");
    setDialogOpen(true);
  };
  const handleDelete = (user: any) => {
    setSelectedUser(user);
    setDialogType("delete");
    setDialogOpen(true);
  };
  const handleCreate = () => {
    setSelectedUser(null);
    setDialogType("create");
    setDialogOpen(true);
    reset(); // إعادة تعيين الحقول عند الفتح
  };

  const columns = (onEdit: any, onDelete: any) => [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }: { row: any }) => (
        <div className="flex gap-2 items-center">
          <button>
            <EditUser user={row.original} />
          </button>

          <button>
            <DeleteUser user={row.original} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className=" p-2 ">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-blue-800">Users</h2>
        <CreateNewUser />
      </div>
      <DataTable columns={columns(handleEdit, handleDelete)} data={data} />
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}></Dialog>
    </div>
  );
}
