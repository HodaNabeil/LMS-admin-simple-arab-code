import { Loader } from "@/components/shared/loader";
import { Card } from "@/components/ui/card";
import { useAdminStats } from "@/hooks/useAdminStats";
import { formatCurrency, formatPercentage } from "@/lib/formatters";
import { FaUserGraduate, FaBookOpen, FaMoneyBillWave } from "react-icons/fa";

export default function RegistrationStatuses() {
  const { data, isLoading, error, isError } = useAdminStats();

  // تحقق من تحميل البيانات
  if (isLoading)
    return (
      <div className="text-center py-8">
        <Loader />
      </div>
    );
  if (!isLoading && isError) {
    return (
      <div className="text-center py-8 text-red-500">
        {error.message || "حدث خطأ أثناء تحميل البيانات"}
      </div>
    );
  }

  // إعداد مصفوفة إعدادات الكروت
  const statsConfig = [
    {
      label: "إجمالي الطلاب",
      icon: <FaUserGraduate className="text-white text-lg" />,
      iconBg: "bg-blue-500",
      value: data?.summary.students.count,
      increaseLastMonth: data?.summary.students.increaseLastMonth,
    },
    {
      label: "إجمالي المسجلين في الدورات",
      icon: <FaBookOpen className="text-white text-lg" />,
      iconBg: "bg-pink-500",
      value: data?.summary.courseEnrollments.count,
      increaseLastMonth: data?.summary.courseEnrollments.increaseLastMonth,
    },
    {
      label: "إجمالي الإيرادات",
      icon: <FaMoneyBillWave className="text-white text-lg" />,
      iconBg: "bg-green-500",
      value: formatCurrency(data?.summary.revenue.total as number),
      increaseLastMonth: formatPercentage(10),
    },
  ];

  return (
    !isLoading &&
    data && (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statsConfig.map((stat, idx) => (
          <Card
            key={idx}
            className="rounded-lg bg-white text-gray-800 shadow-md p-6 border-0"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="text-lg font-bold text-gray-800">
                {stat.label}
              </div>
              <div
                className={`w-12 h-12 ${stat.iconBg} rounded-full flex items-center justify-center shadow-lg`}
              >
                {stat.icon}
              </div>
            </div>
            <div className="text-4xl font-black text-gray-800">
              {stat.value}
            </div>
            <div className="text-sm opacity-75 mt-2 text-gray-600">
              {stat.increaseLastMonth}
            </div>
          </Card>
        ))}
      </div>
    )
  );
}
