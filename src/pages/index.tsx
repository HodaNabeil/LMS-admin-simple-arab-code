import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useAnnualRevenue } from "@/hooks/useAnnualRevenue";
import PaymentHistory from "@/components/PaymentHistory";

import { stats } from "@/features/admin/components/stats-data";
import { CoursesProgressCard } from "@/features/admin/components/CoursesProgressCard";
import { RecentlyCreatedCoursesCard } from "@/features/admin/components/RecentlyCreatedCoursesCard";
import { SalesLineChart } from "@/features/admin/components/SalesLineChart";

// بيانات التقدم والبيانات الوهمية للدورات
const progressData = [
  { label: "جاري التقدم", color: "#f472b6", value: 10 },
  { label: "مكتمل", color: "#8b5cf6", value: 5 },
  { label: "مسجل", color: "#3b82f6", value: 20 },
];
const recentCourses = [
  { id: 1, name: "Nodejs", enrolled: 1, status: "منشورة", image: "" },
  { id: 2, name: "إتقان ...", enrolled: 1, status: "منشورة", image: "" },
];

export default function Admin() {
  const { data, isLoading, error } = useAnnualRevenue();
  return (
    <div
      dir="rtl"
      className="flex flex-col min-h-screen bg-[#f8fafc] font-cairo p-4 gap-6"
    >
      {/* الصف الأول: 3 بطاقات إحصائيات */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.slice(0, 3).map((stat, idx) => (
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
              {stat.sub}
            </div>
          </Card>
        ))}
      </div>
      {/* الصف الثاني: رسم بياني كبير */}
      <Card className="rounded-lg bg-white text-gray-800 shadow-md p-6 border-0 w-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-bold text-gray-800">
            تقدم الإيرادات السنوي
          </CardTitle>
          <CardDescription className="text-green-500">+0.00%</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center">
            {isLoading ? (
              <span>جاري التحميل...</span>
            ) : error ? (
              <span>حدث خطأ في جلب البيانات</span>
            ) : (
              <SalesLineChart data={data?.values || [0, 0, 0, 0, 0, 0, 0, 0]} />
            )}
          </div>
        </CardContent>
      </Card>
      {/* الصف الثالث: متوسط تقدم الدورات + الدورات المنشأة مؤخرًا */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="rounded-lg bg-white text-gray-800 shadow-md p-6 border-0 flex flex-col items-center justify-center">
          <CoursesProgressCard data={progressData} />
        </Card>
        <Card className="rounded-lg bg-white text-gray-800 shadow-md p-6 border-0 flex flex-col items-center justify-center">
          <RecentlyCreatedCoursesCard courses={recentCourses} />
        </Card>
      </div>
      {/* الصف الرابع: سجل المدفوعات */}
      <div className="w-full">
        <PaymentHistory />
      </div>
    </div>
  );
}
