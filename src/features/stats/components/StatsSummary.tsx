import StatsCard from "@/components/shared/stats-card";
import { formatCurrency } from "@/lib/formatters";
import type { AdminStats } from "@/types/stats";
import { GraduationCap, BookOpen, DollarSign } from "lucide-react";

export default function StatsSummary({
  summary,
}: {
  summary: AdminStats["summary"];
}) {
  const statsData = [
    {
      id: "total-students",
      title: "إجمالي الطلاب",
      value: summary.students.count,
      icon: GraduationCap,
      growthPercentage: summary.students.increaseLastMonth,
      colorClass:
        "bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200",
      iconColor: "bg-blue-400",
    },
    {
      id: "course-enrollments",
      title: "إجمالي المسجلين في الدورات",
      value: summary.courseEnrollments.count,
      icon: BookOpen,
      growthPercentage: summary.courseEnrollments.increaseLastMonth,
      colorClass:
        "bg-gradient-to-br from-pink-50 to-pink-100 border border-pink-200",
      iconColor: "bg-pink-400",
    },
    {
      id: "total-revenue",
      title: "إجمالي الإيرادات",
      value: formatCurrency(summary.revenue.total),
      icon: DollarSign,
      growthPercentage: summary.revenue.increaseLastMonth,
      colorClass:
        "bg-gradient-to-br from-green-50 to-green-100 border border-green-200",
      iconColor: "bg-green-400",
    },
  ];

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
