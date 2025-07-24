import { StatsCard } from "@/components/shared/StatsCard";
import { User, UserCheck, UserPlus } from "lucide-react";
import NewUsersAnalytics from "./NewUsers";

const totalStudentsData = [
  { date: "2024-06-10", value: 100 },
  { date: "2024-06-11", value: 120 },
  { date: "2024-06-12", value: 130 },
  { date: "2024-06-13", value: 140 },
  { date: "2024-06-14", value: 150 },
  { date: "2024-06-15", value: 160 },
  { date: "2024-06-16", value: 170 },
];

const newSignupsData = [
  { date: "2024-06-10", value: 5 },
  { date: "2024-06-11", value: 8 },
  { date: "2024-06-12", value: 7 },
  { date: "2024-06-13", value: 10 },
  { date: "2024-06-14", value: 6 },
  { date: "2024-06-15", value: 9 },
  { date: "2024-06-16", value: 12 },
];

const activeStudentsData = [
  { date: "2024-06-10", value: 30 },
  { date: "2024-06-11", value: 35 },
  { date: "2024-06-12", value: 40 },
  { date: "2024-06-13", value: 38 },
  { date: "2024-06-14", value: 45 },
  { date: "2024-06-15", value: 50 },
  { date: "2024-06-16", value: 55 },
];

export default function Analytics() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">إحصائيات عامة</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        <StatsCard
          title="إجمالي الطلاب"
          value={170}
          icon={<User className="w-5 h-5 text-blue-500" />}
          data={totalStudentsData}
        />
        <StatsCard
          title="التسجيلات الجديدة"
          value={12}
          icon={<UserPlus className="w-5 h-5 text-green-500" />}
          data={newSignupsData}
        />
        <StatsCard
          title="الطلاب النشطين (هذا الأسبوع)"
          value={55}
          icon={<UserCheck className="w-5 h-5 text-yellow-500" />}
          data={activeStudentsData}
        />
      </div>

      <div className="w-full h-full rounded-lg p-4 mt-4">
        <NewUsersAnalytics />
      </div>
    </div>
  );
}
