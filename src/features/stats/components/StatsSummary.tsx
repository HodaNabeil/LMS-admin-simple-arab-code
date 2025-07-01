import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/formatters";
import type { AdminStats } from "@/types/stats";
import { FaUserGraduate, FaBookOpen, FaMoneyBillWave } from "react-icons/fa";

export default function StatsSummary({
  summary,
}: {
  summary: AdminStats["summary"];
}) {
  const stats = [
    {
      label: "إجمالي الطلاب",
      icon: <FaUserGraduate className="text-white text-lg" />,
      iconBg: "bg-blue-500",
      value: summary.students.count,
      increaseLastMonth: summary.students.increaseLastMonth,
    },
    {
      label: "إجمالي المسجلين في الدورات",
      icon: <FaBookOpen className="text-white text-lg" />,
      iconBg: "bg-pink-500",
      value: summary.courseEnrollments.count,
      increaseLastMonth: summary.courseEnrollments.increaseLastMonth,
    },
    {
      label: "إجمالي الإيرادات",
      icon: <FaMoneyBillWave className="text-white text-lg" />,
      iconBg: "bg-green-500",
      value: formatCurrency(summary.revenue.total),
      increaseLastMonth: summary.revenue.increaseLastMonth,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, idx) => (
        <Card
          key={idx}
          className="rounded-lg bg-white text-gray-800 shadow-md p-6 border-0"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="text-lg font-bold text-gray-800">{stat.label}</div>
            <div
              className={`w-12 h-12 ${stat.iconBg} rounded-full flex items-center justify-center shadow-lg`}
            >
              {stat.icon}
            </div>
          </div>
          <div className="text-4xl font-black text-gray-800">{stat.value}</div>

          <div className="text-xs text-gray-500 mt-1">
            {stat.increaseLastMonth} زيادة في الشهر الماضي
          </div>
        </Card>
      ))}
    </div>
  );
}
