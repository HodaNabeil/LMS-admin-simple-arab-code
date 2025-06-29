import { Loader } from "@/components/shared/loader";
import { Card } from "@/components/ui/card";
import { useAdminStats } from "@/hooks/useAdminStats";
import { FaUserGraduate, FaBookOpen, FaMoneyBillWave } from "react-icons/fa";

export default function RegistrationStatuses() {
  const { data, isLoading, error } = useAdminStats();

  // تحقق من تحميل البيانات
  if (isLoading)
    return (
      <div className="text-center py-8">
        <Loader />
      </div>
    );
  if (
    error ||
    !data ||
    !data.stats.students ||
    !data.stats.enrollments ||
    !data.stats.revenue
  ) {
    return (
      <div className="text-center py-8 text-red-500">
        حدث خطأ أثناء تحميل البيانات
      </div>
    );
  }

  // إعداد مصفوفة إعدادات الكروت
  const statsConfig = [
    {
      key: "students",
      label: "إجمالي الطلاب",
      icon: <FaUserGraduate className="text-white text-lg" />,
      iconBg: "bg-blue-500",
      valueKey: "count",
      growthKey: "monthlyGrowthRate",
    },
    {
      key: "enrollments",
      label: "إجمالي المسجلين في الدورات",
      icon: <FaBookOpen className="text-white text-lg" />,
      iconBg: "bg-pink-500",
      valueKey: "count",
      growthKey: "monthlyGrowthRate",
    },
    {
      key: "revenue",
      label: "إجمالي الإيرادات",
      icon: <FaMoneyBillWave className="text-white text-lg" />,
      iconBg: "bg-green-500",
      valueKey: "amount",
      growthKey: "monthlyGrowthRate",
      isMoney: true,
    },
  ];

  // تجهيز الكروت بناءً على البيانات الحقيقية من الـ API
  const stats = statsConfig.map((item) => {
    const statData = data.stats[item.key] || {};
    return {
      label: item.label,
      value: item.isMoney
        ? `$${statData[item.valueKey] ?? 0}`
        : statData[item.valueKey] ?? 0,
      sub: `معدل النمو: ${statData[item.growthKey] ?? 0}%`,
      icon: item.icon,
      iconBg: item.iconBg,
    };
  });
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
          <div className="text-sm opacity-75 mt-2 text-gray-600">
            {stat.sub}
          </div>
        </Card>
      ))}
    </div>
  );
}
