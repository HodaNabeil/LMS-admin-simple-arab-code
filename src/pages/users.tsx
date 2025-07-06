import { User } from "lucide-react";
import { StatsCard } from "@/features/users/components/StatsCard";
import { useUsers } from "@/hooks/useUsers";
import { CreateNewUser } from "@/features/users/components/CreateNewUser";
import UserTable from "@/features/users/components/UserTable";
import { Loader } from "@/components/shared/loader";

const studentsData1 = [
  { date: "2025-06-12", value: 1 },
  { date: "2025-06-16", value: 4 },
  { date: "2025-06-17", value: 1 },
  { date: "2025-06-12", value: 1 },
  { date: "2025-06-16", value: 4 },
  { date: "2025-06-17", value: 1 },

  { date: "2025-06-12", value: 1 },
  { date: "2025-06-16", value: 4 },
  { date: "2025-06-17", value: 1 },
  { date: "2025-06-12", value: 1 },
  { date: "2025-06-16", value: 4 },
  { date: "2025-06-17", value: 1 },
];

export default function Users() {
  const { data, isLoading, isError } = useUsers();

  let userTable;
  if (isLoading) {
    userTable = (
      <div className="flex justify-center items-center h-64">
        <Loader />
      </div>
    );
  }
  if (!isLoading && isError) {
    userTable = (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500">حدث خطأ أثناء تحميل البيانات</p>
      </div>
    );
  }
  if (!isLoading && data) {
    userTable = (
      <>
        <UserTable users={data.users} />
      </>
    );
  }
  return (
    <>
      <div className="grid grid-cols-3 gap-1 p-2">
        <StatsCard
          title="Total Students"
          value={1}
          icon={<User className="w-5 h-5 text-gray-300" />}
          data={studentsData1}
        />
      </div>

      <div className="flex justify-between items-center m-4">
        <h2 className="text-2xl font-bold text-blue-800">Users</h2>
        <CreateNewUser />
      </div>
      {userTable}
    </>
  );
}
