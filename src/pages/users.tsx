import { User } from "lucide-react";
import { StatsCard } from "@/features/users/components/StatsCard";
import UsersTable from "@/features/users/components/UsersTable";
import { useMemo, useState } from "react";
import UsersFilters from "@/features/users/components/UsersFilters";
import UserTableFilter from "@/features/users/components/UserTableFilter";
import { useUsers } from "@/hooks/useUsers";

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

interface Users {
  id: number;
  title: string;
  category: string;
  type: string;
  level: string;
  instructor: string;
  price: number;
  image: string;
  students?: number;
  rating?: number;
}

const users: Users[] = [
  {
    id: 1,
    title:
      "دورة تطوير تطبيقات باستخدام Flutter - بناء واجهات احترافية لأنظمة iOS و Android",
    category: "تطوير التطبيقات",
    type: "تفاعلية",
    level: "متوسط",
    instructor: "أحمد محمد",
    price: 299,
    image: "https://i.ibb.co/Zzr165m4/Chat-GPT-Image-8-2025-04-06-00.png",
    students: 145,
    rating: 4.8,
  },
  {
    id: 2,
    title:
      "دورة تطوير مواقع الويب باستخدام React و Next.js - من المبتدئ إلى المحترف",
    category: "تطوير الويب",
    type: "تقنية",
    level: "متقدم",
    instructor: "سارة أحمد",
    price: 450,
    image: "https://i.ibb.co/Zzr165m4/Chat-GPT-Image-8-2025-04-06-00.png",
    students: 298,
    rating: 4.9,
  },
  {
    id: 3,
    title: "دورة تصميم واجهات المستخدم UX/UI - إنشاء تجارب مستخدم مميزة",
    category: "تصميم",
    type: "إبداعية",
    level: "مبتدئ",
    instructor: "محمد علي",
    price: 199,
    image: "https://i.ibb.co/Zzr165m4/Chat-GPT-Image-8-2025-04-06-00.png",
    students: 89,
    rating: 4.7,
  },
];
export default function Users() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [selectedType, setSelectedType] = useState("الكل");
  const { data } = useUsers();
  console.log("data", data);

  const filteredCourses = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.instructor.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "الكل" || user.category === selectedCategory;

      const matchesType = selectedType === "الكل" || user.type === selectedType;

      return matchesSearch && matchesCategory && matchesType;
    });
  }, [searchTerm, selectedCategory, selectedType]);

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("الكل");
    setSelectedType("الكل");
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
      <UsersTable />

      <UsersFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
        onClearFilters={handleClearFilters}
      />
      <UserTableFilter users={filteredCourses} />
    </>
  );
}
