import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
// import { useAdminStats } from "@/features/stats/hooks/useAdminStats";
import PaymentHistory from '@/features/stats/components/PaymentHistory';
import { RecentlyCreatedCoursesCard } from '@/features/stats/components/RecentlyCreatedCoursesCard';

const recentCourses = [
  { id: 1, name: 'Nodejs', enrolled: 1, status: 'منشورة', image: '' },
  { id: 2, name: 'إتقان ...', enrolled: 1, status: 'منشورة', image: '' },
];

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Admin() {
  const { setIsMobileSidebarOpen } = useOutletContext<{
    setIsMobileSidebarOpen: (open: boolean) => void;
  }>();
  // const { data, isLoading, error } = useAdminStats();
  return (
    <div
      dir="rtl"
      className="flex flex-col min-h-screen bg-[#f8fafc] font-cairo p-4 gap-6"
    >
      <Button
        variant="ghost"
        size="sm"
        className="lg:hidden flex justify-end"
        onClick={() => setIsMobileSidebarOpen(true)}
      >
        <Menu className="w-5 h-5" />
      </Button>
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
      </div> */}
      <Card className="rounded-lg bg-white text-gray-800 shadow-md p-6 border-0 w-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-bold text-gray-800">
            تقدم الإيرادات السنوي
          </CardTitle>
          <CardDescription className="text-green-500">+0.00%</CardDescription>
        </CardHeader>
        <CardContent>
          {/* <div className="h-64 flex items-center justify-center">
            {isLoading ? (
              <span>جاري التحميل...</span>
            ) : error ? (
              <span>حدث خطأ في جلب البيانات</span>
            ) : (
              <Line
                data={{
                  labels: [
                    "يناير",
                    "فبراير",
                    "مارس",
                    "أبريل",
                    "مايو",
                    "يونيو",
                    "يوليو",
                    "أغسطس",
                  ],
                  datasets: [
                    {
                      label: "الإيرادات (ر.س)",
                      data: data?.values || [0, 0, 0, 0, 0, 0, 0, 0],
                      borderColor: "#22c55e",
                      backgroundColor: "rgba(34,197,94,0.1)",
                      tension: 0.4,
                      fill: true,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { display: false },
                    title: { display: false },
                  },
                  scales: {
                    x: { grid: { display: false } },
                    y: { grid: { color: "#e5e7eb" } },
                  },
                }}
                height={220}
              />
            )}
          </div> */}
        </CardContent>
      </Card>
      {/* الصف الثالث: متوسط تقدم الدورات + الدورات المنشأة مؤخرًا */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="rounded-lg bg-white text-gray-800 shadow-md p-6 border-0 flex flex-col items-center justify-center"></Card>
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
