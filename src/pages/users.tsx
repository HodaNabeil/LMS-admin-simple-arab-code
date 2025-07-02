import { User } from "lucide-react";
import { StatsCard } from "@/features/users/components/StatsCard";
import { useMemo, useState } from "react";
import UsersFilters from "@/features/users/components/UsersFilters";
import UserTableFilter from "@/features/users/components/UserTableFilter";
import { useUsers } from "@/hooks/useUsers";
import { CreateNewUser } from "@/features/users/components/CreateNewUser";

const studentsData1 = [
  { date: "2025-06-12", value: 1 },
  { date: "2025-06-16", value: 4 },
  { date: "2025-06-17", value: 1 },
];
const studentsData2 = [
  { date: "2025-06-19", value: 1 },
  { date: "2025-06-12", value: 1 },
  { date: "2025-06-16", value: 10 },
  { date: "2025-06-16", value: 19 },
];
const studentsData3 = [
  { date: "2025-06-10", value: 1 },
  { date: "2025-06-11", value: 1 },
  { date: "2025-06-12", value: 1 },
  { date: "2025-06-16", value: 4 },
  { date: "2025-06-17", value: 1 },
  { date: "2025-06-18", value: 1 },
  { date: "2025-06-19", value: 1 },
];

export default function Users() {
  const { data } = useUsers();
  console.log(" users", data?.users);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const users = data?.users || [];
  const [searchTerm, setSearchTerm] = useState(""); // قيمة افتراضية فارغة
  const [selectedCategory, setSelectedCategory] = useState("الكل");

  const filteredUsers = useMemo(() => {
    return users.filter(
      (user: { id: { toString: () => string | string[] }; role: string }) => {
        // البحث فقط في id
        const matchesSearch = user.id?.toString().includes(searchTerm);

        const matchesCategory =
          selectedCategory === "الكل" || user.role === selectedCategory;

        return matchesSearch && matchesCategory;
      }
    );
  }, [users, searchTerm, selectedCategory]); // أضيفي users للدوال التابعة

  const handleClearFilters = () => {
    setSearchTerm(""); // أعيديها فارغة
    setSelectedCategory("الكل");
  };
  return (
    <>
      <div className=" grid grid-cols-3 gap-1 p-2">
        <StatsCard
          title="Total Students"
          value={1}
          icon={<User className="w-5 h-5 text-gray-300" />}
          data={studentsData1}
        />
        <StatsCard
          title="New Users"
          value={8}
          icon={<User className="w-5 h-5 text-gray-300" />}
          data={studentsData3}
        />
        <StatsCard
          title="Total Users"
          value={5}
          icon={<User className="w-5 h-5 text-gray-300" />}
          data={studentsData2}
        />
      </div>

      <div className="flex justify-between items-center m-4">
        <h2 className="text-2xl font-bold text-blue-800">Users</h2>
        <CreateNewUser />
      </div>
      <UsersFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        onClearFilters={handleClearFilters}
      />
      <UserTableFilter users={filteredUsers} />
    </>
  );
}
