import StatsCard from "@/components/shared/stats-card";
import { User2, UserCheck, UserPlus } from "lucide-react";

const statsData = [
  {
    id: "total-students",
    title: "إجمالي الطلاب",
    value: 170,
    icon: User2,
    growthPercentage: 10,
    colorClass:
      "bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200",
    iconColor: "bg-blue-400",
  },
  {
    id: "new-registrations",
    title: "التسجيلات الجديدة",
    value: 12,
    icon: UserPlus,
    growthPercentage: 10,
    colorClass:
      "bg-gradient-to-br from-green-50 to-green-100 border border-green-200",
    iconColor: "bg-green-400",
  },
  {
    id: "active-students",
    title: "الطلاب النشطين (هذا الأسبوع)",
    value: 55,
    icon: UserCheck,
    growthPercentage: 0,
    colorClass:
      "bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200",
    iconColor: "bg-purple-400",
  },
];

export default function GeneralStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      {statsData.map((stat) => (
        <StatsCard
          key={stat.id}
          title={stat.title}
          value={stat.value}
          icon={<stat.icon className="w-8 h-8 text-white rounded-full p-1" />}
          growthPercentage={stat.growthPercentage}
          className={stat.colorClass}
          iconClassName={stat.iconColor}
        />
      ))}
    </div>
  );
}
