import PathsStats from "@/features/paths/components/PathsStats";
import { Plus, Users } from "lucide-react";
import { useMemo, useState } from "react";
import PathFilters from "@/features/paths/components/PathFilters";
import PathTable from "@/features/paths/components/PathTable";
import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";
import type { Path } from "@/types/path";

const pathsData: Path[] = [
  {
    id: 1,
    title:
      "دورة تطوير تطبيقات باستخدام Flutter - بناء واجهات احترافية لأنظمة iOS و Android",
    category: "Front-End",
    type: "تفاعلية",
    level: "متوسط",
    instructor: "أحمد محمد",
    image: "https://i.ibb.co/Zzr165m4/Chat-GPT-Image-8-2025-04-06-00.png",
    students: 145,
  },
  {
    id: 2,
    title:
      "دورة تطوير مواقع الويب باستخدام React و Next.js - من المبتدئ إلى المحترف",
    category: "Back-End",
    type: "تقنية",
    level: "متقدم",
    instructor: "سارة أحمد",
    image: "https://i.ibb.co/Zzr165m4/Chat-GPT-Image-8-2025-04-06-00.png",
    students: 298,
  },
  {
    id: 3,
    title: "دورة تصميم واجهات المستخدم UX/UI - إنشاء تجارب مستخدم مميزة",
    category: "Ai",
    type: "إبداعية",
    level: "مبتدئ",
    instructor: "محمد علي",
    image: "https://i.ibb.co/Zzr165m4/Chat-GPT-Image-8-2025-04-06-00.png",
    students: 89,
  },
];
function Paths() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [selectedLevel, setSelectedLevel] = useState("الكل");
  const [selectedType, setSelectedType] = useState("الكل");

  const filteredPaths = useMemo(() => {
    return pathsData.filter((path) => {
      const matchesSearch =
        path.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        path.instructor.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "الكل" || path.category === selectedCategory;

      const matchesLevel =
        selectedLevel === "الكل" || path.level === selectedLevel;

      const matchesType = selectedType === "الكل" || path.type === selectedType;

      return matchesSearch && matchesCategory && matchesLevel && matchesType;
    });
  }, [searchTerm, selectedCategory, selectedLevel, selectedType]);

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("الكل");
    setSelectedLevel("الكل");
    setSelectedType("الكل");
  };

  return (
    <div className="space-y-6  p-4">
      <Header PathsCount={filteredPaths.length} />
      <PathsStats paths={filteredPaths} />
      <PathFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedLevel={selectedLevel}
        onLevelChange={setSelectedLevel}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
        onClearFilters={handleClearFilters}
      />
      <PathTable paths={filteredPaths} />
    </div>
  );
}

export default Paths;

function Header({ PathsCount }: { PathsCount: number }) {
  return (
    <div
      className="flex flex-col sm:space-y-0 sm:flex-row sm:items-center sm:justify-between gap-4
     bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-100"
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 lg:gap-4">
        <div className="flex items-center gap-2 text-gray-600">
          <Users className="w-5 h-5 text-blue-600" />
          <span className="font-medium text-sm lg:text-base">
            المسارات التعليمية
          </span>
        </div>
        <div
          className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 
        px-3 lg:px-4 py-1.5 lg:py-2 rounded-full text-sm font-medium
         border border-blue-300 shadow-sm"
        >
          المسارات ({PathsCount})
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Link to="/admin/paths/create" className={buttonVariants()}>
          <Plus className="w-4 h-4 mr-2" />
          إضافة مسار جديد
        </Link>
      </div>
    </div>
  );
}
